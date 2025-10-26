# 🏥 Guide d'Installation Locale - CHU Management Center
## Import dans IntelliJ IDEA, VS Code, Eclipse, NetBeans + PostgreSQL

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis à Installer](#prérequis-à-installer)
2. [Installation de PostgreSQL + pgAdmin](#installation-de-postgresql--pgadmin)
3. [Création de la Base de Données](#création-de-la-base-de-données)
4. [Import dans IntelliJ IDEA](#import-dans-intellij-idea)
5. [Import dans VS Code](#import-dans-vs-code)
6. [Import dans Eclipse](#import-dans-eclipse)
7. [Import dans NetBeans](#import-dans-netbeans)
8. [Configuration du Frontend React](#configuration-du-frontend-react)
9. [Lancement Complet du Projet](#lancement-complet-du-projet)
10. [Vérification et Tests](#vérification-et-tests)
11. [Dépannage](#dépannage)

---

## ⚠️ IMPORTANT - DEUX VERSIONS DU PROJET

Votre projet a **DEUX configurations possibles**:

### 🌐 **Version 1: Figma Make (ACTUELLE)**
```
Frontend React → Supabase Edge Functions → Supabase PostgreSQL
✅ Déjà configuré et fonctionnel
✅ Rien à installer
```

### 💻 **Version 2: Installation Locale (CE GUIDE)**
```
Frontend React → Spring Boot API → PostgreSQL Local
⏳ Nécessite installation
⏳ Nécessite configuration
```

**Ce guide concerne la Version 2 (Installation Locale)**

---

## 📦 PRÉREQUIS À INSTALLER

### 1. Java Development Kit (JDK)

#### Windows:

1. **Télécharger JDK 17+**:
   - Aller sur: https://adoptium.net/
   - Cliquer sur "Download" pour Windows
   - Version: JDK 17 LTS (ou 21)
   - Architecture: x64

2. **Installer**:
   - Double-cliquer sur le fichier `.msi`
   - Suivre l'assistant d'installation
   - ✅ Cocher "Set JAVA_HOME variable"
   - ✅ Cocher "Add to PATH"

3. **Vérifier l'installation**:
   ```bash
   # Ouvrir PowerShell ou CMD
   java -version
   # Devrait afficher: openjdk version "17.x.x"
   
   javac -version
   # Devrait afficher: javac 17.x.x
   ```

#### Mac:

```bash
# Installer via Homebrew
brew install openjdk@17

# Ajouter au PATH
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Vérifier
java -version
```

#### Linux:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Vérifier
java -version
```

### 2. Maven

#### Windows:

1. **Télécharger Maven**:
   - Aller sur: https://maven.apache.org/download.cgi
   - Télécharger "apache-maven-3.9.x-bin.zip"

2. **Extraire**:
   - Extraire dans: `C:\Program Files\Apache\maven`

3. **Configurer les variables d'environnement**:
   - Appuyez sur `Windows + Pause` → "Paramètres système avancés"
   - "Variables d'environnement"
   - Créer `MAVEN_HOME`: `C:\Program Files\Apache\maven`
   - Ajouter à `Path`: `%MAVEN_HOME%\bin`

4. **Vérifier**:
   ```bash
   mvn -version
   ```

#### Mac/Linux:

```bash
# Mac
brew install maven

# Linux
sudo apt install maven

# Vérifier
mvn -version
```

### 3. Node.js et npm

#### Windows:

1. **Télécharger**: https://nodejs.org/
2. **Version**: LTS (Long Term Support)
3. **Installer**: Double-cliquer et suivre l'assistant

#### Mac/Linux:

```bash
# Mac
brew install node

# Linux
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Vérifier**:
```bash
node -v
npm -v
```

### 4. Git

#### Windows:

1. **Télécharger**: https://git-scm.com/download/win
2. **Installer**: Suivre l'assistant avec options par défaut

#### Mac/Linux:

```bash
# Mac
brew install git

# Linux
sudo apt install git
```

**Vérifier**:
```bash
git --version
```

---

## 🐘 INSTALLATION DE POSTGRESQL + PGADMIN

### Windows - Installation Complète

#### Étape 1: Télécharger PostgreSQL

1. **Aller sur**: https://www.postgresql.org/download/windows/
2. **Cliquer**: "Download the installer"
3. **Choisir**: PostgreSQL 16.x (dernière version)
4. **Architecture**: Windows x86-64

#### Étape 2: Installer PostgreSQL

1. **Lancer l'installateur**:
   - Double-cliquer sur le fichier `.exe`
   
2. **Assistant d'installation**:
   
   **Écran 1: Welcome**
   - Cliquer "Next"
   
   **Écran 2: Installation Directory**
   - Par défaut: `C:\Program Files\PostgreSQL\16`
   - Cliquer "Next"
   
   **Écran 3: Select Components**
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4
   - ✅ Stack Builder
   - ✅ Command Line Tools
   - Cliquer "Next"
   
   **Écran 4: Data Directory**
   - Par défaut: `C:\Program Files\PostgreSQL\16\data`
   - Cliquer "Next"
   
   **Écran 5: Password** ⚠️ IMPORTANT
   - Entrer un mot de passe pour l'utilisateur `postgres`
   - **Exemple**: `admin123` (NOTEZ-LE BIEN!)
   - Confirmer le mot de passe
   - Cliquer "Next"
   
   **Écran 6: Port**
   - Par défaut: `5432`
   - Cliquer "Next"
   
   **Écran 7: Advanced Options**
   - Locale: Default locale
   - Cliquer "Next"
   
   **Écran 8: Summary**
   - Vérifier les paramètres
   - Cliquer "Next"
   
   **Installation**
   - Attendre la fin (2-3 minutes)
   - Cliquer "Finish"

#### Étape 3: Vérifier l'Installation

1. **Ouvrir PowerShell**:
   ```bash
   # Tester la connexion
   psql -U postgres
   # Entrer le mot de passe défini (ex: admin123)
   ```

2. **Si ça fonctionne**:
   ```
   psql (16.x)
   Type "help" for help.
   postgres=#
   ```
   
3. **Quitter psql**:
   ```sql
   \q
   ```

#### Étape 4: Lancer pgAdmin 4

1. **Ouvrir pgAdmin 4**:
   - Menu Démarrer → Rechercher "pgAdmin 4"
   - Ou: `C:\Program Files\PostgreSQL\16\pgAdmin 4\bin\pgAdmin4.exe`

2. **Premier lancement**:
   - Définir un mot de passe principal pour pgAdmin
   - **Exemple**: `pgadmin123` (NOTEZ-LE!)

3. **Interface pgAdmin**:
   ```
   ┌─────────────────────────────────────────┐
   │ pgAdmin 4                               │
   ├─────────────────────────────────────────┤
   │ Browser          │ Dashboard            │
   │ ├─ Servers       │                      │
   │    └─ PostgreSQL │  [Statistiques DB]   │
   │       ├─ Databases                      │
   │       ├─ Login/Group Roles              │
   │       └─ Tablespaces                    │
   └─────────────────────────────────────────┘
   ```

### Mac - Installation

```bash
# Installer PostgreSQL
brew install postgresql@16

# Démarrer le service
brew services start postgresql@16

# Installer pgAdmin
brew install --cask pgadmin4

# Tester
psql postgres
```

### Linux - Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Installer pgAdmin
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
sudo apt update
sudo apt install pgadmin4-desktop

# Tester
sudo -u postgres psql
```

---

## 🗄️ CRÉATION DE LA BASE DE DONNÉES

### Méthode 1: Via pgAdmin 4 (RECOMMANDÉ - Interface Graphique)

#### Étape 1: Connecter le Serveur PostgreSQL

1. **Ouvrir pgAdmin 4**

2. **Dans le panneau "Browser" (gauche)**:
   - Cliquer sur "Servers"
   - Clic droit → "Register" → "Server..."

3. **Onglet "General"**:
   - Name: `CHU Local Server`

4. **Onglet "Connection"**:
   - Host: `localhost`
   - Port: `5432`
   - Maintenance database: `postgres`
   - Username: `postgres`
   - Password: `admin123` (votre mot de passe)
   - ✅ Cocher "Save password"

5. **Cliquer "Save"**

6. **Le serveur apparaît**:
   ```
   Servers
   └─ CHU Local Server
      ├─ Databases (2)
      │  ├─ postgres
      │  └─ template1
      ├─ Login/Group Roles
      └─ Tablespaces
   ```

#### Étape 2: Créer la Base de Données "chu_management"

1. **Dans pgAdmin**, développer "CHU Local Server"

2. **Clic droit sur "Databases"**:
   - "Create" → "Database..."

3. **Onglet "General"**:
   - Database: `chu_management`
   - Owner: `postgres`

4. **Cliquer "Save"**

5. **Vérifier**:
   ```
   Servers
   └─ CHU Local Server
      └─ Databases (3)
         ├─ chu_management  ← NOUVELLE BASE
         ├─ postgres
         └─ template1
   ```

#### Étape 3: Créer l'Utilisateur "chu_user"

1. **Clic droit sur "Login/Group Roles"**:
   - "Create" → "Login/Group Role..."

2. **Onglet "General"**:
   - Name: `chu_user`

3. **Onglet "Definition"**:
   - Password: `chu_password`

4. **Onglet "Privileges"**:
   - ✅ Can login?
   - ✅ Create databases?
   - ✅ Create roles?

5. **Cliquer "Save"**

#### Étape 4: Donner les Privilèges à "chu_user"

1. **Clic droit sur "chu_management"**:
   - "Properties"

2. **Onglet "Security"**:
   - Cliquer "+" pour ajouter
   - Grantee: `chu_user`
   - Privileges:
     - ✅ CONNECT
     - ✅ CREATE
     - ✅ TEMPORARY

3. **Cliquer "Save"**

#### Étape 5: Exécuter les Scripts SQL

1. **Sélectionner la base "chu_management"**:
   - Clic sur "chu_management" dans le Browser

2. **Ouvrir Query Tool**:
   - Clic sur l'icône "Query Tool" (⚡)
   - Ou: Tools → Query Tool
   - Raccourci: `Alt + Shift + Q`

3. **Ouvrir le fichier SQL**:
   - Cliquer sur l'icône "Open File" (📁)
   - Naviguer vers votre projet: `database/create-tables.sql`
   - Le contenu s'affiche dans l'éditeur

4. **Exécuter le script**:
   - Cliquer sur "Execute/Refresh" (▶)
   - Raccourci: `F5`
   
5. **Vérifier dans les Messages**:
   ```
   CREATE TABLE
   CREATE TABLE
   CREATE TABLE
   ...
   CREATE INDEX
   CREATE FUNCTION
   CREATE TRIGGER
   
   Query returned successfully in XXX msec.
   ```

6. **Répéter pour les données de test**:
   - Ouvrir `database/sample-data.sql`
   - Exécuter (F5)
   - Vérifier les messages:
     ```
     INSERT 0 1
     INSERT 0 1
     ...
     Query returned successfully
     ```

#### Étape 6: Vérifier les Tables Créées

1. **Actualiser la base**:
   - Clic droit sur "chu_management" → "Refresh"

2. **Développer l'arborescence**:
   ```
   chu_management
   └─ Schemas
      └─ public
         └─ Tables
            ├─ appointments
            ├─ doctor_schedules
            ├─ doctors
            ├─ invoices
            ├─ medical_records
            ├─ medical_services
            ├─ notifications
            ├─ patients
            ├─ prescriptions
            └─ users
   ```

3. **Voir les données**:
   - Clic droit sur une table (ex: "users")
   - "View/Edit Data" → "All Rows"
   - Les données s'affichent

### Méthode 2: Via Ligne de Commande (Avancé)

#### Windows (PowerShell):

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE chu_management;

# Créer l'utilisateur
CREATE USER chu_user WITH PASSWORD 'chu_password';

# Donner les privilèges
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;

# Quitter
\q

# Exécuter les scripts SQL
cd chemin\vers\votre\projet
psql -U chu_user -d chu_management -f database/create-tables.sql
psql -U chu_user -d chu_management -f database/sample-data.sql

# Vérifier les tables
psql -U chu_user -d chu_management
\dt
```

#### Mac/Linux:

```bash
# Se connecter
sudo -u postgres psql

# Créer la base
CREATE DATABASE chu_management;
CREATE USER chu_user WITH PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\q

# Exécuter les scripts
cd /chemin/vers/votre/projet
psql -U chu_user -d chu_management -f database/create-tables.sql
psql -U chu_user -d chu_management -f database/sample-data.sql

# Vérifier
psql -U chu_user -d chu_management
\dt
```

---

## 💼 IMPORT DANS INTELLIJ IDEA

### Prérequis
- IntelliJ IDEA installé (Community ou Ultimate)
- Télécharger: https://www.jetbrains.com/idea/download/

### Étape 1: Ouvrir le Projet

1. **Lancer IntelliJ IDEA**

2. **Écran d'accueil**:
   - Cliquer "Open"
   - Ou: File → Open

3. **Naviguer vers votre projet**:
   - Sélectionner le dossier `backend/`
   - Cliquer "OK"

4. **Trust Project**:
   - Cliquer "Trust Project"

5. **Import Maven**:
   - IntelliJ détecte automatiquement `pom.xml`
   - Cliquer "Import Changes" ou "Enable Auto-Import"
   - Attendre le téléchargement des dépendances (2-5 min)

### Étape 2: Configurer le JDK

1. **File → Project Structure** (Ctrl+Alt+Shift+S)

2. **Project Settings → Project**:
   - SDK: Sélectionner JDK 17
   - Si absent: "Add SDK" → "Download JDK" → Version 17 → Télécharger

3. **Language level**: 17
   - Cliquer "OK"

### Étape 3: Configurer PostgreSQL dans IntelliJ

1. **Ouvrir Database Tool Window**:
   - View → Tool Windows → Database
   - Ou: Clic sur "Database" (barre latérale droite)

2. **Ajouter une Data Source**:
   - Cliquer "+" → "Data Source" → "PostgreSQL"

3. **Configurer la connexion**:
   ```
   Name:     CHU Management DB
   Host:     localhost
   Port:     5432
   Database: chu_management
   User:     chu_user
   Password: chu_password
   ```

4. **Télécharger le driver**:
   - Cliquer "Download missing driver files"

5. **Tester la connexion**:
   - Cliquer "Test Connection"
   - Devrait afficher: ✅ "Succeeded"

6. **Cliquer "OK"**

7. **Voir les tables**:
   ```
   chu_management@localhost
   └─ public
      └─ tables
         ├─ appointments
         ├─ doctors
         ├─ patients
         └─ ...
   ```

### Étape 4: Configurer application.yml

1. **Ouvrir**: `src/main/resources/application.yml`

2. **Vérifier/Modifier**:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/chu_management
       username: chu_user
       password: chu_password
   ```

### Étape 5: Lancer l'Application

1. **Méthode 1: Via la classe principale**
   - Ouvrir: `ChuManagementApplication.java`
   - Clic droit → "Run 'ChuManagementApplication'"
   - Ou: Clic sur le triangle vert (▶) à côté de `public static void main`

2. **Méthode 2: Via Maven**
   - Ouvrir "Maven" (barre latérale droite)
   - Développer: "CHU Management" → "Lifecycle"
   - Double-cliquer: "spring-boot:run"

3. **Console devrait afficher**:
   ```
   Starting ChuManagementApplication...
   ...
   Tomcat started on port(s): 8080 (http)
   Started ChuManagementApplication in X.XXX seconds
   ```

4. **Tester dans le navigateur**:
   - Aller sur: http://localhost:8080
   - Ou: http://localhost:8080/api/test

### Étape 6: Configuration du Frontend React

1. **Ouvrir le Terminal IntelliJ**:
   - View → Tool Windows → Terminal
   - Ou: Alt + F12

2. **Naviguer vers la racine du projet** (pas backend):
   ```bash
   cd ..
   ```

3. **Installer les dépendances**:
   ```bash
   npm install
   ```

4. **Configurer l'API**:
   - Ouvrir: `services/apiService.ts`
   - Modifier la ligne 2:
     ```typescript
     const API_BASE_URL = 'http://localhost:8080/api';
     ```

5. **Lancer le frontend**:
   ```bash
   npm run dev
   ```

6. **Ouvrir dans le navigateur**:
   - http://localhost:5173

---

## 🆚 IMPORT DANS VS CODE

### Prérequis
- VS Code installé
- Extension "Java Extension Pack" installée

### Étape 1: Installer les Extensions

1. **Ouvrir VS Code**

2. **Extensions** (Ctrl+Shift+X):
   - Rechercher et installer:
     - ✅ **Java Extension Pack** (Microsoft)
     - ✅ **Spring Boot Extension Pack** (VMware)
     - ✅ **Maven for Java** (Microsoft)
     - ✅ **Database Client** (cweijan)

### Étape 2: Ouvrir le Projet

1. **File → Open Folder**

2. **Sélectionner le dossier racine du projet** (contenant `backend/`)

3. **Trust Authors**:
   - Cliquer "Yes, I trust the authors"

### Étape 3: Configurer Java

1. **Ctrl+Shift+P** → "Java: Configure Java Runtime"

2. **Vérifier**:
   - Java: JDK 17+
   - Maven: Détecté automatiquement

### Étape 4: Importer le Projet Maven

1. **Le projet Spring Boot est détecté automatiquement**

2. **Dans l'explorateur**, vous verrez:
   ```
   JAVA PROJECTS
   └─ chu-management
      └─ src/main/java
   ```

3. **Maven télécharge les dépendances**:
   - Barre de progression en bas
   - Attendre 2-5 minutes

### Étape 5: Configurer PostgreSQL

1. **Cliquer sur l'icône "Database"** (barre latérale gauche)

2. **Cliquer "+"** → "PostgreSQL"

3. **Remplir**:
   ```
   Host:     localhost
   Port:     5432
   Database: chu_management
   Username: chu_user
   Password: chu_password
   ```

4. **Cliquer "Connect"**

5. **Voir les tables**:
   ```
   localhost
   └─ chu_management
      └─ public
         ├─ appointments
         ├─ doctors
         └─ ...
   ```

### Étape 6: Configurer application.yml

1. **Ouvrir**: `backend/src/main/resources/application.yml`

2. **Vérifier**:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/chu_management
       username: chu_user
       password: chu_password
   ```

### Étape 7: Lancer le Backend

1. **Ouvrir**: `backend/src/main/java/com/chu/management/ChuManagementApplication.java`

2. **Méthode 1: Via le bouton**
   - Cliquer "Run" au-dessus de `public static void main`

3. **Méthode 2: Via le terminal**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. **Console affiche**:
   ```
   Started ChuManagementApplication in X.XXX seconds
   ```

### Étape 8: Lancer le Frontend

1. **Ouvrir un nouveau terminal**: Ctrl+Shift+`

2. **Installer les dépendances**:
   ```bash
   npm install
   ```

3. **Configurer l'API**:
   - Ouvrir: `services/apiService.ts`
   - Ligne 2: `const API_BASE_URL = 'http://localhost:8080/api';`

4. **Lancer**:
   ```bash
   npm run dev
   ```

5. **Ouvrir**: http://localhost:5173

---

## ☕ IMPORT DANS ECLIPSE

### Prérequis
- Eclipse IDE for Java EE Developers
- Télécharger: https://www.eclipse.org/downloads/

### Étape 1: Importer le Projet Maven

1. **Lancer Eclipse**

2. **File → Import**

3. **Maven → Existing Maven Projects**
   - Cliquer "Next"

4. **Root Directory**:
   - Cliquer "Browse"
   - Sélectionner le dossier `backend/`
   - Cliquer "Select Folder"

5. **Projects**:
   - ✅ `/pom.xml` devrait être coché

6. **Cliquer "Finish"**

7. **Maven télécharge les dépendances**:
   - Barre de progression en bas à droite
   - Attendre 2-5 minutes

### Étape 2: Configurer le JDK

1. **Clic droit sur le projet** → "Properties"

2. **Java Build Path**:
   - Onglet "Libraries"
   - Vérifier: JRE System Library [JavaSE-17]
   - Si incorrect: "Edit" → Sélectionner JDK 17

3. **Project Facets**:
   - Java: 17
   - Cliquer "Apply and Close"

### Étape 3: Configurer PostgreSQL

1. **Window → Show View → Other**

2. **Data Management → Data Source Explorer**

3. **Clic droit sur "Database Connections"**:
   - "New..."

4. **PostgreSQL**:
   - Next

5. **Connection Details**:
   ```
   Database:      chu_management
   URL:           jdbc:postgresql://localhost:5432/chu_management
   User name:     chu_user
   Password:      chu_password
   ```

6. **Drivers**:
   - Télécharger le driver PostgreSQL si demandé

7. **Test Connection** → Devrait réussir

8. **Finish**

### Étape 4: Configurer application.yml

1. **Ouvrir**: `src/main/resources/application.yml`

2. **Vérifier**:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/chu_management
       username: chu_user
       password: chu_password
   ```

### Étape 5: Lancer l'Application

1. **Clic droit sur le projet**:
   - "Run As" → "Spring Boot App"

2. **Ou via la classe principale**:
   - Ouvrir `ChuManagementApplication.java`
   - Clic droit → "Run As" → "Java Application"

3. **Console affiche**:
   ```
   Started ChuManagementApplication
   ```

4. **Tester**: http://localhost:8080

---

## 🔵 IMPORT DANS NETBEANS

### Prérequis
- NetBeans IDE 17+ avec support Java
- Télécharger: https://netbeans.apache.org/download/

### Étape 1: Ouvrir le Projet

1. **Lancer NetBeans**

2. **File → Open Project**

3. **Naviguer vers le dossier `backend/`**

4. **Le projet Maven est reconnu** (icône Maven)

5. **Cliquer "Open Project"**

6. **Maven télécharge les dépendances**:
   - Progression dans la barre de statut
   - Attendre quelques minutes

### Étape 2: Configurer le JDK

1. **Clic droit sur le projet** → "Properties"

2. **Build → Compile**:
   - Java Platform: JDK 17
   - Si absent: "Manage Java Platforms" → Ajouter

3. **Sources**:
   - Source/Binary Format: 17

4. **Cliquer "OK"**

### Étape 3: Configurer PostgreSQL

1. **Window → Services** (ou Ctrl+5)

2. **Clic droit sur "Databases"**:
   - "New Connection..."

3. **Driver**:
   - PostgreSQL
   - Next

4. **Connection**:
   ```
   Host:         localhost
   Port:         5432
   Database:     chu_management
   User:         chu_user
   Password:     chu_password
   Remember password: ✅
   ```

5. **Test Connection** → Devrait réussir

6. **Finish**

7. **Voir les tables**:
   ```
   Databases
   └─ jdbc:postgresql://localhost:5432/chu_management
      └─ Tables
         ├─ appointments
         ├─ doctors
         └─ ...
   ```

### Étape 4: Configurer application.yml

1. **Ouvrir**: `src/main/resources/application.yml`

2. **Vérifier**:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/chu_management
       username: chu_user
       password: chu_password
   ```

### Étape 5: Lancer l'Application

1. **Clic droit sur le projet**:
   - "Run"

2. **Ou via le bouton**:
   - Cliquer sur "Run Project" (▶) dans la toolbar

3. **Output affiche**:
   ```
   Started ChuManagementApplication
   ```

4. **Tester**: http://localhost:8080

---

## ⚛️ CONFIGURATION DU FRONTEND REACT

### Pour Tous les IDEs

1. **Ouvrir un terminal dans la racine du projet** (pas `backend/`)

2. **Installer les dépendances**:
   ```bash
   npm install
   ```

3. **Configurer l'URL de l'API**:
   - Ouvrir: `services/apiService.ts`
   - Modifier la ligne 2:
     ```typescript
     const API_BASE_URL = 'http://localhost:8080/api';
     ```

4. **Créer un fichier `.env.local`** (optionnel):
   ```bash
   # À la racine du projet
   echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env.local
   ```

5. **Lancer le serveur de développement**:
   ```bash
   npm run dev
   ```

6. **Le frontend démarre sur**: http://localhost:5173

7. **Vérifier dans le navigateur**:
   - La page d'accueil s'affiche
   - Les données viennent maintenant de votre PostgreSQL local!

---

## 🚀 LANCEMENT COMPLET DU PROJET

### Ordre de Démarrage

#### 1. PostgreSQL (doit être démarré en premier)

**Windows**:
```bash
# Vérifier si PostgreSQL est démarré
services.msc
# Chercher "postgresql-x64-16"
# Statut devrait être "Running"
```

**Mac**:
```bash
brew services start postgresql@16
```

**Linux**:
```bash
sudo systemctl start postgresql
```

#### 2. Backend Spring Boot

**Terminal 1** (dans le dossier `backend/`):
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Attendre le message**:
```
Started ChuManagementApplication in X.XXX seconds
```

**Tester**: http://localhost:8080

#### 3. Frontend React

**Terminal 2** (racine du projet):
```bash
npm install
npm run dev
```

**Attendre**:
```
VITE ready in XXX ms

➜  Local:   http://localhost:5173/
```

**Ouvrir**: http://localhost:5173

### Script de Lancement Automatique

#### Windows: `start-local.bat`

Créer ce fichier à la racine du projet:

```batch
@echo off
echo ========================================
echo  CHU Management Center - Demarrage
echo ========================================

echo.
echo [1/3] Verification PostgreSQL...
sc query "postgresql-x64-16" | find "RUNNING"
if errorlevel 1 (
    echo PostgreSQL n'est pas demarre!
    echo Demarrage de PostgreSQL...
    net start postgresql-x64-16
)

echo.
echo [2/3] Demarrage Backend Spring Boot...
start "Backend" cmd /k "cd backend && mvn spring-boot:run"

echo Attente du demarrage du backend (30 secondes)...
timeout /t 30

echo.
echo [3/3] Demarrage Frontend React...
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo  Projet lance avec succes!
echo  Backend:  http://localhost:8080
echo  Frontend: http://localhost:5173
echo ========================================
pause
```

**Lancer**:
```bash
start-local.bat
```

#### Mac/Linux: `start-local.sh`

```bash
#!/bin/bash

echo "========================================"
echo " CHU Management Center - Démarrage"
echo "========================================"

echo ""
echo "[1/3] Vérification PostgreSQL..."
if ! pgrep -x postgres > /dev/null; then
    echo "Démarrage de PostgreSQL..."
    brew services start postgresql@16  # Mac
    # sudo systemctl start postgresql  # Linux
fi

echo ""
echo "[2/3] Démarrage Backend Spring Boot..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

echo "Attente du démarrage du backend (30 secondes)..."
sleep 30

echo ""
echo "[3/3] Démarrage Frontend React..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo " Projet lancé avec succès!"
echo " Backend:  http://localhost:8080"
echo " Frontend: http://localhost:5173"
echo "========================================"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter"

# Attendre
wait $BACKEND_PID $FRONTEND_PID
```

**Rendre exécutable et lancer**:
```bash
chmod +x start-local.sh
./start-local.sh
```

---

## ✅ VÉRIFICATION ET TESTS

### 1. Vérifier PostgreSQL

**Via pgAdmin**:
- Ouvrir pgAdmin
- Se connecter au serveur
- Développer: chu_management → Schemas → public → Tables
- Voir les 10 tables créées

**Via psql**:
```bash
psql -U chu_user -d chu_management
\dt
# Devrait lister toutes les tables
```

### 2. Vérifier le Backend

**Test 1: Endpoint de santé**
```bash
curl http://localhost:8080
```

**Test 2: API**
```bash
curl http://localhost:8080/api/doctors
```

**Test 3: Dans le navigateur**
- Aller sur: http://localhost:8080/actuator/health
- Devrait afficher: `{"status":"UP"}`

### 3. Vérifier le Frontend

**Test 1: Page d'accueil**
- Ouvrir: http://localhost:5173
- La page s'affiche

**Test 2: Console du navigateur (F12)**
```javascript
fetch('http://localhost:8080/api/doctors')
  .then(r => r.json())
  .then(console.log);
```

### 4. Test Complet End-to-End

1. **Backend répond**: ✅
2. **Frontend se connecte au backend**: ✅
3. **Backend se connecte à PostgreSQL**: ✅
4. **Données affichées dans le frontend**: ✅

---

## 🔧 DÉPANNAGE

### Problème: "Port 8080 already in use"

**Solution**:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8080
kill -9 <PID>
```

### Problème: "Could not connect to PostgreSQL"

**Vérifier que PostgreSQL est démarré**:
```bash
# Windows
services.msc
# Chercher "postgresql-x64-16"

# Mac
brew services list

# Linux
sudo systemctl status postgresql
```

**Vérifier les credentials**:
- Username: `chu_user`
- Password: `chu_password`
- Database: `chu_management`

### Problème: "No suitable driver found"

**Solution**:
- Le driver PostgreSQL est inclus dans `pom.xml`
- Faire: `mvn clean install`

### Problème: "npm ERR!"

**Solution**:
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème: Tables non créées

**Solution**:
```bash
# Réexécuter les scripts SQL
cd database
psql -U chu_user -d chu_management -f create-tables.sql
psql -U chu_user -d chu_management -f sample-data.sql
```

---

## 📊 RÉSUMÉ DE L'INSTALLATION

### Checklist Complète

- [ ] ✅ JDK 17+ installé et configuré
- [ ] ✅ Maven installé
- [ ] ✅ Node.js et npm installés
- [ ] ✅ PostgreSQL installé et démarré
- [ ] ✅ pgAdmin 4 installé et configuré
- [ ] ✅ Base de données `chu_management` créée
- [ ] ✅ Utilisateur `chu_user` créé
- [ ] ✅ Tables créées (script SQL exécuté)
- [ ] ✅ Données de test insérées
- [ ] ✅ Projet importé dans l'IDE
- [ ] ✅ `application.yml` configuré
- [ ] ✅ Backend Spring Boot lancé (port 8080)
- [ ] ✅ Frontend React lancé (port 5173)
- [ ] ✅ Test end-to-end réussi

### Ports Utilisés

```
PostgreSQL:    5432
Backend:       8080
Frontend:      5173
```

### Credentials

```
PostgreSQL Admin:
- Username: postgres
- Password: admin123 (votre mot de passe)

Application User:
- Username: chu_user
- Password: chu_password

Database: chu_management
```

---

## 🎉 FÉLICITATIONS!

Votre projet CHU Management Center est maintenant:

✅ **Installé en local** sur votre machine

✅ **Connecté à PostgreSQL** local

✅ **Exécutable dans votre IDE** préféré

✅ **Prêt pour le développement**

Vous pouvez maintenant développer de nouvelles fonctionnalités, modifier le code, et voir les changements en temps réel!

**🏥 Bon développement!**
