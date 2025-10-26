# 🔌 Guide Complet : Connexion PostgreSQL

## 📊 État Actuel de Votre Projet

Votre application utilise **3 systèmes différents** :

```
┌─────────────────────────────────────────────────────────────┐
│             ARCHITECTURE ACTUELLE (3 OPTIONS)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. ✅ SUPABASE (Cloud) - Actuellement utilisé             │
│     Frontend → Supabase Edge Functions → PostgreSQL Cloud  │
│                                                             │
│  2. ⚠️  SPRING BOOT (Local) - Code présent mais non utilisé │
│     Frontend → Spring Boot API → PostgreSQL Local          │
│                                                             │
│  3. ❌ PostgreSQL Direct - Non configuré                    │
│     Frontend → PostgreSQL (pas recommandé pour sécurité)   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Option Recommandée : Spring Boot + PostgreSQL

Je vais vous guider pour **Option 2** (la meilleure pour un projet local).

---

## 📋 ÉTAPE 1 : Vérifier PostgreSQL

### 1.1 Vérifier si PostgreSQL est installé

**Windows** :
```bash
# Ouvrir CMD ou PowerShell
psql --version
```

**Mac/Linux** :
```bash
psql --version
```

**Résultat attendu** :
```
psql (PostgreSQL) 14.x
```

### 1.2 Si PostgreSQL n'est PAS installé

**Windows** :
1. Télécharger : https://www.postgresql.org/download/windows/
2. Installer PostgreSQL 14 ou supérieur
3. **IMPORTANT** : Noter le mot de passe du superutilisateur `postgres`
4. Port par défaut : `5432`

**Mac** :
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian)** :
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## 📋 ÉTAPE 2 : Créer la Base de Données

### 2.1 Se connecter à PostgreSQL

**Windows** :
```bash
# Dans CMD ou PowerShell
psql -U postgres
# Entrer le mot de passe que vous avez défini lors de l'installation
```

**Mac/Linux** :
```bash
sudo -u postgres psql
```

### 2.2 Créer la base de données et l'utilisateur

Une fois connecté à PostgreSQL, exécuter ces commandes :

```sql
-- Créer la base de données
CREATE DATABASE chu_management;

-- Créer un utilisateur
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';

-- Donner tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;

-- Se connecter à la nouvelle base de données
\c chu_management

-- Donner les privilèges sur le schéma
GRANT ALL ON SCHEMA public TO chu_user;

-- Quitter
\q
```

### 2.3 Vérifier la connexion

```bash
# Tester la connexion avec le nouvel utilisateur
psql -U chu_user -d chu_management -h localhost

# Si ça fonctionne, vous êtes connecté !
# Quitter avec \q
```

---

## 📋 ÉTAPE 3 : Créer les Tables

### 3.1 Exécuter le script SQL

**Option A : Via ligne de commande**
```bash
# Se placer dans le dossier du projet
cd /chemin/vers/votre/projet

# Exécuter le script
psql -U chu_user -d chu_management -h localhost -f database/init.sql
```

**Option B : Via pgAdmin** (Interface graphique)
1. Ouvrir pgAdmin
2. Connecter au serveur PostgreSQL
3. Ouvrir la base `chu_management`
4. Ouvrir Query Tool (Outil de requête)
5. Copier-coller le contenu de `database/init.sql`
6. Exécuter (F5)

### 3.2 Vérifier les tables créées

```bash
# Se connecter
psql -U chu_user -d chu_management -h localhost

# Lister les tables
\dt

# Vous devriez voir :
# - users
# - doctors
# - patients
# - appointments
# - services
# - departments
```

---

## 📋 ÉTAPE 4 : Configurer Spring Boot

### 4.1 Vérifier Java

```bash
java -version
```

**Résultat attendu** :
```
java version "17" ou supérieur
```

**Si Java n'est pas installé** :
- Windows : https://adoptium.net/
- Mac : `brew install openjdk@17`
- Linux : `sudo apt install openjdk-17-jdk`

### 4.2 Créer le fichier de variables d'environnement

**Windows** - Créer `backend/.env.bat` :
```batch
@echo off
set DB_USERNAME=chu_user
set DB_PASSWORD=chu_password
set JWT_SECRET=chu_management_secret_key_2024_very_long_and_secure
set ADMIN_PASSWORD=Admin@123
```

**Mac/Linux** - Créer `backend/.env.sh` :
```bash
#!/bin/bash
export DB_USERNAME=chu_user
export DB_PASSWORD=chu_password
export JWT_SECRET=chu_management_secret_key_2024_very_long_and_secure
export ADMIN_PASSWORD=Admin@123
```

### 4.3 Démarrer Spring Boot

**Windows** :
```bash
cd backend
call .env.bat
mvnw.cmd spring-boot:run
```

**Mac/Linux** :
```bash
cd backend
source .env.sh
./mvnw spring-boot:run
```

**OU avec Maven installé** :
```bash
cd backend
mvn spring-boot:run
```

**Résultat attendu** :
```
Started ChuManagementApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

### 4.4 Tester l'API

Ouvrir dans le navigateur :
```
http://localhost:8080/api/doctors
```

Vous devriez voir les données des médecins en JSON.

---

## 📋 ÉTAPE 5 : Connecter le Frontend

### 5.1 Créer un nouveau service API pour Spring Boot

Je vais créer un nouveau fichier pour l'API locale.

### 5.2 Modifier la configuration

Vous aurez le choix entre :
- **Supabase** (cloud) - Actuel
- **Spring Boot** (local) - Nouveau

---

## 🔧 ÉTAPE 6 : Scripts Automatiques

### 6.1 Script de démarrage complet - Windows

Créer `START_TOUT.bat` :
```batch
@echo off
echo ========================================
echo   CHU MANAGEMENT - DEMARRAGE COMPLET
echo ========================================
echo.

echo [1/3] Verification PostgreSQL...
pg_isready -h localhost -p 5432
if %errorlevel% neq 0 (
    echo ERREUR : PostgreSQL n'est pas demarré
    echo Demarrez PostgreSQL avant de continuer
    pause
    exit /b 1
)
echo PostgreSQL : OK

echo.
echo [2/3] Demarrage Spring Boot...
cd backend
start cmd /k "call .env.bat && mvnw.cmd spring-boot:run"
timeout /t 10

echo.
echo [3/3] Demarrage Frontend React...
cd ..
start cmd /k "npm run dev"

echo.
echo ========================================
echo   DEMARRAGE TERMINE !
echo ========================================
echo.
echo Frontend : http://localhost:5173
echo Backend  : http://localhost:8080
echo.
pause
```

### 6.2 Script de démarrage complet - Mac/Linux

Créer `START_TOUT.sh` :
```bash
#!/bin/bash

echo "========================================"
echo "  CHU MANAGEMENT - DEMARRAGE COMPLET"
echo "========================================"
echo ""

echo "[1/3] Verification PostgreSQL..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "ERREUR : PostgreSQL n'est pas demarré"
    echo "Demarrez PostgreSQL avant de continuer"
    exit 1
fi
echo "PostgreSQL : OK"

echo ""
echo "[2/3] Demarrage Spring Boot..."
cd backend
source .env.sh
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..
sleep 10

echo ""
echo "[3/3] Demarrage Frontend React..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  DEMARRAGE TERMINE !"
echo "========================================"
echo ""
echo "Frontend : http://localhost:5173"
echo "Backend  : http://localhost:8080"
echo ""
echo "Pour arreter : Ctrl+C"
echo ""

# Attendre
wait $BACKEND_PID $FRONTEND_PID
```

Rendre exécutable :
```bash
chmod +x START_TOUT.sh
```

---

## 📋 ÉTAPE 7 : Tester la Connexion

### 7.1 Vérifier PostgreSQL

```bash
# Test de connexion
psql -U chu_user -d chu_management -h localhost -c "SELECT COUNT(*) FROM doctors;"
```

### 7.2 Vérifier Spring Boot

```bash
# Test API
curl http://localhost:8080/api/doctors
```

### 7.3 Vérifier le Frontend

1. Ouvrir : http://localhost:5173
2. Aller sur la page "Médecins"
3. Les médecins devraient s'afficher

---

## ⚠️ Résolution des Problèmes Courants

### Problème 1 : PostgreSQL ne démarre pas

**Solution Windows** :
```bash
# Ouvrir Services (services.msc)
# Chercher "postgresql"
# Clic droit → Démarrer
```

**Solution Mac** :
```bash
brew services start postgresql@14
```

**Solution Linux** :
```bash
sudo systemctl start postgresql
```

### Problème 2 : "password authentication failed"

**Solution** : Modifier `pg_hba.conf`

**Trouver le fichier** :
```bash
psql -U postgres -c "SHOW hba_file;"
```

**Modifier** :
```bash
# Changer cette ligne :
# local   all   all   peer

# En :
local   all   all   md5
```

**Redémarrer PostgreSQL** :
```bash
# Windows
net stop postgresql-x64-14
net start postgresql-x64-14

# Mac
brew services restart postgresql@14

# Linux
sudo systemctl restart postgresql
```

### Problème 3 : Port 8080 déjà utilisé

**Solution** : Modifier `backend/src/main/resources/application.yml`
```yaml
server:
  port: 8081  # Changer le port
```

### Problème 4 : Tables non créées

**Solution** : Exécuter manuellement
```bash
psql -U chu_user -d chu_management -h localhost -f database/init.sql
```

### Problème 5 : CORS Error dans le navigateur

**Solution** : Vérifier `backend/src/main/java/com/chu/management/config/CorsConfig.java`

Doit contenir :
```java
.allowedOrigins("http://localhost:5173", "http://localhost:3000")
```

---

## 📊 Schéma de la Base de Données

```
┌─────────────────────────────────────────────────────┐
│                   chu_management                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📄 users         → Utilisateurs (auth)             │
│  👨‍⚕️ doctors       → Médecins                        │
│  👤 patients      → Patients                        │
│  📅 appointments  → Rendez-vous                     │
│  🏥 services      → Services médicaux               │
│  🏢 departments   → Départements                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Checklist Finale

Avant de dire que tout fonctionne :

- [ ] ✅ PostgreSQL installé et démarré
- [ ] ✅ Base de données `chu_management` créée
- [ ] ✅ Utilisateur `chu_user` créé
- [ ] ✅ Tables créées (users, doctors, etc.)
- [ ] ✅ Données de test insérées
- [ ] ✅ Java 17+ installé
- [ ] ✅ Maven fonctionne (`mvn --version`)
- [ ] ✅ Spring Boot démarre sans erreur
- [ ] ✅ API répond sur http://localhost:8080
- [ ] ✅ Frontend se connecte à l'API
- [ ] ✅ Données affichées dans l'interface

---

## 🎯 Prochaine Étape

Je vais maintenant créer le nouveau service API pour connecter votre frontend à Spring Boot.

Voulez-vous que je procède ?
