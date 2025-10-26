// Service API principal avec gestion automatique des tokens JWT
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export class ApiService {
  /**
   * Obtenir le token d'accès depuis le localStorage
   */
  private static getToken(): string | null {
    return localStorage.getItem('chu_access_token');
  }

  /**
   * Obtenir les headers par défaut avec le token JWT
   */
  private static getHeaders(includeAuth: boolean = true): HeadersInit {
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
      // Si token expiré (401), essayer de le rafraîchir
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry la requête originale avec le nouveau token
          throw new Error('TOKEN_REFRESHED');
        } else {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
      }

      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Rafraîchir le token d'accès
   */
  private static async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('chu_refresh_token');
      
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('chu_access_token', data.accessToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  }

  /**
   * Requête GET
   */
  static async get(endpoint: string, includeAuth: boolean = true): Promise<any> {
    const maxRetries = 1;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: this.getHeaders(includeAuth),
        });

        return await this.handleResponse(response);
      } catch (error) {
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retries < maxRetries) {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  /**
   * Requête POST
   */
  static async post(endpoint: string, data: any, includeAuth: boolean = true): Promise<any> {
    const maxRetries = 1;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'POST',
          headers: this.getHeaders(includeAuth),
          body: JSON.stringify(data),
        });

        return await this.handleResponse(response);
      } catch (error) {
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retries < maxRetries) {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  /**
   * Requête PUT
   */
  static async put(endpoint: string, data: any, includeAuth: boolean = true): Promise<any> {
    const maxRetries = 1;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'PUT',
          headers: this.getHeaders(includeAuth),
          body: JSON.stringify(data),
        });

        return await this.handleResponse(response);
      } catch (error) {
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retries < maxRetries) {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  /**
   * Requête DELETE
   */
  static async delete(endpoint: string, includeAuth: boolean = true): Promise<any> {
    const maxRetries = 1;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'DELETE',
          headers: this.getHeaders(includeAuth),
        });

        return await this.handleResponse(response);
      } catch (error) {
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retries < maxRetries) {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  /**
   * Requête PATCH
   */
  static async patch(endpoint: string, data: any, includeAuth: boolean = true): Promise<any> {
    const maxRetries = 1;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'PATCH',
          headers: this.getHeaders(includeAuth),
          body: JSON.stringify(data),
        });

        return await this.handleResponse(response);
      } catch (error) {
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retries < maxRetries) {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }
}