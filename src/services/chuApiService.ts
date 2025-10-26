// Service API pour CHU Management - Supabase Backend
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d31784ab`;

export class CHUApiService {
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
      'Authorization': `Bearer ${publicAnonKey}`,
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
      throw new Error(errorData?.error || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Requête GET
   */
  static async get(endpoint: string, includeAuth: boolean = false): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
    role?: string;
  }) {
    const response = await this.post('/auth/register', data);
    return response;
  }

  /**
   * Connexion
   */
  static async login(email: string, password: string) {
    const response = await this.post('/auth/login', { email, password });
    
    if (response.success && response.accessToken) {
      localStorage.setItem('chu_access_token', response.accessToken);
      localStorage.setItem('chu_refresh_token', response.refreshToken || '');
      localStorage.setItem('chu_user', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Déconnexion
   */
  static logout() {
    localStorage.removeItem('chu_access_token');
    localStorage.removeItem('chu_refresh_token');
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
  static async getDoctor(id: string) {
    return await this.get(`/doctors/${id}`);
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

  // ============================================
  // RENDEZ-VOUS
  // ============================================

  /**
   * Créer un rendez-vous
   */
  static async createAppointment(data: {
    patientId?: string;
    doctorId?: string;
    serviceId?: string;
    date: string;
    time: string;
    reason?: string;
    notes?: string;
  }) {
    return await this.post('/appointments', data, false);
  }

  /**
   * Liste des rendez-vous (authentification requise)
   */
  static async getAppointments() {
    return await this.get('/appointments', true);
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

  // ============================================
  // STATISTIQUES
  // ============================================

  /**
   * Statistiques hospitalières
   */
  static async getStats() {
    return await this.get('/stats');
  }

  // ============================================
  // URGENCES
  // ============================================

  /**
   * Informations d'urgence
   */
  static async getEmergencyInfo() {
    return await this.get('/emergency');
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
    subject?: string;
    message: string;
  }) {
    return await this.post('/contact', data);
  }
}
