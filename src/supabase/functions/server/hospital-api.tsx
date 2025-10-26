import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Routes API pour le CHU Management Center
app.get('/make-server-d31784ab/', (c) => {
  return c.json({ 
    message: 'CHU Management Center API',
    version: '1.0.0',
    services: {
      '/api/appointments': 'POST - Prise de rendez-vous',
      '/api/doctors': 'GET - Liste des médecins',
      '/api/services': 'GET - Services médicaux',
      '/api/patients': 'GET/POST - Gestion patients',
      '/api/emergency': 'GET - Informations urgences'
    }
  })
})

// Route pour la prise de rendez-vous
app.post('/make-server-d31784ab/api/appointments', async (c) => {
  try {
    const body = await c.req.json()
    const { patientName, patientEmail, doctorId, serviceType, preferredDate, preferredTime, notes } = body
    
    // Validation des données
    if (!patientName || !patientEmail || !serviceType || !preferredDate) {
      return c.json({
        success: false,
        error: 'Informations obligatoires manquantes'
      }, 400)
    }
    
    // Génération d'un ID unique pour le RDV
    const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const appointmentData = {
      id: appointmentId,
      patientName,
      patientEmail,
      doctorId: doctorId || 'general',
      serviceType,
      preferredDate,
      preferredTime: preferredTime || '09:00',
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    await kv.set(appointmentId, appointmentData)
    
    // Mise à jour du compteur de RDV
    const currentCount = await kv.get('appointments_count') || 0
    await kv.set('appointments_count', currentCount + 1)
    
    console.log('Nouveau rendez-vous créé:', appointmentData)
    
    return c.json({
      success: true,
      message: 'Rendez-vous enregistré avec succès. Vous recevrez une confirmation par email.',
      appointmentId,
      data: appointmentData
    })
  } catch (error) {
    console.log('Erreur lors de la création du rendez-vous:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur serveur lors de la création du rendez-vous' 
    }, 500)
  }
})

// Route pour récupérer la liste des m��decins
app.get('/make-server-d31784ab/api/doctors', async (c) => {
  try {
    const doctors = await kv.get('doctors_list') || [
      {
        id: 'dr_dubois',
        name: 'Dr. Marie Dubois',
        specialty: 'Cardiologie',
        experience: '15 ans',
        available: true,
        consultationTimes: ['09:00', '10:30', '14:00', '15:30', '17:00']
      },
      {
        id: 'dr_martin',
        name: 'Dr. Pierre Martin',
        specialty: 'Neurologie',
        experience: '12 ans',
        available: true,
        consultationTimes: ['08:30', '10:00', '11:30', '14:30', '16:00']
      },
      {
        id: 'dr_lefebvre',
        name: 'Dr. Sophie Lefebvre',
        specialty: 'Pédiatrie',
        experience: '10 ans',
        available: true,
        consultationTimes: ['09:00', '10:30', '13:30', '15:00', '16:30']
      }
    ]
    
    return c.json({
      success: true,
      data: doctors
    })
  } catch (error) {
    console.log('Erreur lors de la récupération des médecins:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur serveur lors de la récupération des médecins' 
    }, 500)
  }
})

// Route pour les services médicaux
app.get('/make-server-d31784ab/api/services', async (c) => {
  try {
    const medicalServices = await kv.get('medical_services') || [
      {
        id: 'cardiology',
        name: 'Cardiologie',
        description: 'Diagnostic et traitement des maladies cardiovasculaires',
        available: '24/7',
        urgencyLevel: 'high'
      },
      {
        id: 'neurology',
        name: 'Neurologie',
        description: 'Prise en charge des troubles neurologiques',
        available: 'Lun-Ven',
        urgencyLevel: 'medium'
      },
      {
        id: 'pediatrics',
        name: 'Pédiatrie',
        description: 'Soins spécialisés pour enfants et adolescents',
        available: '24/7',
        urgencyLevel: 'high'
      },
      {
        id: 'orthopedics',
        name: 'Orthopédie',
        description: 'Chirurgie et rééducation des traumatismes osseux',
        available: '24/7',
        urgencyLevel: 'medium'
      }
    ]
    
    return c.json({
      success: true,
      data: medicalServices
    })
  } catch (error) {
    console.log('Erreur lors de la récupération des services:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur serveur lors de la récupération des services' 
    }, 500)
  }
})

// Route pour les informations d'urgence
app.get('/make-server-d31784ab/api/emergency', async (c) => {
  try {
    const emergencyInfo = await kv.get('emergency_info') || {
      phone: '15',
      europeanPhone: '112',
      hospitalPhone: '01 23 45 67 89',
      address: '123 Avenue de la Santé, 75015 Paris',
      availability: '24h/24 - 7j/7',
      services: [
        'Urgences vitales',
        'Traumatismes',
        'Urgences cardiologiques',
        'Urgences pédiatriques'
      ]
    }
    
    return c.json({
      success: true,
      data: emergencyInfo
    })
  } catch (error) {
    console.log('Erreur lors de la récupération des infos urgences:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur serveur lors de la récupération des informations d\'urgence' 
    }, 500)
  }
})

// Route pour initialiser les données hospitalières
app.post('/make-server-d31784ab/api/init-hospital', async (c) => {
  try {
    // Initialisation des statistiques hospitalières
    const hospitalStats = {
      totalDoctors: 150,
      totalStaff: 500,
      specialties: 30,
      patientSatisfaction: 98,
      patientsPerYear: 50000,
      lastUpdated: new Date().toISOString()
    }
    
    await kv.set('hospital_stats', hospitalStats)
    await kv.set('appointments_count', 0)
    await kv.set('patients_count', 0)
    
    return c.json({
      success: true,
      message: 'Données hospitalières initialisées avec succès',
      data: hospitalStats
    })
  } catch (error) {
    console.log('Erreur lors de l\'initialisation des données hospitalières:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur lors de l\'initialisation des données hospitalières' 
    }, 500)
  }
})

// Démarrage du serveur
Deno.serve(app.fetch)