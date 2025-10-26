# 🏥 GUIDE COMPLET - CHU Management Center

## 📋 PRÉREQUIS À INSTALLER

### 1. Node.js (version 18+)
```bash
# Télécharger : https://nodejs.org/
# Vérifier :
node --version
npm --version
```

### 2. Java JDK 17+
```bash
# Télécharger : https://adoptium.net/
# Vérifier :
java --version
javac --version
```

### 3. PostgreSQL
```bash
# Windows : https://www.postgresql.org/download/windows/
# macOS : brew install postgresql
# Ubuntu : sudo apt install postgresql postgresql-contrib
# Vérifier :
psql --version
```

### 4. Git
```bash
# Télécharger : https://git-scm.com/
git --version
```

## 🎯 IDEs RECOMMANDÉS

### Option 1 : VS Code (UN SEUL IDE)
1. Télécharger : https://code.visualstudio.com/
2. Installer ces extensions :
   - Extension Pack for Java
   - Spring Boot Extension Pack
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Tailwind CSS IntelliSense
   - PostgreSQL

### Option 2 : IntelliJ IDEA Ultimate
1. Télécharger : https://www.jetbrains.com/idea/
2. Support complet Java + React + Database

## 📁 STRUCTURE DU PROJET

```
chu-management/ (DOSSIER RACINE)
├── 🎨 FRONT-END (React + TypeScript)
│   ├── App.tsx (Point d'entrée)
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── ⚙️ BACK-END (Spring Boot + Java)
│   └── backend/
│       ├── src/main/java/
│       ├── pom.xml
│       └── application.yml
│
└── 🗄️ DATABASE (PostgreSQL)
    └── database/
        ├── init.sql
        ├── create-tables.sql
        └── sample-data.sql
```