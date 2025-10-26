# 📦 Résumé: Import Local du Projet CHU Management

## Guide Ultra-Rapide pour Démarrer en Local

---

## 🎯 OBJECTIF

Importer et exécuter votre projet **CHU Management Center** en local sur votre machine avec:
- ✅ PostgreSQL (base de données locale)
- ✅ Spring Boot (backend API)
- ✅ React (frontend)
- ✅ Votre IDE préféré (IntelliJ IDEA, VS Code, Eclipse, NetBeans)

---

## 📁 STRUCTURE DU PROJET

```
votre-projet/
├── backend/                  ← Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/        ← Code Java
│   │       └── resources/   ← application.yml
│   └── pom.xml              ← Dépendances Maven
│
├── database/                 ← Scripts SQL
│   ├── create-tables.sql    ← Création des tables
│   └── sample-data.sql      ← Données de test
│
├── services/                 ← Services API Frontend
├── components/               ← Composants React
├── pages/                    ← Pages React
│
├── setup-database-windows.bat  ← Script auto Windows
├── setup-database-mac.sh       ← Script auto Mac/Linux
├── start-local.bat             ← Lancement Windows
├── start-local.sh              ← Lancement Mac/Linux
│
└── GUIDE_INSTALLATION_LOCALE.md  ← Guide complet
```

---

## ⚡ MÉTHODE RAPIDE (RECOMMANDÉE)

### Pour Windows

#### Étape 1: Installer PostgreSQL

1. Télécharger: https://www.postgresql.org/download/windows/
2. Installer avec pgAdmin 4
3. Définir un mot de passe pour `postgres` (ex: `admin123`)

#### Étape 2: Créer la Base de Données Automatiquement

```batch
# Ouvrir PowerShell dans le dossier du projet
# Exécuter le script:
.\setup-database-windows.bat

# Suivre les instructions
# Entrer le mot de passe PostgreSQL quand demandé
```

**Ce script fait TOUT automatiquement**:
- ✅ Crée la base `chu_management`
- ✅ Crée l'utilisateur `chu_user`
- ✅ Exécute les scripts SQL
- ✅ Insère les données de test

#### Étape 3: Ouvrir dans votre IDE

**IntelliJ IDEA**:
```
File → Open → Sélectionner le dossier "backend/"
```

**VS Code**:
```
File → Open Folder → Sélectionner le dossier racine
```

**Eclipse**:
```
File → Import → Maven → Existing Maven Projects
→ Sélectionner "backend/"
```

**NetBeans**:
```
File → Open Project → Sélectionner "backend/"
```

#### Étape 4: Lancer TOUT Automatiquement

```batch
# Double-cliquer sur:
start-local.bat

# Ou dans PowerShell:
.\start-local.bat
```

**Ce script lance**:
- ✅ PostgreSQL (si pas démarré)
- ✅ Backend Spring Boot (port 8080)
- ✅ Frontend React (port 5173)
- ✅ Ouvre le navigateur automatiquement

**TERMINÉ!** 🎉

### Pour Mac/Linux

#### Étape 1: Installer PostgreSQL

```bash
# Mac
brew install postgresql@16
brew services start postgresql@16

# Linux
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Étape 2: Créer la Base de Données Automatiquement

```bash
# Rendre le script exécutable
chmod +x setup-database-mac.sh

# Exécuter
./setup-database-mac.sh
```

#### Étape 3: Ouvrir dans votre IDE

Même procédure que Windows (voir ci-dessus)

#### Étape 4: Lancer TOUT Automatiquement

```bash
# Rendre le script exécutable
chmod +x start-local.sh

# Lancer
./start-local.sh
```

**TERMINÉ!** 🎉

---

## 🐌 MÉTHODE MANUELLE (Étape par Étape)

Si les scripts automatiques ne fonctionnent pas ou si vous préférez le contrôle manuel:

### 1. Créer la Base de Données via pgAdmin

#### A. Lancer pgAdmin 4

**Windows**: Menu Démarrer → pgAdmin 4  
**Mac**: Applications → pgAdmin 4  
**Linux**: Terminal → `pgadmin4`

#### B. Créer le Serveur

```
Clic droit sur "Servers"
→ Register → Server

Onglet "General":
  Name: CHU Local Server

Onglet "Connection":
  Host: localhost
  Port: 5432
  Username: postgres
  Password: admin123  (votre mot de passe)
  ✅ Save password

→ Save
```

#### C. Créer la Base de Données

```
Clic droit sur "Databases"
→ Create → Database

Database: chu_management
Owner: postgres

→ Save
```

#### D. Créer l'Utilisateur

```
Clic droit sur "Login/Group Roles"
→ Create → Login/Group Role

Onglet "General":
  Name: chu_user

Onglet "Definition":
  Password: chu_password

Onglet "Privileges":
  ✅ Can login?
  ✅ Create databases?

→ Save
```

#### E. Exécuter les Scripts SQL

```
1. Cliquer sur "chu_management"
2. Ouvrir Query Tool (⚡ icône)
3. Ouvrir le fichier: database/create-tables.sql
4. Exécuter (F5)
5. Ouvrir le fichier: database/sample-data.sql
6. Exécuter (F5)
```

**✅ Base de données prête!**

### 2. Importer dans l'IDE

#### IntelliJ IDEA

```
1. File → Open
2. Sélectionner le dossier "backend/"
3. Trust Project
4. Attendre import Maven (2-5 min)
5. Ouvrir ChuManagementApplication.java
6. Clic droit → Run
```

#### VS Code

```
1. Installer extension "Java Extension Pack"
2. File → Open Folder → Racine du projet
3. Attendre import Maven
4. Ouvrir ChuManagementApplication.java
5. Cliquer "Run" au-dessus de main()
```

#### Eclipse

```
1. File → Import
2. Maven → Existing Maven Projects
3. Sélectionner "backend/"
4. Finish
5. Clic droit sur projet → Run As → Spring Boot App
```

#### NetBeans

```
1. File → Open Project
2. Sélectionner "backend/"
3. Attendre import Maven
4. Clic droit sur projet → Run
```

### 3. Lancer le Frontend

```bash
# Terminal dans la racine du projet
npm install
npm run dev
```

---

## 🔍 VÉRIFICATIONS

### ✅ Vérifier PostgreSQL

**pgAdmin**:
```
CHU Local Server
└─ Databases
   └─ chu_management
      └─ Schemas
         └─ public
            └─ Tables (10)
               ├─ users
               ├─ doctors
               ├─ patients
               └─ ...
```

**Ligne de commande**:
```bash
psql -U chu_user -d chu_management
\dt
# Devrait lister 10 tables
```

### ✅ Vérifier le Backend

```bash
# Le terminal devrait afficher:
Started ChuManagementApplication in X.XXX seconds

# Tester dans le navigateur:
http://localhost:8080
```

### ✅ Vérifier le Frontend

```bash
# Le terminal devrait afficher:
VITE ready in XXX ms
Local: http://localhost:5173/

# Ouvrir dans le navigateur:
http://localhost:5173
```

### ✅ Test Complet

**Console navigateur (F12)**:
```javascript
fetch('http://localhost:8080/api/doctors')
  .then(r => r.json())
  .then(data => console.log(data));

// Devrait afficher la liste des médecins
```

---

## 📊 CONFIGURATION RÉSUMÉE

### PostgreSQL

```
Host:     localhost
Port:     5432
Database: chu_management
User:     chu_user
Password: chu_password
```

### Backend Spring Boot

```
URL:  http://localhost:8080
API:  http://localhost:8080/api
Port: 8080
```

### Frontend React

```
URL:  http://localhost:5173
Port: 5173
```

### Fichier application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/chu_management
    username: chu_user
    password: chu_password
```

### Fichier services/apiService.ts

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 🛠️ COMMANDES UTILES

### Backend

```bash
# Compiler
cd backend
mvn clean install

# Lancer
mvn spring-boot:run

# Tester
curl http://localhost:8080/actuator/health
```

### Frontend

```bash
# Installer dépendances
npm install

# Lancer dev server
npm run dev

# Build production
npm run build
```

### PostgreSQL

```bash
# Se connecter
psql -U chu_user -d chu_management

# Lister tables
\dt

# Voir données table
SELECT * FROM users;

# Quitter
\q
```

### pgAdmin

```
Voir données:
  Clic droit sur table
  → View/Edit Data
  → All Rows

Exécuter SQL:
  Sélectionner base
  → Query Tool (⚡)
  → Écrire SQL
  → Execute (F5)
```

---

## 🐛 DÉPANNAGE RAPIDE

### Erreur: "Port 8080 already in use"

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8080
kill -9 <PID>
```

### Erreur: "Could not connect to database"

1. Vérifier que PostgreSQL est démarré
2. Vérifier les credentials dans `application.yml`
3. Tester la connexion dans pgAdmin

### Erreur: "Tables not found"

```bash
# Réexécuter les scripts SQL
cd database
psql -U chu_user -d chu_management -f create-tables.sql
psql -U chu_user -d chu_management -f sample-data.sql
```

### Erreur: "Maven dependencies not resolved"

```bash
cd backend
mvn clean install -U
```

### Erreur: Frontend ne charge pas les données

1. Vérifier que le backend est lancé (port 8080)
2. Vérifier `services/apiService.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```
3. Vérifier la console navigateur (F12) pour erreurs CORS

---

## 📚 DOCUMENTATION COMPLÈTE

### Guides Disponibles

1. **`GUIDE_INSTALLATION_LOCALE.md`**
   - Guide complet 2000+ lignes
   - Installation détaillée pour chaque IDE
   - Toutes les configurations

2. **`GUIDE_RAPIDE_PGADMIN.md`**
   - Guide visuel pgAdmin avec captures ASCII
   - Étape par étape pour créer la base

3. **`RESUME_IMPORT_LOCAL.md`** ← Ce fichier
   - Résumé rapide
   - Commandes essentielles

4. **Scripts d'automatisation**:
   - `setup-database-windows.bat`
   - `setup-database-mac.sh`
   - `start-local.bat`
   - `start-local.sh`

---

## ✅ CHECKLIST COMPLÈTE

### Prérequis

- [ ] JDK 17+ installé
- [ ] Maven installé
- [ ] Node.js + npm installés
- [ ] PostgreSQL installé
- [ ] pgAdmin 4 installé
- [ ] IDE installé

### Configuration

- [ ] Base de données `chu_management` créée
- [ ] Utilisateur `chu_user` créé
- [ ] Tables créées (10 tables)
- [ ] Données de test insérées
- [ ] `application.yml` configuré
- [ ] `apiService.ts` configuré

### Exécution

- [ ] PostgreSQL démarré
- [ ] Backend Spring Boot lancé (port 8080)
- [ ] Frontend React lancé (port 5173)
- [ ] Tests passés avec succès

---

## 🎯 DEUX VERSIONS DU PROJET

### Version Actuelle (Figma Make)

```
Frontend React
    ↓
Supabase Edge Functions
    ↓
Supabase PostgreSQL

✅ Déjà configuré
✅ Fonctionne en ligne
✅ Aucune installation requise
```

### Version Locale (Ce Guide)

```
Frontend React
    ↓
Spring Boot Backend
    ↓
PostgreSQL Local

✅ Contrôle total
✅ Développement offline
✅ Personnalisation complète
```

**Les deux versions utilisent le même frontend React!**

Pour passer de l'une à l'autre, changez simplement l'URL de l'API:

```typescript
// Version Figma Make (Supabase)
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d31784ab`;

// Version Locale (Spring Boot)
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 🎉 CONCLUSION

### Méthode Rapide (Recommandée)

```bash
# 1. Installer PostgreSQL + pgAdmin
# 2. Exécuter:
.\setup-database-windows.bat  # Windows
./setup-database-mac.sh        # Mac/Linux

# 3. Lancer:
.\start-local.bat              # Windows
./start-local.sh               # Mac/Linux

# 4. Ouvrir: http://localhost:5173
```

**Temps total: 15-20 minutes**

### Résultat

✅ Projet CHU Management fonctionnel en local

✅ Base de données PostgreSQL opérationnelle

✅ Backend Spring Boot connecté

✅ Frontend React affichant les données

✅ Prêt pour le développement

---

**🏥 Bon développement avec votre Centre Hospitalier Universitaire!**

*Pour plus de détails, consultez `GUIDE_INSTALLATION_LOCALE.md`*
