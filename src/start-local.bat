@echo off
REM ========================================
REM  CHU Management - Lancement Complet
REM  Backend Spring Boot + Frontend React
REM ========================================

title CHU Management Center - Lancement

echo.
echo ========================================
echo  CHU Management Center
echo  Demarrage du Projet Complet
echo ========================================
echo.

REM Verification PostgreSQL
echo [1/4] Verification de PostgreSQL...
sc query "postgresql-x64-16" | find "RUNNING" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL n'est pas demarre!
    echo Tentative de demarrage de PostgreSQL...
    net start postgresql-x64-16 >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ATTENTION: Impossible de demarrer PostgreSQL automatiquement
        echo Veuillez demarrer PostgreSQL manuellement via:
        echo - services.msc
        echo - Ou pgAdmin 4
        echo.
        pause
        exit /b 1
    )
    echo OK - PostgreSQL demarre
) else (
    echo OK - PostgreSQL est deja en cours d'execution
)
echo.

REM Verification de Maven
echo [2/4] Verification de Maven...
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Maven n'est pas installe ou pas dans le PATH
    echo.
    echo Veuillez installer Maven: https://maven.apache.org/download.cgi
    echo.
    pause
    exit /b 1
)
echo OK - Maven est installe
echo.

REM Verification de Node.js
echo [3/4] Verification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas installe ou pas dans le PATH
    echo.
    echo Veuillez installer Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo OK - Node.js est installe
echo.

REM Installation des dependances npm si necessaire
if not exist "node_modules\" (
    echo Installation des dependances npm...
    call npm install
    echo.
)

REM Lancement du Backend
echo [4/4] Demarrage du Backend Spring Boot...
echo.
start "CHU Backend - Spring Boot" cmd /k "cd backend && echo Compilation et lancement du backend... && mvn spring-boot:run"

REM Attendre que le backend demarre
echo Attente du demarrage du backend (30 secondes)...
timeout /t 30 /nobreak >nul

REM Lancement du Frontend
echo.
echo Demarrage du Frontend React...
echo.
start "CHU Frontend - React" cmd /k "echo Lancement du frontend... && npm run dev"

REM Attendre un peu
timeout /t 5 /nobreak >nul

REM Affichage final
echo.
echo ========================================
echo  PROJET LANCE AVEC SUCCES!
echo ========================================
echo.
echo Backend Spring Boot:  http://localhost:8080
echo Frontend React:       http://localhost:5173
echo.
echo pgAdmin 4:            Voir la base de donnees
echo                       Database: chu_management
echo.
echo ========================================
echo.
echo Les deux fenetres de commande sont ouvertes:
echo - Backend (Spring Boot)
echo - Frontend (React)
echo.
echo Fermez ces fenetres pour arreter les services
echo.
echo Appuyez sur une touche pour ouvrir le navigateur...
pause >nul

REM Ouvrir le navigateur
start http://localhost:5173

echo.
echo Projet en cours d'execution
echo Fermez cette fenetre quand vous avez termine
echo.
pause
