// Service API pour CHU Management - Spring Boot Backend Local
// Alternative à Supabase pour utilisation avec PostgreSQL local

const SPRING_BOOT_BASE_URL = 'http://localhost:8080/api';

export class SpringBootApiService {
  /**
   * Obtenir le token d'accès depuis le localStorage
   */
  private static getToken(): string | null {
    return localStorage.getItem('chu_access_token');
  }

  /**
   * Obtenir les headers par défaut avec le token JWT
   */
  private static getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Gestion des erreurs de réponse
   */
  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || errorData?.error || `Erreur HTTP: ${response.status}`);
    }

    // Si la réponse est vide (204 No Content), retourner un objet vide
    if (response.status === 204) {
      return {};
    }

    return response.json();
  }

  /**
   * Requête GET
   */
  static async get(endpoint: string, includeAuth: boolean = false): Promise<any> {
    try {
      const response = await fetch(`${SPRING_BOOT_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(includeAuth),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Erreur GET ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requête POST
   */
  static async post(endpoint: string, data: any, includeAuth: boolean = false): Promise<any> {
    try {
      const response = await fetch(`${SPRING_BOOT_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(includeAuth),
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Erreur POST ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requête PUT
   */
  static async put(endpoint: string, data: any, includeAuth: boolean = false): Promise<any> {
    try {
      const response = await fetch(`${SPRING_BOOT_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(includeAuth),
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Erreur PUT ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requête DELETE
   */
  static async delete(endpoint: string, includeAuth: boolean = false): Promise<any> {
    try {
      const response = await fetch(`${SPRING_BOOT_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(includeAuth),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Erreur DELETE ${endpoint}:`, error);
      throw error;
    }
  }

  // ============================================
  // AUTHENTIFICATION
  // ============================================

  /**
   * Inscription
   */
  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await this.post('/auth/register', data);
    return response;
  }

  /**
   * Connexion
   */
  static async login(email: string, password: string) {
    const response = await this.post('/auth/login', { email, password });
    
    if (response.token) {
      localStorage.setItem('chu_access_token', response.token);
      localStorage.setItem('chu_user', JSON.stringify(response.user || { email }));
    }
    
    return response;
  }

  /**
   * Déconnexion
   */
  static logout() {
    localStorage.removeItem('chu_access_token');
    localStorage.removeItem('chu_user');
  }

  /**
   * Vérifier l'authentification
   */
  static async checkAuth() {
    try {
      const response = await this.get('/auth/me', true);
      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtenir l'utilisateur courant depuis localStorage
   */
  static getCurrentUser() {
    const userStr = localStorage.getItem('chu_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // ============================================
  // MÉDECINS
  // ============================================

  /**
   * Liste des médecins
   */
  static async getDoctors() {
    return await this.get('/doctors');
  }

  /**
   * Détails d'un médecin
   */
  static async getDoctor(id: string | number) {
    return await this.get(`/doctors/${id}`);
  }

  /**
   * Créer un médecin (admin)
   */
  static async createDoctor(data: any) {
    return await this.post('/doctors', data, true);
  }

  /**
   * Modifier un médecin (admin)
   */
  static async updateDoctor(id: string | number, data: any) {
    return await this.put(`/doctors/${id}`, data, true);
  }

  /**
   * Supprimer un médecin (admin)
   */
  static async deleteDoctor(id: string | number) {
    return await this.delete(`/doctors/${id}`, true);
  }

  // ============================================
  // PATIENTS
  // ============================================

  /**
   * Liste des patients (admin/médecin seulement)
   */
  static async getPatients() {
    return await this.get('/patients', true);
  }

  /**
   * Détails d'un patient
   */
  static async getPatient(id: string | number) {
    return await this.get(`/patients/${id}`, true);
  }

  /**
   * Créer un patient
   */
  static async createPatient(data: any) {
    return await this.post('/patients', data, true);
  }

  /**
   * Modifier un patient
   */
  static async updatePatient(id: string | number, data: any) {
    return await this.put(`/patients/${id}`, data, true);
  }

  /**
   * Supprimer un patient
   */
  static async deletePatient(id: string | number) {
    return await this.delete(`/patients/${id}`, true);
  }

  // ============================================
  // RENDEZ-VOUS
  // ============================================

  /**
   * Liste des rendez-vous
   */
  static async getAppointments() {
    return await this.get('/appointments', true);
  }

  /**
   * Détails d'un rendez-vous
   */
  static async getAppointment(id: string | number) {
    return await this.get(`/appointments/${id}`, true);
  }

  /**
   * Créer un rendez-vous
   */
  static async createAppointment(data: {
    patientId: string | number;
    doctorId: string | number;
    appointmentDate: string;
    reason: string;
    notes?: string;
  }) {
    return await this.post('/appointments', data, true);
  }

  /**
   * Modifier un rendez-vous
   */
  static async updateAppointment(id: string | number, data: any) {
    return await this.put(`/appointments/${id}`, data, true);
  }

  /**
   * Annuler un rendez-vous
   */
  static async cancelAppointment(id: string | number) {
    return await this.put(`/appointments/${id}/cancel`, {}, true);
  }

  /**
   * Supprimer un rendez-vous
   */
  static async deleteAppointment(id: string | number) {
    return await this.delete(`/appointments/${id}`, true);
  }

  // ============================================
  // SERVICES MÉDICAUX
  // ============================================

  /**
   * Liste des services médicaux
   */
  static async getServices() {
    return await this.get('/services');
  }

  /**
   * Détails d'un service
   */
  static async getService(id: string | number) {
    return await this.get(`/services/${id}`);
  }

  // ============================================
  // DÉPARTEMENTS
  // ============================================

  /**
   * Liste des départements
   */
  static async getDepartments() {
    return await this.get('/departments');
  }

  /**
   * Détails d'un département
   */
  static async getDepartment(id: string | number) {
    return await this.get(`/departments/${id}`);
  }

  // ============================================
  // STATISTIQUES
  // ============================================

  /**
   * Statistiques hospitalières
   */
  static async getStats() {
    return await this.get('/stats');
  }

  /**
   * Statistiques du dashboard (admin)
   */
  static async getDashboardStats() {
    return await this.get('/stats/dashboard', true);
  }

  // ============================================
  // CONTACT
  // ============================================

  /**
   * Envoyer un message de contact
   */
  static async sendContactMessage(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return await this.post('/contact', data);
  }

  // ============================================
  // SANTÉ DU SERVEUR
  // ============================================

  /**
   * Vérifier la santé du serveur Spring Boot
   */
  static async checkHealth() {
    try {
      const response = await fetch('http://localhost:8080/actuator/health');
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la vérification de santé:', error);
      return { status: 'DOWN' };
    }
  }
}
