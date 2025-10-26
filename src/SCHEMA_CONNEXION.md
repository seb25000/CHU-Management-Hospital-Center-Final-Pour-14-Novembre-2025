# 🔌 Schéma de Connexion - CHU Management

## 📊 Architecture Complète

```
┌───────────────────────────────────────────────────────────────────┐
│                    CHU MANAGEMENT HOSPITAL CENTER                 │
│                     Full-Stack Application                        │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          OPTION 1 : SUPABASE                            │
│                            (Actuel - Cloud)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐      ┌──────────────────┐      ┌────────────────┐    │
│  │   FRONTEND  │────► │  SUPABASE EDGE   │────► │   POSTGRESQL   │    │
│  │   React     │      │    FUNCTIONS     │      │     (Cloud)    │    │
│  │  TypeScript │      │   (Hono Server)  │      │                │    │
│  │             │      │                  │      │  chu_management│    │
│  │ localhost:  │      │  functions/      │      │                │    │
│  │    5173     │      │    server/       │      │  - users       │    │
│  │             │      │                  │      │  - doctors     │    │
│  └─────────────┘      └──────────────────┘      │  - patients    │    │
│                                                  │  - appointments│    │
│  Avantages:                                     │  - services    │    │
│  ✅ Aucune installation                          └────────────────┘    │
│  ✅ Déjà configuré                                                     │
│  ✅ Toujours disponible                                                │
│                                                                         │
│  Commandes:                                                             │
│  npm run dev                                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        OPTION 2 : SPRING BOOT                           │
│                      (Nouveau - Local avec PostgreSQL)                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐      ┌──────────────────┐      ┌────────────────┐    │
│  │   FRONTEND  │────► │   SPRING BOOT    │────► │   POSTGRESQL   │    │
│  │   React     │      │      API         │      │     (Local)    │    │
│  │  TypeScript │      │   Java 17+       │      │                │    │
│  │             │      │                  │      │  chu_management│    │
│  │ localhost:  │      │  Spring Security │      │                │    │
│  │    5173     │      │   JWT Auth       │      │  - users       │    │
│  │             │      │   JPA/Hibernate  │      │  - doctors     │    │
│  │             │      │                  │      │  - patients    │    │
│  └─────────────┘      │  localhost:8080  │      │  - appointments│    │
│                       │                  │      │  - services    │    │
│                       └──────────────────┘      │  - departments │    │
│                                                 │                │    │
│  Avantages:                                    │  localhost:5432│    │
│  ✅ Contrôle total                              └────────────────┘    │
│  ✅ Pas d'internet requis                                              │
│  ✅ Très rapide                                                        │
│  ✅ Parfait pour apprentissage                                         │
│                                                                         │
│  Commandes:                                                             │
│  START_TOUT.bat  (Windows)                                              │
│  ./START_TOUT.sh (Mac/Linux)                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données Détaillé

### Option 1 : Supabase (Actuel)

```
┌──────────────────────────────────────────────────────────────┐
│                      FLUX SUPABASE                           │
└──────────────────────────────────────────────────────────────┘

1. Utilisateur clique "Voir les médecins"
   │
   ├─► Frontend (React) : Page DoctorsPage.tsx
   │
   ├─► Appel API : CHUApiService.getDoctors()
   │
   ├─► Requête HTTP : GET https://[project].supabase.co/functions/v1/.../doctors
   │   Header: Authorization: Bearer [token]
   │
   ├─► Supabase Edge Function : /supabase/functions/server/chu-api.tsx
   │   app.get('/doctors', async (c) => { ... })
   │
   ├─► KV Store : kv.getByPrefix('doctors:')
   │
   ├─► PostgreSQL (Supabase) : SELECT * FROM kv_store WHERE key LIKE 'doctors:%'
   │
   ├─► Réponse JSON :
   │   [
   │     { id: "1", firstName: "Marie", lastName: "Dubois", ... },
   │     { id: "2", firstName: "Pierre", lastName: "Martin", ... }
   │   ]
   │
   └─► Affichage : Composant MedicalTeam affiche les cartes des médecins
```

### Option 2 : Spring Boot (Nouveau)

```
┌──────────────────────────────────────────────────────────────┐
│                    FLUX SPRING BOOT                          │
└──────────────────────────────────────────────────────────────┘

1. Utilisateur clique "Voir les médecins"
   │
   ├─► Frontend (React) : Page DoctorsPage.tsx
   │
   ├─► Appel API : SpringBootApiService.getDoctors()
   │
   ├─► Requête HTTP : GET http://localhost:8080/api/doctors
   │   Header: Authorization: Bearer [JWT token]
   │
   ├─► Spring Security : JwtAuthenticationFilter vérifie le token
   │
   ├─► Controller : DoctorController.getAllDoctors()
   │   @GetMapping("/api/doctors")
   │
   ├─► Service : DoctorService.findAll()
   │
   ├─► Repository : DoctorRepository extends JpaRepository<Doctor, Long>
   │
   ├─► JPA/Hibernate : Génère requête SQL
   │   SELECT * FROM doctors WHERE is_available = true
   │
   ├─► PostgreSQL Local : Exécute la requête
   │
   ├─► Entité : List<Doctor> mappée en objets Java
   │
   ├─► Réponse JSON :
   │   [
   │     { id: 1, firstName: "Marie", lastName: "Dubois", ... },
   │     { id: 2, firstName: "Pierre", lastName: "Martin", ... }
   │   ]
   │
   └─► Affichage : Composant MedicalTeam affiche les cartes des médecins
```

---

## 🗄️ Structure de la Base de Données

### Tables PostgreSQL (Identiques pour les 2 options)

```sql
┌──────────────────────────────────────────────────────────────┐
│                    SCHÉMA DE BASE DE DONNÉES                 │
└──────────────────────────────────────────────────────────────┘

┌─────────────────┐
│     users       │  (Authentification)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ email           │  VARCHAR(255) UNIQUE NOT NULL
│ password        │  VARCHAR(255) NOT NULL (hashé)
│ first_name      │  VARCHAR(100)
│ last_name       │  VARCHAR(100)
│ role            │  VARCHAR(50) DEFAULT 'PATIENT'
│ created_at      │  TIMESTAMP DEFAULT NOW()
│ updated_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘

┌─────────────────┐
│    doctors      │  (Médecins)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ first_name      │  VARCHAR(100) NOT NULL
│ last_name       │  VARCHAR(100) NOT NULL
│ email           │  VARCHAR(255) UNIQUE
│ phone           │  VARCHAR(20)
│ specialty       │  VARCHAR(100) NOT NULL
│ license_number  │  VARCHAR(50) UNIQUE
│ years_experience│  INTEGER
│ qualification   │  TEXT
│ consultation_fee│  DECIMAL(10,2)
│ is_available    │  BOOLEAN DEFAULT true
│ image_url       │  TEXT
│ department_id   │  BIGINT → departments(id)
│ created_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘

┌─────────────────┐
│    patients     │  (Patients)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ first_name      │  VARCHAR(100) NOT NULL
│ last_name       │  VARCHAR(100) NOT NULL
│ email           │  VARCHAR(255) UNIQUE
│ phone           │  VARCHAR(20)
│ date_of_birth   │  DATE
│ gender          │  VARCHAR(10)
│ address         │  TEXT
│ security_number │  VARCHAR(50) UNIQUE
│ user_id         │  BIGINT → users(id)
│ created_at      │  TIMESTAMP DEFAULT NOW()
│ updated_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘

┌─────────────────┐
│  appointments   │  (Rendez-vous)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ patient_id      │  BIGINT → patients(id)
│ doctor_id       │  BIGINT → doctors(id)
│ appointment_date│  TIMESTAMP NOT NULL
│ reason          │  TEXT NOT NULL
│ status          │  VARCHAR(50) DEFAULT 'SCHEDULED'
│ notes           │  TEXT
│ created_at      │  TIMESTAMP DEFAULT NOW()
│ updated_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘

┌─────────────────┐
│    services     │  (Services médicaux)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ name            │  VARCHAR(200) NOT NULL
│ description     │  TEXT
│ icon            │  VARCHAR(50)
│ is_active       │  BOOLEAN DEFAULT true
│ created_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘

┌─────────────────┐
│  departments    │  (Départements)
├─────────────────┤
│ id              │  BIGSERIAL PRIMARY KEY
│ name            │  VARCHAR(200) NOT NULL
│ description     │  TEXT
│ floor           │  INTEGER
│ phone           │  VARCHAR(20)
│ created_at      │  TIMESTAMP DEFAULT NOW()
└─────────────────┘
```

---

## 🔑 Relations entre Tables

```
users (1) ────────► (N) patients
                    │
                    │
                    ▼
                 (N) appointments (N)
                    │
                    │
                    ▼
departments (1) ──► (N) doctors ──────► (N) appointments
```

---

## 🔐 Authentification (JWT)

### Flux d'Authentification

```
┌──────────────────────────────────────────────────────────────┐
│                   FLUX D'AUTHENTIFICATION                    │
└──────────────────────────────────────────────────────────────┘

1. Login
   │
   ├─► POST /auth/login
   │   Body: { email, password }
   │
   ├─► Vérification password (bcrypt)
   │
   ├─► Génération JWT Token
   │   Header: { alg: "HS256", typ: "JWT" }
   │   Payload: { userId, email, role, exp: 24h }
   │   Signature: HMAC SHA256(header + payload, SECRET_KEY)
   │
   ├─► Réponse:
   │   {
   │     token: "eyJhbGciOiJIUzI1NiIs...",
   │     user: { id, email, firstName, lastName, role }
   │   }
   │
   └─► Stockage localStorage.setItem('chu_access_token', token)

2. Requête Authentifiée
   │
   ├─► GET /api/patients
   │   Header: Authorization: Bearer [token]
   │
   ├─► JwtAuthenticationFilter vérifie token
   │   - Token valide ?
   │   - Pas expiré ?
   │   - Signature correcte ?
   │
   ├─► Si valide : Requête autorisée
   │
   └─► Si invalide : 401 Unauthorized
```

---

## 📂 Structure des Fichiers

### Frontend (React)

```
/
├── App.tsx                          # Point d'entrée
├── services/
│   ├── apiConfig.ts                 # 🔧 CONFIGURATION (changer ici !)
│   ├── chuApiService.ts             # Service Supabase
│   └── springBootApiService.ts     # Service Spring Boot
├── pages/
│   ├── DoctorsPage.tsx
│   ├── PatientsPage.tsx
│   ├── AppointmentsPage.tsx
│   └── ...
└── components/
    └── hospital/
        ├── MedicalTeam.tsx
        └── ...
```

### Backend (Spring Boot)

```
/backend/
├── src/main/java/com/chu/management/
│   ├── ChuManagementApplication.java
│   ├── controller/
│   │   ├── DoctorController.java
│   │   ├── PatientController.java
│   │   └── AppointmentController.java
│   ├── service/
│   │   ├── DoctorService.java
│   │   └── ...
│   ├── repository/
│   │   ├── DoctorRepository.java
│   │   └── ...
│   ├── entity/
│   │   ├── Doctor.java
│   │   └── ...
│   └── config/
│       ├── SecurityConfig.java
│       └── CorsConfig.java
└── src/main/resources/
    └── application.yml              # Configuration
```

---

## ⚙️ Configuration pour Changer de Backend

### Fichier Clé : `/services/apiConfig.ts`

```typescript
// LIGNE À MODIFIER :
export const BACKEND_TYPE: BackendType = 'supabase';  // OU 'springboot'
```

### Effet du Changement

| Ligne | Frontend Utilise | Backend Actif |
|-------|------------------|---------------|
| `'supabase'` | CHUApiService | Supabase Cloud |
| `'springboot'` | SpringBootApiService | Spring Boot Local |

**C'est tout !** Aucune autre modification nécessaire.

---

## 🚀 Scripts de Démarrage

### Windows : `START_TOUT.bat`

```
1. Vérifie PostgreSQL (pg_isready)
2. Vérifie Java (java -version)
3. Charge .env.bat
4. Lance Spring Boot (mvnw.cmd spring-boot:run)
5. Lance React (npm run dev)
6. Ouvre http://localhost:5173
```

### Mac/Linux : `START_TOUT.sh`

```
1. Vérifie PostgreSQL (pg_isready)
2. Vérifie Java (java -version)
3. Source .env.sh
4. Lance Spring Boot (./mvnw spring-boot:run &)
5. Lance React (npm run dev &)
6. Ouvre http://localhost:5173
```

---

## 📊 Ports Utilisés

| Service | Port | URL |
|---------|------|-----|
| Frontend React | 5173 | http://localhost:5173 |
| Backend Spring | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | localhost:5432 |
| Supabase | - | Cloud (https) |

---

## ✅ Checklist de Démarrage

### Supabase (Actuel)
- [ ] Connexion internet ✅
- [ ] `npm run dev`
- [ ] Ouvrir http://localhost:5173

### Spring Boot (Local)
- [ ] PostgreSQL installé et démarré
- [ ] Java 17+ installé
- [ ] Base de données créée
- [ ] Tables créées
- [ ] `BACKEND_TYPE = 'springboot'` dans apiConfig.ts
- [ ] `START_TOUT.bat` ou `./START_TOUT.sh`

---

**Votre application est complètement configurée pour les 2 options !**

Choisissez celle qui convient le mieux à vos besoins. 🎯
