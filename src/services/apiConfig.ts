// Configuration API - Choisir entre Supabase (cloud) et Spring Boot (local)

import { CHUApiService } from './chuApiService';
import { SpringBootApiService } from './springBootApiService';

/**
 * Type de backend à utiliser
 * - 'supabase' : Backend cloud avec Supabase (actuel)
 * - 'springboot' : Backend local avec Spring Boot + PostgreSQL
 */
export type BackendType = 'supabase' | 'springboot';

/**
 * Configuration du backend
 * 
 * CHANGEZ CETTE VALEUR pour basculer entre les backends :
 * - 'supabase' : Utilise Supabase (cloud) - Par défaut
 * - 'springboot' : Utilise Spring Boot (local avec PostgreSQL)
 */
export const BACKEND_TYPE: BackendType = 'supabase';

/**
 * Service API unifié
 * Utilise automatiquement le bon backend selon la configuration
 */
export const ApiService = BACKEND_TYPE === 'springboot' 
  ? SpringBootApiService 
  : CHUApiService;

/**
 * Informations sur le backend actuel
 */
export const getBackendInfo = () => {
  if (BACKEND_TYPE === 'springboot') {
    return {
      type: 'Spring Boot (Local)',
      url: 'http://localhost:8080',
      database: 'PostgreSQL Local',
      status: 'Spring Boot doit être démarré',
    };
  } else {
    return {
      type: 'Supabase (Cloud)',
      url: 'Cloud Supabase',
      database: 'PostgreSQL Cloud',
      status: 'Toujours disponible',
    };
  }
};

/**
 * Vérifier si le backend est accessible
 */
export const checkBackendAvailability = async (): Promise<boolean> => {
  try {
    if (BACKEND_TYPE === 'springboot') {
      const health = await SpringBootApiService.checkHealth();
      return health.status === 'UP';
    } else {
      // Pour Supabase, on peut tester avec une requête simple
      await CHUApiService.getDoctors();
      return true;
    }
  } catch (error) {
    console.error('Backend non disponible:', error);
    return false;
  }
};

/**
 * Message d'aide pour la configuration
 */
export const getConfigHelp = () => {
  return `
╔════════════════════════════════════════════════════════════════╗
║              CONFIGURATION DU BACKEND                          ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Backend actuel : ${BACKEND_TYPE === 'springboot' ? 'Spring Boot (Local)' : 'Supabase (Cloud)'}
║                                                                ║
║  Pour changer de backend :                                     ║
║  1. Ouvrir : services/apiConfig.ts                             ║
║  2. Modifier : export const BACKEND_TYPE = '${BACKEND_TYPE === 'springboot' ? 'supabase' : 'springboot'}'
║  3. Sauvegarder                                                ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  OPTION 1 : Supabase (Cloud)                                   ║
║  ✅ Pas d'installation requise                                 ║
║  ✅ Toujours disponible                                        ║
║  ❌ Dépend d'internet                                           ║
║                                                                ║
║  OPTION 2 : Spring Boot (Local)                                ║
║  ✅ Contrôle total                                             ║
║  ✅ Pas besoin d'internet                                      ║
║  ❌ Requiert installation PostgreSQL + Spring Boot             ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `;
};

// Afficher la configuration au démarrage (en mode développement)
if (import.meta.env.DEV) {
  console.log(getConfigHelp());
  console.log(`\n🔌 Backend actif : ${getBackendInfo().type}`);
  console.log(`📍 URL : ${getBackendInfo().url}`);
  console.log(`🗄️  Base de données : ${getBackendInfo().database}\n`);
}
