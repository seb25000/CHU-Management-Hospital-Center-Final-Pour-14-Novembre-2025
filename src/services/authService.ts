// Service d'authentification pour le frontend React
import { ApiService } from './apiService';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  message: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'chu_access_token';
  private readonly REFRESH_TOKEN_KEY = 'chu_refresh_token';
  private readonly USER_KEY = 'chu_user';

  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await ApiService.post('/auth/login', credentials);
      
      if (response.accessToken) {
        this.setTokens(response.accessToken, response.refreshToken);
        this.setUser({
          id: response.userId,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          role: response.role
        });
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Inscription utilisateur
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await ApiService.post('/auth/register', userData);
      
      if (response.accessToken) {
        this.setTokens(response.accessToken, response.refreshToken);
        this.setUser({
          id: response.userId,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          role: response.role
        });
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }

  /**
   * Déconnexion utilisateur
   */
  async logout(): Promise<void> {
    try {
      await ApiService.post('/auth/logout', {});
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      this.removeTokens();
      this.removeUser();
    }
  }

  /**
   * Rafraîchissement du token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      this.logout();
      return null;
    }
  }

  /**
   * Validation du token
   */
  async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      
      if (!token) {
        return false;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      return false;
    }
  }

  /**
   * Obtenir le token d'accès
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtenir le token de rafraîchissement
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Vérifier si l'utilisateur a l'un des rôles spécifiés
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Stocker les tokens
   */
  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Stocker les informations utilisateur
   */
  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Supprimer les tokens
   */
  private removeTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Supprimer les informations utilisateur
   */
  private removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}

export const authService = new AuthService();