@echo off
echo 🏥 Demarrage du projet CHU Management Center...

REM Verification des prerequis
echo 📋 Verification des prerequis...

where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL n'est pas installe. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

where java >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installe. Veuillez installer Java 17+.
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installe. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

echo ✅ Tous les prerequis sont installes.

REM Configuration de la base de donnees
echo 🗄️ Configuration de la base de donnees...
psql -U postgres -f database\init.sql
psql -U chu_user -d chu_management -f database\create-tables.sql
psql -U chu_user -d chu_management -f database\sample-data.sql

REM Installation des dependances frontend
echo 📦 Installation des dependances frontend...
call npm install

REM Demarrage du backend
echo 🚀 Demarrage du backend Spring Boot...
cd backend
start "CHU Backend" cmd /k "mvnw.cmd spring-boot:run"
cd ..

REM Attendre un peu pour que le backend demarre
timeout /t 10 /nobreak >nul

REM Demarrage du frontend
echo 🎨 Demarrage du frontend React...
start "CHU Frontend" cmd /k "npm run dev"

echo.
echo 🎉 Projet demarre avec succes !
echo.
echo 📌 URLs d'acces :
echo    Frontend: http://localhost:5173
echo    Backend API: http://localhost:8080/api
echo    Base de donnees: postgresql://localhost:5432/chu_management
echo.
echo 👤 Comptes de test :
echo    Admin: admin@chu-management.fr / password123
echo    Docteur: marie.dubois@chu-management.fr / password123
echo    Patient: jean.dupont@email.com / password123
echo.
echo ⚠️ Fermez les fenetres CMD pour arreter les services
pause