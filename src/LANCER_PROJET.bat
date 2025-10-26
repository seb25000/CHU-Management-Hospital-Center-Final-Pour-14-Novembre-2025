@echo off
chcp 65001 >nul
cls

echo.
echo ███████████████████████████████████████████████████████████████
echo █                                                             █
echo █         🏥 CHU MANAGEMENT CENTER - LANCEMENT COMPLET        █
echo █                                                             █
echo ███████████████████████████████████████████████████████████████
echo.

REM ==============================================
REM 1. VERIFICATION DES PREREQUIS
REM ==============================================
echo 📋 ÉTAPE 1 : Vérification des prérequis...
echo ================================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js manquant
    echo 🔗 Installer : https://nodejs.org/
    pause & exit /b 1
)
echo ✅ Node.js détecté

where java >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java manquant
    echo 🔗 Installer : https://adoptium.net/
    pause & exit /b 1
)
echo ✅ Java détecté

where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL manquant
    echo 🔗 Installer : https://www.postgresql.org/download/windows/
    pause & exit /b 1
)
echo ✅ PostgreSQL détecté

echo.
echo 🎉 Tous les prérequis sont installés !
timeout /t 2 /nobreak >nul

REM ==============================================
REM 2. CONFIGURATION DE LA BASE DE DONNÉES
REM ==============================================
echo.
echo 🗄️ ÉTAPE 2 : Configuration de la base de données...
echo ================================================

echo 📦 Création de la base de données...
psql -U postgres -c "DROP DATABASE IF EXISTS chu_management;"
psql -U postgres -c "CREATE DATABASE chu_management;"
psql -U postgres -c "DROP USER IF EXISTS chu_user;"
psql -U postgres -c "CREATE USER chu_user WITH PASSWORD 'chu_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;"

echo 🏗️ Création des tables...
psql -U chu_user -d chu_management -f database\create-tables.sql

echo 📊 Insertion des données de test...
psql -U chu_user -d chu_management -f database\sample-data.sql

echo ✅ Base de données configurée !
timeout /t 2 /nobreak >nul

REM ==============================================
REM 3. INSTALLATION DES DÉPENDANCES
REM ==============================================
echo.
echo 📦 ÉTAPE 3 : Installation des dépendances...
echo ================================================

echo 🎨 Installation dépendances Frontend (React)...
call npm install

echo ⚙️ Installation dépendances Backend (Spring Boot)...
cd backend
call mvnw.cmd clean install -DskipTests
cd ..

echo ✅ Toutes les dépendances installées !
timeout /t 2 /nobreak >nul

REM ==============================================
REM 4. LANCEMENT DES SERVICES
REM ==============================================
echo.
echo 🚀 ÉTAPE 4 : Lancement des services...
echo ================================================

echo ⚙️ Démarrage du Backend Spring Boot...
cd backend
start "CHU Backend Server" cmd /c "echo 🚀 BACKEND SPRING BOOT EN COURS... && mvnw.cmd spring-boot:run"
cd ..

echo ⏳ Attente du démarrage du backend (45 secondes)...
timeout /t 45 /nobreak >nul

echo 🎨 Démarrage du Frontend React...
start "CHU Frontend Server" cmd /c "echo 🎨 FRONTEND REACT EN COURS... && npm run dev"

timeout /t 5 /nobreak >nul

REM ==============================================
REM 5. INFORMATION FINALE
REM ==============================================
echo.
echo ███████████████████████████████████████████████████████████████
echo █                                                             █
echo █                    🎉 PROJET LANCÉ !                       █
echo █                                                             █
echo ███████████████████████████████████████████████████████████████
echo.
echo 📌 URLS D'ACCÈS :
echo    🌐 Site Web       : http://localhost:5173
echo    ⚙️ API Backend    : http://localhost:8080/api
echo    🗄️ Base de données: postgresql://localhost:5432/chu_management
echo.
echo 👤 COMPTES DE TEST :
echo    👑 Admin    : admin@chu-management.fr / password123
echo    👨‍⚕️ Docteur  : marie.dubois@chu-management.fr / password123
echo    🧑‍🦱 Patient  : jean.dupont@email.com / password123
echo.
echo 🌐 Le site va s'ouvrir automatiquement dans votre navigateur...
timeout /t 3 /nobreak >nul

REM Ouvrir le navigateur automatiquement
start http://localhost:5173

echo.
echo ⚠️ POUR ARRÊTER : Fermez les 2 fenêtres CMD ouvertes
echo 📞 SUPPORT : Consultez INSTALLATION_COMPLETE.md
echo.
pause