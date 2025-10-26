@echo off
REM ========================================
REM  CHU Management - Setup Base de Donnees PostgreSQL
REM  Script automatique pour Windows
REM ========================================

echo.
echo ========================================
echo  CHU Management Center
echo  Configuration Base de Donnees
echo ========================================
echo.

REM Verification PostgreSQL
echo [1/5] Verification de PostgreSQL...
where psql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: PostgreSQL n'est pas installe ou pas dans le PATH
    echo.
    echo Veuillez installer PostgreSQL depuis: https://www.postgresql.org/download/windows/
    echo.
    pause
    exit /b 1
)
echo OK - PostgreSQL est installe
echo.

REM Demander le mot de passe postgres
echo [2/5] Configuration...
set /p POSTGRES_PASSWORD="Entrez le mot de passe de l'utilisateur 'postgres': "
echo.

REM Creer la base de donnees
echo [3/5] Creation de la base de donnees 'chu_management'...
psql -U postgres -c "CREATE DATABASE chu_management;" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo OK - Base de donnees 'chu_management' creee
) else (
    echo INFO - La base de donnees existe deja ou erreur
)
echo.

REM Creer l'utilisateur
echo [4/5] Creation de l'utilisateur 'chu_user'...
psql -U postgres -c "CREATE USER chu_user WITH PASSWORD 'chu_password';" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo OK - Utilisateur 'chu_user' cree
) else (
    echo INFO - L'utilisateur existe deja ou erreur
)
echo.

REM Donner les privileges
echo Octroi des privileges...
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;" 2>nul
echo OK - Privileges octroyes
echo.

REM Executer les scripts SQL
echo [5/5] Creation des tables et insertion des donnees...

REM Verifier l'existence des fichiers SQL
if not exist "database\create-tables.sql" (
    echo ERREUR: Le fichier 'database\create-tables.sql' n'existe pas
    pause
    exit /b 1
)

if not exist "database\sample-data.sql" (
    echo ERREUR: Le fichier 'database\sample-data.sql' n'existe pas
    pause
    exit /b 1
)

REM Executer create-tables.sql
echo Execution du script 'create-tables.sql'...
psql -U chu_user -d chu_management -f database\create-tables.sql
if %ERRORLEVEL% EQU 0 (
    echo OK - Tables creees avec succes
) else (
    echo ERREUR - Probleme lors de la creation des tables
    pause
    exit /b 1
)
echo.

REM Executer sample-data.sql
echo Execution du script 'sample-data.sql'...
psql -U chu_user -d chu_management -f database\sample-data.sql
if %ERRORLEVEL% EQU 0 (
    echo OK - Donnees de test inserees avec succes
) else (
    echo ERREUR - Probleme lors de l'insertion des donnees
    pause
    exit /b 1
)
echo.

REM Verification finale
echo ========================================
echo  VERIFICATION FINALE
echo ========================================
echo.
echo Liste des tables creees:
psql -U chu_user -d chu_management -c "\dt"
echo.

echo ========================================
echo  CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Base de donnees: chu_management
echo Utilisateur:     chu_user
echo Mot de passe:    chu_password
echo Host:            localhost
echo Port:            5432
echo.
echo Vous pouvez maintenant:
echo 1. Lancer le backend Spring Boot (cd backend ^&^& mvn spring-boot:run)
echo 2. Lancer le frontend React (npm run dev)
echo.
echo Ou utiliser le script: start-local.bat
echo ========================================
echo.
pause
