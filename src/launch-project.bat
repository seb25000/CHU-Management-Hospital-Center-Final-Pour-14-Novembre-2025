@echo off
chcp 65001 >nul
echo 🚀 Lancement du projet CHU Management Center
echo =============================================

REM Vérification des prérequis
echo 📋 Vérification des prérequis...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé
    echo 🔗 Télécharger : https://nodejs.org/
    pause
    exit /b 1
)

where java >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installé
    echo 🔗 Télécharger : https://adoptium.net/
    pause
    exit /b 1
)

where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL n'est pas installé
    echo 🔗 Télécharger : https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

echo ✅ Tous les prérequis sont installés

REM Configuration de la base de données
echo 🗄️ Configuration de la base de données...
psql -U postgres -c "DROP DATABASE IF EXISTS chu_management; CREATE DATABASE chu_management;"
psql -U postgres -c "DROP USER IF EXISTS chu_user; CREATE USER chu_user WITH PASSWORD 'chu_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;"
psql -U chu_user -d chu_management -f database\create-tables.sql
psql -U chu_user -d chu_management -f database\sample-data.sql

REM Installation des dépendances frontend
echo 📦 Installation des dépendances frontend...
call npm install

REM Démarrage du backend
echo ⚙️ Démarrage du backend Spring Boot...
cd backend
start "CHU Backend" cmd /c "mvnw.cmd clean install -DskipTests && mvnw.cmd spring-boot:run"
cd ..

REM Attendre le démarrage du backend
echo ⏳ Attente du démarrage du backend...
timeout /t 30 /nobreak >nul

REM Démarrage du frontend
echo 🎨 Démarrage du frontend React...
start "CHU Frontend" cmd /c "npm run dev"

echo.
echo 🎉 Projet lancé avec succès!
echo ================================
echo.
echo 📌 URLs d'accès :
echo    🌐 Frontend : http://localhost:5173
echo    🔧 Backend  : http://localhost:8080
echo    📊 API      : http://localhost:8080/api
echo    🗄️ Database : postgresql://localhost:5432/chu_management
echo.
echo 👤 Comptes de test :
echo    👑 Admin    : admin@chu-management.fr / password123
echo    👨‍⚕️ Docteur  : marie.dubois@chu-management.fr / password123
echo    🧑‍🦱 Patient  : jean.dupont@email.com / password123
echo.
echo ⚠️ Fermez les fenêtres CMD pour arrêter les services
pause