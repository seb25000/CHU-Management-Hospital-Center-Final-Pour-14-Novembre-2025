// API complète pour CHU Management Center
import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

export function setupCHURoutes(app: Hono, supabase: any) {
  
  // ============================================
  // AUTHENTIFICATION
  // ============================================
  
  // Inscription d'un nouvel utilisateur
  app.post('/make-server-d31784ab/auth/register', async (c) => {
    try {
      const body = await c.req.json();
      const { email, password, firstName, lastName, role = 'PATIENT' } = body;
      
      if (!email || !password || !firstName || !lastName) {
        return c.json({
          success: false,
          error: 'Email, mot de passe, prénom et nom sont obligatoires'
        }, 400);
      }
      
      // Créer l'utilisateur dans Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          role: role
        }
      });
      
      if (error) {
        console.log('Erreur lors de la création de l\'utilisateur:', error);
        return c.json({
          success: false,
          error: error.message
        }, 400);
      }
      
      // Stocker les infos additionnelles dans KV
      const userId = data.user.id;
      await kv.set(`user_${userId}`, {
        id: userId,
        email,
        firstName,
        lastName,
        role,
        isActive: true,
        createdAt: new Date().toISOString()
      });
      
      // Si c'est un patient, créer le profil patient
      if (role === 'PATIENT') {
        await kv.set(`patient_${userId}`, {
          userId,
          email,
          firstName,
          lastName,
          createdAt: new Date().toISOString()
        });
      }
      
      console.log('Utilisateur créé avec succès:', userId);
      
      return c.json({
        success: true,
        message: 'Compte créé avec succès',
        user: {
          id: userId,
          email,
          firstName,
          lastName,
          role
        }
      });
      
    } catch (error) {
      console.log('Erreur lors de l\'inscription:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur lors de l\'inscription'
      }, 500);
    }
  });
  
  // Connexion
  app.post('/make-server-d31784ab/auth/login', async (c) => {
    try {
      const body = await c.req.json();
      const { email, password } = body;
      
      if (!email || !password) {
        return c.json({
          success: false,
          error: 'Email et mot de passe obligatoires'
        }, 400);
      }
      
      // Authentifier avec Supabase
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!
      );
      
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.log('Erreur de connexion:', error);
        return c.json({
          success: false,
          error: 'Email ou mot de passe incorrect'
        }, 401);
      }
      
      const userId = data.user.id;
      const userInfo = await kv.get(`user_${userId}`) || {
        email: data.user.email,
        firstName: data.user.user_metadata?.first_name || '',
        lastName: data.user.user_metadata?.last_name || '',
        role: data.user.user_metadata?.role || 'PATIENT'
      };
      
      console.log('Connexion réussie pour:', email);
      
      return c.json({
        success: true,
        message: 'Connexion réussie',
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: userId,
          email: data.user.email,
          ...userInfo
        }
      });
      
    } catch (error) {
      console.log('Erreur lors de la connexion:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur lors de la connexion'
      }, 500);
    }
  });
  
  // Vérifier le token
  app.get('/make-server-d31784ab/auth/me', async (c) => {
    try {
      const accessToken = c.req.header('Authorization')?.split(' ')[1];
      
      if (!accessToken) {
        return c.json({
          success: false,
          error: 'Token manquant'
        }, 401);
      }
      
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      
      if (error || !user) {
        return c.json({
          success: false,
          error: 'Token invalide'
        }, 401);
      }
      
      const userInfo = await kv.get(`user_${user.id}`) || {
        email: user.email,
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        role: user.user_metadata?.role || 'PATIENT'
      };
      
      return c.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          ...userInfo
        }
      });
      
    } catch (error) {
      console.log('Erreur lors de la vérification du token:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // MÉDECINS
  // ============================================
  
  // Liste des médecins
  app.get('/make-server-d31784ab/doctors', async (c) => {
    try {
      const doctors = await kv.getByPrefix('doctor_') || [];
      
      if (doctors.length === 0) {
        // Retourner des données par défaut
        return c.json({
          success: true,
          data: [
            {
              id: 'dr_1',
              firstName: 'Marie',
              lastName: 'Dubois',
              specialty: 'Cardiologie',
              licenseNumber: 'CAR-2015-001',
              yearsExperience: 15,
              phone: '01 23 45 67 89',
              officeNumber: 'B301',
              consultationPrice: 65.00,
              isAvailable: true,
              bio: 'Spécialiste en cardiologie interventionnelle avec plus de 15 ans d\'expérience.',
              education: 'Université Paris Descartes - Doctorat en Médecine',
              languages: ['Français', 'Anglais'],
              imageUrl: 'https://images.unsplash.com/photo-1659353887019-b142198f2668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjYXJkaW9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 'dr_2',
              firstName: 'Pierre',
              lastName: 'Martin',
              specialty: 'Neurologie',
              licenseNumber: 'NEU-2017-042',
              yearsExperience: 12,
              phone: '01 23 45 67 90',
              officeNumber: 'C205',
              consultationPrice: 60.00,
              isAvailable: true,
              bio: 'Expert en troubles neurologiques et maladies neurodégénératives.',
              education: 'Université de Lyon - Spécialisation Neurologie',
              languages: ['Français', 'Anglais', 'Espagnol'],
              imageUrl: 'https://images.unsplash.com/photo-1659353888352-5dbb14b80eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbmV1cm9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 'dr_3',
              firstName: 'Sophie',
              lastName: 'Lefebvre',
              specialty: 'Pédiatrie',
              licenseNumber: 'PED-2018-088',
              yearsExperience: 10,
              phone: '01 23 45 67 91',
              officeNumber: 'A102',
              consultationPrice: 55.00,
              isAvailable: true,
              bio: 'Pédiatre dédiée à la santé et au bien-être des enfants.',
              education: 'Université de Bordeaux - Pédiatrie',
              languages: ['Français', 'Anglais'],
              imageUrl: 'https://images.unsplash.com/photo-1576089235406-0612d7bb033e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwZWRpYXRyaWNpYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 'dr_4',
              firstName: 'Jean',
              lastName: 'Rousseau',
              specialty: 'Orthopédie',
              licenseNumber: 'ORT-2016-023',
              yearsExperience: 14,
              phone: '01 23 45 67 92',
              officeNumber: 'D401',
              consultationPrice: 70.00,
              isAvailable: true,
              bio: 'Chirurgien orthopédiste spécialisé en chirurgie du sport.',
              education: 'Université de Marseille - Chirurgie Orthopédique',
              languages: ['Français', 'Italien'],
              imageUrl: 'https://images.unsplash.com/photo-1703809047411-30b80e5e8592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwb3J0aG9wZWRpYyUyMHN1cmdlb258ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 'dr_5',
              firstName: 'Émilie',
              lastName: 'Bernard',
              specialty: 'Dermatologie',
              licenseNumber: 'DER-2019-067',
              yearsExperience: 8,
              phone: '01 23 45 67 93',
              officeNumber: 'B208',
              consultationPrice: 58.00,
              isAvailable: true,
              bio: 'Dermatologue spécialisée en dermatologie esthétique et médicale.',
              education: 'Université de Nice - Dermatologie',
              languages: ['Français', 'Anglais'],
              imageUrl: 'https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZXJtYXRvbG9naXN0JTIwZG9jdG9yfGVufDF8fHx8MTc2MDkxMTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 'dr_6',
              firstName: 'Thomas',
              lastName: 'Petit',
              specialty: 'Radiologie',
              licenseNumber: 'RAD-2014-015',
              yearsExperience: 16,
              phone: '01 23 45 67 94',
              officeNumber: 'E301',
              consultationPrice: 65.00,
              isAvailable: true,
              bio: 'Radiologue expert en imagerie médicale avancée.',
              education: 'Université de Strasbourg - Radiologie',
              languages: ['Français', 'Allemand', 'Anglais'],
              imageUrl: 'https://images.unsplash.com/photo-1631563019701-efcf403bc5fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcmFkaW9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080'
            }
          ]
        });
      }
      
      return c.json({
        success: true,
        data: doctors
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des médecins:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // Détails d'un médecin
  app.get('/make-server-d31784ab/doctors/:id', async (c) => {
    try {
      const doctorId = c.req.param('id');
      const doctor = await kv.get(`doctor_${doctorId}`);
      
      if (!doctor) {
        return c.json({
          success: false,
          error: 'Médecin non trouvé'
        }, 404);
      }
      
      return c.json({
        success: true,
        data: doctor
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération du médecin:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // SERVICES MÉDICAUX
  // ============================================
  
  app.get('/make-server-d31784ab/services', async (c) => {
    try {
      const services = await kv.get('medical_services') || [
        {
          id: 'cardiology',
          name: 'Cardiologie',
          description: 'Diagnostic et traitement des maladies cardiovasculaires. Notre équipe de cardiologues expérimentés utilise des technologies de pointe pour assurer les meilleurs soins.',
          department: 'Médecine Interne',
          icon: 'Heart',
          isEmergency: true,
          isAvailable247: true,
          averageWaitTime: 15,
          services: [
            'Consultation cardiologique',
            'Électrocardiogramme (ECG)',
            'Échocardiographie',
            'Test d\'effort',
            'Holter cardiaque',
            'Angioplastie'
          ]
        },
        {
          id: 'neurology',
          name: 'Neurologie',
          description: 'Prise en charge complète des troubles neurologiques, des migraines aux maladies neurodégénératives.',
          department: 'Neurosciences',
          icon: 'Brain',
          isEmergency: false,
          isAvailable247: false,
          averageWaitTime: 30,
          services: [
            'Consultation neurologique',
            'EEG (Électroencéphalogramme)',
            'EMG (Électromyographie)',
            'Scanner cérébral',
            'IRM cérébrale',
            'Traitement des migraines'
          ]
        },
        {
          id: 'pediatrics',
          name: 'Pédiatrie',
          description: 'Soins spécialisés pour enfants et adolescents, de la naissance à 18 ans.',
          department: 'Pédiatrie',
          icon: 'Baby',
          isEmergency: true,
          isAvailable247: true,
          averageWaitTime: 20,
          services: [
            'Consultations pédiatriques',
            'Vaccinations',
            'Suivi de croissance',
            'Urgences pédiatriques',
            'Néonatologie',
            'Pédopsychiatrie'
          ]
        },
        {
          id: 'orthopedics',
          name: 'Orthopédie',
          description: 'Chirurgie et rééducation des traumatismes osseux, articulaires et musculaires.',
          department: 'Chirurgie',
          icon: 'Bone',
          isEmergency: true,
          isAvailable247: true,
          averageWaitTime: 25,
          services: [
            'Consultation orthopédique',
            'Chirurgie des fractures',
            'Prothèses articulaires',
            'Arthroscopie',
            'Chirurgie de la main',
            'Médecine du sport'
          ]
        },
        {
          id: 'dermatology',
          name: 'Dermatologie',
          description: 'Diagnostic et traitement des affections de la peau, des cheveux et des ongles.',
          department: 'Dermatologie',
          icon: 'Sparkles',
          isEmergency: false,
          isAvailable247: false,
          averageWaitTime: 35,
          services: [
            'Consultation dermatologique',
            'Traitement de l\'acné',
            'Dermatologie esthétique',
            'Chirurgie dermatologique',
            'Dépistage cancer de la peau',
            'Traitement laser'
          ]
        },
        {
          id: 'radiology',
          name: 'Radiologie',
          description: 'Imagerie médicale avancée pour un diagnostic précis.',
          department: 'Imagerie Médicale',
          icon: 'Scan',
          isEmergency: true,
          isAvailable247: true,
          averageWaitTime: 20,
          services: [
            'Radiographie',
            'Scanner (CT)',
            'IRM',
            'Échographie',
            'Mammographie',
            'Radiologie interventionnelle'
          ]
        },
        {
          id: 'emergency',
          name: 'Urgences',
          description: 'Service d\'urgences disponible 24h/24 et 7j/7 pour toutes les urgences médicales.',
          department: 'Urgences',
          icon: 'Ambulance',
          isEmergency: true,
          isAvailable247: true,
          averageWaitTime: 15,
          services: [
            'Urgences vitales',
            'Traumatismes',
            'Douleurs aiguës',
            'Urgences cardiologiques',
            'Urgences respiratoires',
            'Urgences pédiatriques'
          ]
        },
        {
          id: 'laboratory',
          name: 'Laboratoire',
          description: 'Analyses médicales complètes avec résultats rapides.',
          department: 'Biologie Médicale',
          icon: 'TestTube',
          isEmergency: false,
          isAvailable247: true,
          averageWaitTime: 10,
          services: [
            'Analyses sanguines',
            'Analyses urinaires',
            'Biochimie',
            'Hématologie',
            'Microbiologie',
            'Sérologie'
          ]
        }
      ];
      
      return c.json({
        success: true,
        data: services
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des services:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // RENDEZ-VOUS
  // ============================================
  
  // Créer un rendez-vous
  app.post('/make-server-d31784ab/appointments', async (c) => {
    try {
      const body = await c.req.json();
      const { patientId, doctorId, serviceId, date, time, reason, notes } = body;
      
      if (!date || !time) {
        return c.json({
          success: false,
          error: 'Date et heure sont obligatoires'
        }, 400);
      }
      
      const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const appointment = {
        id: appointmentId,
        patientId: patientId || 'guest',
        doctorId: doctorId || 'general',
        serviceId: serviceId || 'general',
        date,
        time,
        duration: 30,
        status: 'SCHEDULED',
        reason: reason || '',
        notes: notes || '',
        createdAt: new Date().toISOString()
      };
      
      await kv.set(appointmentId, appointment);
      
      // Incrémenter le compteur
      const count = await kv.get('appointments_count') || 0;
      await kv.set('appointments_count', count + 1);
      
      console.log('Rendez-vous créé:', appointmentId);
      
      return c.json({
        success: true,
        message: 'Rendez-vous créé avec succès',
        data: appointment
      });
      
    } catch (error) {
      console.log('Erreur lors de la création du rendez-vous:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // Liste des rendez-vous
  app.get('/make-server-d31784ab/appointments', async (c) => {
    try {
      const accessToken = c.req.header('Authorization')?.split(' ')[1];
      
      if (!accessToken) {
        return c.json({
          success: false,
          error: 'Authentification requise'
        }, 401);
      }
      
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      
      if (error || !user) {
        return c.json({
          success: false,
          error: 'Token invalide'
        }, 401);
      }
      
      const appointments = await kv.getByPrefix('apt_') || [];
      
      return c.json({
        success: true,
        data: appointments
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des rendez-vous:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // PATIENTS
  // ============================================
  
  // Liste des patients (admin/médecin seulement)
  app.get('/make-server-d31784ab/patients', async (c) => {
    try {
      const accessToken = c.req.header('Authorization')?.split(' ')[1];
      
      if (!accessToken) {
        return c.json({
          success: false,
          error: 'Authentification requise'
        }, 401);
      }
      
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      
      if (error || !user) {
        return c.json({
          success: false,
          error: 'Token invalide'
        }, 401);
      }
      
      const patients = await kv.getByPrefix('patient_') || [];
      
      return c.json({
        success: true,
        data: patients
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des patients:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // STATISTIQUES
  // ============================================
  
  app.get('/make-server-d31784ab/stats', async (c) => {
    try {
      const stats = await kv.get('hospital_stats') || {
        totalDoctors: 150,
        totalStaff: 500,
        specialties: 30,
        patientSatisfaction: 98,
        patientsPerYear: 50000,
        emergencyWaitTime: 15,
        appointmentsToday: 87,
        bedsAvailable: 245,
        bedsTotal: 400
      };
      
      return c.json({
        success: true,
        data: stats
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des statistiques:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // URGENCES
  // ============================================
  
  app.get('/make-server-d31784ab/emergency', async (c) => {
    try {
      const emergencyInfo = await kv.get('emergency_info') || {
        phone: '15',
        europeanPhone: '112',
        hospitalPhone: '+33 1 23 45 67 89',
        address: '123 Avenue de la Santé, 75015 Paris, France',
        availability: '24h/24 - 7j/7',
        currentWaitTime: '15 minutes',
        priority: 'Urgences vitales traitées immédiatement',
        services: [
          'Urgences vitales',
          'Traumatismes',
          'Urgences cardiologiques',
          'Urgences pédiatriques',
          'Urgences respiratoires',
          'Intoxications'
        ]
      };
      
      return c.json({
        success: true,
        data: emergencyInfo
      });
      
    } catch (error) {
      console.log('Erreur lors de la récupération des infos urgences:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
  
  // ============================================
  // CONTACT
  // ============================================
  
  app.post('/make-server-d31784ab/contact', async (c) => {
    try {
      const body = await c.req.json();
      const { name, email, phone, subject, message } = body;
      
      if (!name || !email || !message) {
        return c.json({
          success: false,
          error: 'Nom, email et message sont obligatoires'
        }, 400);
      }
      
      const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const contact = {
        id: contactId,
        name,
        email,
        phone: phone || '',
        subject: subject || 'Demande générale',
        message,
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      
      await kv.set(contactId, contact);
      
      console.log('Message de contact reçu:', contactId);
      
      return c.json({
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        data: contact
      });
      
    } catch (error) {
      console.log('Erreur lors de l\'envoi du message:', error);
      return c.json({
        success: false,
        error: 'Erreur serveur'
      }, 500);
    }
  });
}
