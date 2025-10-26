# ⚡ Commandes Rapides - CHU Management Center

## Guide de Référence pour Toutes les Commandes

---

## 🎯 DÉMARRAGE ULTRA-RAPIDE

### Windows - Un Seul Clic

```batch
REM Double-cliquer sur ce fichier:
start-local.bat
```

### Mac/Linux - Une Seule Commande

```bash
./start-local.sh
```

---

## 📦 INSTALLATION INITIALE

### 1. PostgreSQL + Base de Données

#### Windows

```batch
REM Télécharger PostgreSQL
REM https://www.postgresql.org/download/windows/

REM Installer avec pgAdmin 4
REM Mot de passe: admin123 (à noter)

REM Créer automatiquement la base
setup-database-windows.bat
```

#### Mac

```bash
# Installer PostgreSQL
brew install postgresql@16

# Démarrer le service
brew services start postgresql@16

# Créer automatiquement la base
chmod +x setup-database-mac.sh
./setup-database-mac.sh
```

#### Linux

```bash
# Installer PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer automatiquement la base
chmod +x setup-database-mac.sh
./setup-database-mac.sh
```

### 2. Création Manuelle de la Base (Alternative)

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base
CREATE DATABASE chu_management;

# Créer l'utilisateur
CREATE USER chu_user WITH PASSWORD 'chu_password';

# Donner les privilèges
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;

# Quitter
\q

# Exécuter les scripts SQL
psql -U chu_user -d chu_management -f database/create-tables.sql
psql -U chu_user -d chu_management -f database/sample-data.sql
```

---

## 🚀 LANCEMENT DU PROJET

### Option 1: Script Automatique (RECOMMANDÉ)

#### Windows

```batch
start-local.bat
```

#### Mac/Linux

```bash
./start-local.sh
```

### Option 2: Lancement Manuel

#### Terminal 1: Backend Spring Boot

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Attendre le message**:

```
Started ChuManagementApplication in X.XXX seconds
```

#### Terminal 2: Frontend React

```bash
# Retour à la racine
cd ..

# Installer les dépendances (première fois)
npm install

# Lancer le dev server
npm run dev
```

**Attendre**:

```
VITE ready in XXX ms
➜  Local: http://localhost:5173/
```

---

## 🛠️ COMMANDES MAVEN (Backend)

### Compilation

```bash
cd backend

# Nettoyer et compiler
mvn clean install

# Compiler sans tests
mvn clean install -DskipTests

# Compiler en mode verbose
mvn clean install -X
```

### Exécution

```bash
# Lancer l'application
mvn spring-boot:run

# Lancer avec profil dev
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Lancer avec debug
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
```

### Tests

```bash
# Exécuter tous les tests
mvn test

# Exécuter un test spécifique
mvn test -Dtest=AuthControllerTest

# Tests avec couverture
mvn test jacoco:report
```

### Build Production

```bash
# Créer le JAR
mvn package

# Créer le JAR sans tests
mvn package -DskipTests

# Le JAR est dans: target/chu-management-0.0.1-SNAPSHOT.jar
```

### Lancer le JAR

```bash
java -jar target/chu-management-0.0.1-SNAPSHOT.jar
```

---

## ⚛️ COMMANDES NPM (Frontend)

### Installation

```bash
# Installer toutes les dépendances
npm install

# Installer une dépendance spécifique
npm install react-router-dom

# Installer en dev
npm install --save-dev @types/react
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Lancer sur un port spécifique
npm run dev -- --port 3000

# Lancer avec host
npm run dev -- --host 0.0.0.0
```

### Build

```bash
# Build pour production
npm run build

# Preview du build
npm run preview

# Build avec analyse
npm run build -- --mode production
```

### Nettoyage

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Sur Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 🐘 COMMANDES POSTGRESQL

### Connexion

```bash
# Se connecter à la base
psql -U chu_user -d chu_management

# Se connecter avec mot de passe
psql -U chu_user -d chu_management -W

# Se connecter en tant que postgres
psql -U postgres
```

### Commandes dans psql

```sql
-- Lister les bases de données
\l

-- Se connecter à une base
\c chu_management

-- Lister les tables
\dt

-- Décrire une table
\d users

-- Lister les utilisateurs
\du

-- Exécuter un fichier SQL
\i /path/to/script.sql

-- Afficher les connexions
\conninfo

-- Quitter
\q
```

### Requêtes SQL Utiles

```sql
-- Voir tous les utilisateurs
SELECT * FROM users;

-- Voir tous les médecins
SELECT * FROM doctors;

-- Compter les patients
SELECT COUNT(*) FROM patients;

-- Voir les rendez-vous d'aujourd'hui
SELECT * FROM appointments WHERE appointment_date = CURRENT_DATE;

-- Supprimer toutes les données d'une table
TRUNCATE TABLE appointments CASCADE;

-- Réinitialiser les séquences
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Voir la taille de la base
SELECT pg_size_pretty(pg_database_size('chu_management'));
```

### Backup et Restore

```bash
# Backup de la base
pg_dump -U chu_user chu_management > backup.sql

# Restore de la base
psql -U chu_user -d chu_management < backup.sql

# Backup avec compression
pg_dump -U chu_user chu_management | gzip > backup.sql.gz

# Restore compressé
gunzip -c backup.sql.gz | psql -U chu_user -d chu_management
```

---

## 🎨 COMMANDES PGADMIN

### Via Interface

```
Ouvrir Query Tool:
  Sélectionner la base
  → Clic sur ⚡ (Query Tool)
  → Ou Alt+Shift+Q

Voir les données:
  Clic droit sur table
  → View/Edit Data
  → All Rows

Exporter les données:
  Clic droit sur table
  → Import/Export
  → Export
  → Format: CSV

Rafraîchir:
  Clic droit sur élément
  → Refresh
  → Ou F5
```

---

## 🔧 COMMANDES IDE

### IntelliJ IDEA

```
Ouvrir projet:
  File → Open → backend/

Importer changements Maven:
  Clic droit sur pom.xml
  → Maven → Reload project

Lancer application:
  Clic droit sur ChuManagementApplication.java
  → Run 'ChuManagementApplication'

Debug:
  Clic droit sur ChuManagementApplication.java
  → Debug 'ChuManagementApplication'

Ouvrir Database Tool:
  View → Tool Windows → Database

Ouvrir Terminal:
  View → Tool Windows → Terminal
  → Ou Alt+F12
```

### VS Code

```
Ouvrir projet:
  File → Open Folder → racine/

Ouvrir Terminal:
  Ctrl+` (backtick)

Lancer Backend:
  Dans ChuManagementApplication.java
  → Clic sur "Run" au-dessus de main()

Lancer Frontend:
  Terminal → npm run dev
```

### Eclipse

```
Importer projet:
  File → Import
  → Maven → Existing Maven Projects
  → backend/

Lancer:
  Clic droit sur projet
  → Run As → Spring Boot App

Nettoyer projet:
  Project → Clean

Mettre à jour Maven:
  Clic droit sur projet
  → Maven → Update Project
```

### NetBeans

```
Ouvrir projet:
  File → Open Project
  → backend/

Lancer:
  Clic droit sur projet
  → Run

Clean and Build:
  Clic droit sur projet
  → Clean and Build

Services (Database):
  Window → Services
  → Databases
```

---

## 🌐 COMMANDES CURL (Tests API)

### Tests Backend

```bash
# Health check
curl http://localhost:8080/actuator/health

# Obtenir tous les médecins
curl http://localhost:8080/api/doctors

# Obtenir un médecin spécifique
curl http://localhost:8080/api/doctors/1

# Créer un rendez-vous (POST)
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": 1,
    "doctorId": 1,
    "date": "2025-10-20",
    "time": "14:00"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@chu.com",
    "password": "Admin123!"
  }'
```

---

## 🐛 COMMANDES DÉBOGAGE

### Voir les Processus

#### Windows

```batch
REM Voir ce qui utilise le port 8080
netstat -ano | findstr :8080

REM Tuer un processus
taskkill /PID <PID> /F

REM Voir tous les processus Java
wmic process where "name='java.exe'" get processid,commandline
```

#### Mac/Linux

```bash
# Voir ce qui utilise le port 8080
lsof -i :8080

# Tuer un processus
kill -9 <PID>

# Voir tous les processus Java
ps aux | grep java

# Tuer tous les processus Java
pkill -f java
```

### Logs

```bash
# Logs en temps réel (Spring Boot)
tail -f backend/logs/application.log

# Logs PostgreSQL (Linux)
sudo tail -f /var/log/postgresql/postgresql-16-main.log

# Logs PostgreSQL (Windows)
# C:\Program Files\PostgreSQL\16\data\log\
```

### Vérifier les Services

#### Windows

```batch
REM Ouvrir services
services.msc

REM Chercher "postgresql-x64-16"
REM Vérifier le statut
```

#### Mac

```bash
# Lister les services Homebrew
brew services list

# Redémarrer PostgreSQL
brew services restart postgresql@16
```

#### Linux

```bash
# Statut PostgreSQL
sudo systemctl status postgresql

# Redémarrer
sudo systemctl restart postgresql

# Voir les logs
sudo journalctl -u postgresql
```

---

## 🔄 COMMANDES GIT (Versioning)

```bash
# Initialiser un repo (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit"

# Voir le statut
git status

# Voir l'historique
git log --oneline

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Changer de branche
git checkout main

# Fusionner une branche
git merge feature/nouvelle-fonctionnalite

# Ignorer des fichiers
echo "node_modules/" >> .gitignore
echo "target/" >> .gitignore
echo ".env.local" >> .gitignore
```

---

## 🧹 COMMANDES NETTOYAGE

### Backend

```bash
cd backend

# Nettoyer les builds Maven
mvn clean

# Supprimer le dossier target
rm -rf target/

# Windows
rmdir /s /q target
```

### Frontend

```bash
# Nettoyer node_modules
rm -rf node_modules/

# Windows
rmdir /s /q node_modules

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller
npm install
```

### Base de Données

```sql
-- Supprimer toutes les données
TRUNCATE TABLE appointments CASCADE;
TRUNCATE TABLE medical_records CASCADE;
TRUNCATE TABLE patients CASCADE;
TRUNCATE TABLE doctors CASCADE;
TRUNCATE TABLE users CASCADE;

-- Réexécuter les scripts
\i database/create-tables.sql
\i database/sample-data.sql
```

---

## 📊 COMMANDES MONITORING

### Backend

```bash
# Endpoints Actuator
curl http://localhost:8080/actuator/health
curl http://localhost:8080/actuator/info
curl http://localhost:8080/actuator/metrics

# Voir les métriques spécifiques
curl http://localhost:8080/actuator/metrics/jvm.memory.used
```

### Base de Données

```sql
-- Connexions actives
SELECT * FROM pg_stat_activity;

-- Taille des tables
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Statistiques des requêtes
SELECT * FROM pg_stat_statements;
```

---

## ✅ COMMANDES VÉRIFICATION

### Vérifier l'Installation

```bash
# Java
java -version
javac -version

# Maven
mvn -version

# Node.js
node -v
npm -v

# PostgreSQL
psql --version

# Git
git --version
```

### Tester la Connexion

```bash
# PostgreSQL
psql -U chu_user -d chu_management -c "SELECT COUNT(*) FROM users;"

# Backend
curl -s http://localhost:8080/actuator/health | grep UP

# Frontend
curl -s http://localhost:5173 | grep "CHU Management"
```

---

## 🎯 SCÉNARIOS COURANTS

### Démarrage du Matin

```bash
# 1. Vérifier PostgreSQL
brew services list  # Mac
services.msc        # Windows

# 2. Lancer tout
./start-local.sh    # Mac/Linux
start-local.bat     # Windows

# 3. Ouvrir l'IDE
# IntelliJ/VS Code/Eclipse
```

### Après une Modification du Code

```bash
# Backend changé
cd backend
mvn clean install
# Ctrl+C pour arrêter
mvn spring-boot:run

# Frontend changé
# Le serveur Vite recharge automatiquement
# Si problème:
npm run dev
```

### Réinitialiser Complètement

```bash
# 1. Arrêter tout (Ctrl+C)

# 2. Nettoyer la base
psql -U chu_user -d chu_management -f database/create-tables.sql
psql -U chu_user -d chu_management -f database/sample-data.sql

# 3. Nettoyer le backend
cd backend
mvn clean

# 4. Nettoyer le frontend
cd ..
rm -rf node_modules
npm install

# 5. Relancer
./start-local.sh  # ou .bat
```

---

## 📚 AIDE RAPIDE

### Où Trouver...

```
Logs Backend:
  backend/logs/

Configuration Spring Boot:
  backend/src/main/resources/application.yml

Scripts SQL:
  database/create-tables.sql
  database/sample-data.sql

Code Java:
  backend/src/main/java/com/chu/management/

Code React:
  pages/
  components/
  services/

Documentation:
  GUIDE_INSTALLATION_LOCALE.md
  GUIDE_RAPIDE_PGADMIN.md
  RESUME_IMPORT_LOCAL.md
```

### Ports Utilisés

```
PostgreSQL:  5432
Backend:     8080
Frontend:    5173
Debug:       5005 (si activé)
```

### Mots de Passe par Défaut

```
PostgreSQL Admin:
  User: postgres
  Pass: admin123  (à changer)

Application:
  User: chu_user
  Pass: chu_password

Database: chu_management
```

---

## 🆘 EN CAS DE PROBLÈME

```bash
# 1. Vérifier les services
services.msc        # Windows
brew services list  # Mac

# 2. Voir les logs
tail -f backend/logs/application.log

# 3. Tester la base
psql -U chu_user -d chu_management

# 4. Nettoyer et relancer
# Voir "Réinitialiser Complètement" ci-dessus

# 5. Consulter la documentation
# GUIDE_INSTALLATION_LOCALE.md
# Section "Dépannage"
```

---

**🏥 Gardez ce guide à portée de main pour un accès rapide à toutes les commandes!**