# 🐘 Guide Rapide pgAdmin 4 - CHU Management

## Guide Visuel Étape par Étape pour Créer la Base de Données

---

## 📋 RÉSUMÉ EN 5 ÉTAPES

```
1. Installer PostgreSQL + pgAdmin ✅
2. Lancer pgAdmin 4 ✅
3. Créer le serveur "CHU Local" ✅
4. Créer la base "chu_management" ✅
5. Exécuter les scripts SQL ✅
```

---

## 🚀 ÉTAPE 1: LANCER PGADMIN 4

### Windows

1. **Menu Démarrer** → Rechercher "**pgAdmin 4**"
2. **Double-cliquer** sur l'application
3. **Premier lancement**: Définir un mot de passe principal
   - Exemple: `pgadmin123`
   - ✅ Cocher "Save password"
   - Cliquer "OK"

### Interface pgAdmin au Démarrage

```
┌────────────────────────────────────────────────────────────┐
│ pgAdmin 4                                          [_][□][X]│
├────────────────────────────────────────────────────────────┤
│ File  Object  Tools  Help                                  │
├──────────────┬─────────────────────────────────────────────┤
│              │                                              │
│  Browser     │         Dashboard                            │
│              │                                              │
│  🔌 Servers  │   Welcome to pgAdmin 4                       │
│              │                                              │
│              │   Please connect to a server to get started  │
│              │                                              │
│              │   [+] Quick Links                            │
│              │       • Add New Server                       │
│              │       • Documentation                        │
│              │                                              │
└──────────────┴─────────────────────────────────────────────┘
```

---

## 🔧 ÉTAPE 2: CRÉER LE SERVEUR

### Action: Enregistrer un Nouveau Serveur

1. **Dans le panneau "Browser" (gauche)**:
   - Clic droit sur **"Servers"**
   - **"Register"** → **"Server..."**

```
Browser
│
└─ 🔌 Servers  ← CLIC DROIT ICI
   │
   ├─ [Register]
   │  └─ Server...  ← CLIQUER ICI
   │
```

### Fenêtre "Register - Server"

```
┌─────────────────────────────────────────────────────┐
│ Register - Server                          [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Connection] [SSL] [Advanced] [Parameters]│
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ Name: [CHU Local Server________________]     │   │
│ │                                               │   │
│ │ Server group: [Servers ▼]                    │   │
│ │                                               │   │
│ │ Comment: [________________________________]   │   │
│ │          [________________________________]   │   │
│ │                                               │   │
│ │ ☑ Connect now?                               │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│                            [Help] [Save] [Cancel]    │
└─────────────────────────────────────────────────────┘
```

**Remplir**:
- **Name**: `CHU Local Server`
- **✅ Connect now?**: Coché

### Cliquer sur l'Onglet "Connection"

```
┌─────────────────────────────────────────────────────┐
│ Register - Server                          [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Connection] [SSL] [Advanced] [Parameters]│
│           ▲▲▲▲▲▲▲▲▲▲                                │
│           CLIQUER ICI                                │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ Host name/address: [localhost___________]    │   │
│ │                                               │   │
│ │ Port: [5432____]                             │   │
│ │                                               │   │
│ │ Maintenance database: [postgres_________]    │   │
│ │                                               │   │
│ │ Username: [postgres_____________________]    │   │
│ │                                               │   │
│ │ Password: [••••••••••__________________]     │   │
│ │                                               │   │
│ │ ☑ Save password?                             │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│                            [Help] [Save] [Cancel]    │
└─────────────────────────────────────────────────────┘
```

**Remplir**:
- **Host**: `localhost`
- **Port**: `5432`
- **Maintenance database**: `postgres`
- **Username**: `postgres`
- **Password**: `admin123` ← *Votre mot de passe PostgreSQL*
- **✅ Save password**: Coché

### Cliquer "Save"

Le serveur apparaît maintenant:

```
Browser
│
└─ 🔌 Servers
   │
   └─ CHU Local Server
      ├─ 📁 Databases (2)
      │  ├─ postgres
      │  └─ template1
      │
      ├─ 👥 Login/Group Roles (1)
      │  └─ postgres
      │
      └─ 📊 Tablespaces (1)
         └─ pg_default
```

---

## 🗄️ ÉTAPE 3: CRÉER LA BASE DE DONNÉES

### Action: Créer "chu_management"

1. **Développer "CHU Local Server"** (cliquer sur ▶)
2. **Clic droit sur "Databases"**
3. **"Create"** → **"Database..."**

```
CHU Local Server
│
└─ 📁 Databases (2)  ← CLIC DROIT ICI
   │                  
   ├─ [Create]
   │  └─ Database...  ← CLIQUER ICI
   │
   ├─ postgres
   └─ template1
```

### Fenêtre "Create - Database"

```
┌─────────────────────────────────────────────────────┐
│ Create - Database                          [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Definition] [Security] [Parameters] [SQL]│
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ Database: [chu_management_______________]    │   │
│ │                                               │   │
│ │ Owner: [postgres ▼]                          │   │
│ │                                               │   │
│ │ Comment: [________________________________]   │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│                            [Help] [Save] [Cancel]    │
└─────────────────────────────────────────────────────┘
```

**Remplir**:
- **Database**: `chu_management`
- **Owner**: `postgres`

### Cliquer "Save"

La base de données est créée:

```
CHU Local Server
│
└─ 📁 Databases (3)
   │
   ├─ chu_management  ← NOUVELLE BASE CRÉÉE ✅
   ├─ postgres
   └─ template1
```

---

## 👤 ÉTAPE 4: CRÉER L'UTILISATEUR "chu_user"

### Action: Créer le Rôle

1. **Clic droit sur "Login/Group Roles"**
2. **"Create"** → **"Login/Group Role..."**

```
CHU Local Server
│
├─ 📁 Databases (3)
│
└─ 👥 Login/Group Roles (1)  ← CLIC DROIT ICI
   │                         
   ├─ [Create]
   │  └─ Login/Group Role...  ← CLIQUER ICI
   │
   └─ postgres
```

### Onglet "General"

```
┌─────────────────────────────────────────────────────┐
│ Create - Login/Group Role                  [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Definition] [Privileges] [Membership]    │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ Name: [chu_user_________________________]    │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Remplir**:
- **Name**: `chu_user`

### Onglet "Definition"

```
┌─────────────────────────────────────────────────────┐
│ Create - Login/Group Role                  [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Definition] [Privileges] [Membership]    │
│           ▲▲▲▲▲▲▲▲▲▲                               │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ Password: [chu_password_________________]    │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Remplir**:
- **Password**: `chu_password`

### Onglet "Privileges"

```
┌─────────────────────────────────────────────────────┐
│ Create - Login/Group Role                  [_][□][X]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ [General] [Definition] [Privileges] [Membership]    │
│                        ▲▲▲▲▲▲▲▲▲▲                  │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ ☑ Can login?                                 │   │
│ │ ☑ Superuser?                                 │   │
│ │ ☑ Create roles?                              │   │
│ │ ☑ Create databases?                          │   │
│ │                                               │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│                            [Help] [Save] [Cancel]    │
└─────────────────────────────────────────────────────┘
```

**Cocher**:
- ✅ **Can login?**
- ✅ **Create databases?**
- ✅ **Create roles?**

### Cliquer "Save"

L'utilisateur est créé:

```
CHU Local Server
│
├─ 📁 Databases (3)
│
└─ 👥 Login/Group Roles (2)
   ├─ chu_user  ← NOUVEL UTILISATEUR CRÉÉ ✅
   └─ postgres
```

---

## 📝 ÉTAPE 5: EXÉCUTER LES SCRIPTS SQL

### Action: Créer les Tables

1. **Cliquer sur la base "chu_management"** pour la sélectionner

```
CHU Local Server
│
└─ 📁 Databases (3)
   │
   ├─ chu_management  ← CLIQUER ICI POUR SÉLECTIONNER
   ├─ postgres
   └─ template1
```

2. **Ouvrir Query Tool**:
   - Cliquer sur l'icône **⚡ Query Tool** dans la barre d'outils
   - Ou: **Tools** → **Query Tool**
   - Raccourci: **Alt + Shift + Q**

### Interface Query Tool

```
┌────────────────────────────────────────────────────────────┐
│ Query - chu_management/postgres@CHU Local      [_][□][X]   │
├────────────────────────────────────────────────────────────┤
│ 📁 📂 💾 ▶ ⏹ ⏸ 📊 ⚙                          [Query Tool]│
│    └─ Bouton "Open File"                                   │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  1  -- Votre code SQL ici                                  │
│  2                                                          │
│  3                                                          │
│  4                                                          │
│  5                                                          │
│                                                             │
│                                                             │
│                                                             │
├────────────────────────────────────────────────────────────┤
│ Messages                                                    │
│                                                             │
│ Query returned successfully in XXX msec.                   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Étape 5.1: Ouvrir le Script create-tables.sql

1. **Cliquer sur l'icône "📁 Open File"**
2. **Naviguer vers votre projet**:
   - `C:\Users\VotreNom\Projets\chu-management\database\`
3. **Sélectionner**: `create-tables.sql`
4. **Cliquer "Ouvrir"**

Le contenu du fichier s'affiche:

```
┌────────────────────────────────────────────────────────────┐
│ Query - chu_management/postgres@CHU Local      [_][□][X]   │
├────────────────────────────────────────────────────────────┤
│ 📁 📂 💾 ▶ ⏹ ⏸ 📊 ⚙                                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  1  -- Script de création des tables pour CHU Management   │
│  2                                                          │
│  3  CREATE TABLE IF NOT EXISTS users (                     │
│  4      id BIGSERIAL PRIMARY KEY,                          │
│  5      uuid UUID DEFAULT uuid_generate_v4() UNIQUE...     │
│  6      email VARCHAR(255) UNIQUE NOT NULL,                │
│  ...                                                        │
│ 165  CREATE TRIGGER update_appointments_updated_at...      │
│                                                             │
├────────────────────────────────────────────────────────────┤
│ Messages                                                    │
└────────────────────────────────────────────────────────────┘
```

### Étape 5.2: Exécuter le Script

1. **Cliquer sur le bouton "▶ Execute/Refresh"**
   - Ou: Appuyer sur **F5**

2. **Attendre l'exécution** (1-2 secondes)

3. **Vérifier les messages**:

```
┌────────────────────────────────────────────────────────────┐
│ Messages                                                    │
├────────────────────────────────────────────────────────────┤
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE TABLE                                                │
│ CREATE INDEX                                                │
│ CREATE INDEX                                                │
│ CREATE INDEX                                                │
│ CREATE FUNCTION                                             │
│ CREATE TRIGGER                                              │
│ CREATE TRIGGER                                              │
│ CREATE TRIGGER                                              │
│ CREATE TRIGGER                                              │
│                                                             │
│ Query returned successfully in 234 msec.         ✅         │
└────────────────────────────────────────────────────────────┘
```

**✅ SUCCÈS!** Les tables sont créées

### Étape 5.3: Insérer les Données de Test

1. **Cliquer à nouveau sur "📁 Open File"**
2. **Sélectionner**: `sample-data.sql`
3. **Cliquer "Ouvrir"**
4. **Cliquer "▶ Execute"** (F5)

5. **Vérifier les messages**:

```
┌────────────────────────────────────────────────────────────┐
│ Messages                                                    │
├────────────────────────────────────────────────────────────┤
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ INSERT 0 1                                                  │
│ ...                                                         │
│                                                             │
│ Query returned successfully in 89 msec.          ✅         │
└────────────────────────────────────────────────────────────┘
```

**✅ SUCCÈS!** Les données sont insérées

---

## 🔍 ÉTAPE 6: VÉRIFIER LES TABLES CRÉÉES

### Actualiser la Base de Données

1. **Clic droit sur "chu_management"**
2. **"Refresh"**

### Développer l'Arborescence

```
CHU Local Server
│
└─ 📁 Databases (3)
   │
   └─ chu_management
      │
      └─ 📁 Schemas (1)
         │
         └─ public
            │
            └─ 📁 Tables (10)  ← 10 TABLES CRÉÉES ✅
               │
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

### Voir les Données d'une Table

1. **Clic droit sur une table** (ex: "users")
2. **"View/Edit Data"** → **"All Rows"**

Les données s'affichent dans une grille:

```
┌────────────────────────────────────────────────────────────┐
│ View Data - users                                          │
├────────────────────────────────────────────────────────────┤
│ id │ uuid      │ email          │ first_name │ last_name  │
├────┼───────────┼────────────────┼────────────┼────────────┤
│ 1  │ 123e4...  │ admin@chu.com  │ Admin      │ System     │
│ 2  │ 456f7...  │ doc1@chu.com   │ Marie      │ Dubois     │
│ 3  │ 789a0...  │ doc2@chu.com   │ Pierre     │ Martin     │
│ ...│ ...       │ ...            │ ...        │ ...        │
└────┴───────────┴────────────────┴────────────┴────────────┘
```

---

## ✅ VÉRIFICATION FINALE

### Checklist Complète

- [x] ✅ PostgreSQL installé et démarré
- [x] ✅ pgAdmin 4 installé et configuré
- [x] ✅ Serveur "CHU Local Server" créé
- [x] ✅ Base de données "chu_management" créée
- [x] ✅ Utilisateur "chu_user" créé avec privilèges
- [x] ✅ 10 tables créées (users, doctors, patients...)
- [x] ✅ Données de test insérées
- [x] ✅ Connexion testée avec succès

### Informations de Connexion

```
╔════════════════════════════════════════╗
║  CONFIGURATION POSTGRESQL              ║
╠════════════════════════════════════════╣
║  Host:     localhost                   ║
║  Port:     5432                        ║
║  Database: chu_management              ║
║  User:     chu_user                    ║
║  Password: chu_password                ║
╚════════════════════════════════════════╝
```

---

## 🎯 PROCHAINES ÉTAPES

Maintenant que la base de données est créée, vous pouvez:

### 1. Lancer le Backend Spring Boot

```bash
cd backend
mvn spring-boot:run
```

### 2. Tester la Connexion Backend-Database

```bash
# Le backend devrait afficher:
Started ChuManagementApplication in X.XXX seconds
```

### 3. Lancer le Frontend React

```bash
npm run dev
```

### 4. Utiliser le Script Automatique

**Windows**:
```bash
start-local.bat
```

**Mac/Linux**:
```bash
./start-local.sh
```

---

## 🎉 FÉLICITATIONS!

Votre base de données PostgreSQL est maintenant:

✅ **Installée** et configurée

✅ **Créée** avec toutes les tables

✅ **Remplie** avec des données de test

✅ **Prête** à être utilisée par votre application

✅ **Visible** dans pgAdmin pour gestion et requêtes

**🏥 Votre CHU Management Center peut maintenant fonctionner en local!**
