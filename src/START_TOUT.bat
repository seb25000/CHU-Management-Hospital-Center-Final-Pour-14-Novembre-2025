@echo off
REM Script de démarrage complet - CHU Management
REM Ce script démarre PostgreSQL, Spring Boot et React en une seule commande

COLOR 0A
echo.
echo ========================================
echo   CHU MANAGEMENT - DEMARRAGE COMPLET
echo ========================================
echo.

REM Étape 1 : Vérifier PostgreSQL
echo [1/4] Verification de PostgreSQL...
echo.
pg_isready -h localhost -p 5432 >nul 2>&1
if %errorlevel% neq 0 (
    COLOR 0C
    echo [ERREUR] PostgreSQL n'est pas demarre ou n'est pas installe
    echo.
    echo Solutions possibles :
    echo   1. Demarrer PostgreSQL depuis les Services Windows
    echo   2. Ouvrir Services.msc et demarrer postgresql-x64-XX
    echo   3. Installer PostgreSQL depuis : https://www.postgresql.org/download/
    echo.
    pause
    exit /b 1
)
COLOR 0A
echo [OK] PostgreSQL est actif et pret
echo.

REM Étape 2 : Vérifier Java
echo [2/4] Verification de Java...
echo.
java -version >nul 2>&1
if %errorlevel% neq 0 (
    COLOR 0C
    echo [ERREUR] Java n'est pas installe ou n'est pas dans le PATH
    echo.
    echo Installez Java 17+ depuis : https://adoptium.net/
    echo.
    pause
    exit /b 1
)
COLOR 0A
echo [OK] Java est installe
echo.

REM Étape 3 : Démarrer Spring Boot
echo [3/4] Demarrage de Spring Boot Backend...
echo.
cd backend
if exist .env.bat (
    call .env.bat
    echo [OK] Variables d'environnement chargees
) else (
    echo [INFO] Fichier .env.bat non trouve, utilisation des valeurs par defaut
)
echo.
echo Demarrage du serveur Spring Boot sur http://localhost:8080
echo Cette fenetre va se fermer. Le backend continuera dans une nouvelle fenetre.
echo.
start "CHU Backend - Spring Boot" cmd /k "mvnw.cmd spring-boot:run"
cd ..
echo [OK] Spring Boot demarre (attendre 30 secondes)
timeout /t 30 /nobreak >nul

REM Étape 4 : Démarrer React Frontend
echo.
echo [4/4] Demarrage de React Frontend...
echo.
echo Demarrage du frontend sur http://localhost:5173
echo Cette fenetre va se fermer. Le frontend continuera dans une nouvelle fenetre.
echo.
start "CHU Frontend - React" cmd /k "npm run dev"

REM Attendre un peu
timeout /t 5 /nobreak >nul

REM Message final
cls
COLOR 0A
echo.
echo ========================================
echo   DEMARRAGE TERMINE AVEC SUCCES !
echo ========================================
echo.
echo Les applications sont maintenant actives :
echo.
echo   Frontend React : http://localhost:5173
echo   Backend Spring : http://localhost:8080
echo   Base de donnees : PostgreSQL (localhost:5432)
echo.
echo ========================================
echo   FENETRES OUVERTES
echo ========================================
echo.
echo Deux nouvelles fenetres ont ete ouvertes :
echo   1. CHU Backend - Spring Boot
echo   2. CHU Frontend - React
echo.
echo IMPORTANT : NE FERMEZ PAS ces fenetres !
echo.
echo ========================================
echo   POUR ARRETER
echo ========================================
echo.
echo Pour arreter les applications :
echo   1. Fermez la fenetre "CHU Backend - Spring Boot"
echo   2. Fermez la fenetre "CHU Frontend - React"
echo.
echo Ou appuyez sur Ctrl+C dans chaque fenetre
echo.
echo ========================================
echo.
echo Appuyez sur une touche pour ouvrir le navigateur...
pause >nul

REM Ouvrir le navigateur
start http://localhost:5173

echo.
echo Application ouverte dans le navigateur !
echo.
pause
