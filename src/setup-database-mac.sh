#!/bin/bash

# ========================================
#  CHU Management - Setup Base de Données PostgreSQL
#  Script automatique pour Mac/Linux
# ========================================

echo ""
echo "========================================"
echo " CHU Management Center"
echo " Configuration Base de Données"
echo "========================================"
echo ""

# Vérification PostgreSQL
echo "[1/5] Vérification de PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "❌ ERREUR: PostgreSQL n'est pas installé"
    echo ""
    echo "Installation:"
    echo "  Mac:   brew install postgresql@16"
    echo "  Linux: sudo apt install postgresql"
    echo ""
    exit 1
fi
echo "✅ OK - PostgreSQL est installé"
echo ""

# Vérifier que PostgreSQL est démarré
echo "Vérification du service PostgreSQL..."
if ! pgrep -x postgres > /dev/null; then
    echo "PostgreSQL n'est pas démarré. Tentative de démarrage..."
    # Mac
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start postgresql@16
    # Linux
    else
        sudo systemctl start postgresql
    fi
    sleep 3
fi
echo "✅ PostgreSQL est démarré"
echo ""

# Demander le mot de passe postgres (optionnel sur Mac/Linux)
echo "[2/5] Configuration..."
read -sp "Entrez le mot de passe de l'utilisateur 'postgres' (Entrée si pas de mot de passe): " POSTGRES_PASSWORD
echo ""
echo ""

# Créer la base de données
echo "[3/5] Création de la base de données 'chu_management'..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac - utilisateur par défaut
    createdb chu_management 2>/dev/null && echo "✅ Base de données 'chu_management' créée" || echo "ℹ️  La base existe déjà"
else
    # Linux - utiliser sudo
    sudo -u postgres createdb chu_management 2>/dev/null && echo "✅ Base de données 'chu_management' créée" || echo "ℹ️  La base existe déjà"
fi
echo ""

# Créer l'utilisateur
echo "[4/5] Création de l'utilisateur 'chu_user'..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    psql postgres -c "CREATE USER chu_user WITH PASSWORD 'chu_password';" 2>/dev/null && echo "✅ Utilisateur 'chu_user' créé" || echo "ℹ️  L'utilisateur existe déjà"
    psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;" 2>/dev/null
else
    sudo -u postgres psql -c "CREATE USER chu_user WITH PASSWORD 'chu_password';" 2>/dev/null && echo "✅ Utilisateur 'chu_user' créé" || echo "ℹ️  L'utilisateur existe déjà"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;" 2>/dev/null
fi

echo "✅ Privilèges octroyés"
echo ""

# Exécuter les scripts SQL
echo "[5/5] Création des tables et insertion des données..."

# Vérifier l'existence des fichiers SQL
if [ ! -f "database/create-tables.sql" ]; then
    echo "❌ ERREUR: Le fichier 'database/create-tables.sql' n'existe pas"
    exit 1
fi

if [ ! -f "database/sample-data.sql" ]; then
    echo "❌ ERREUR: Le fichier 'database/sample-data.sql' n'existe pas"
    exit 1
fi

# Exécuter create-tables.sql
echo "Exécution du script 'create-tables.sql'..."
psql -U chu_user -d chu_management -f database/create-tables.sql
if [ $? -eq 0 ]; then
    echo "✅ Tables créées avec succès"
else
    echo "❌ ERREUR lors de la création des tables"
    exit 1
fi
echo ""

# Exécuter sample-data.sql
echo "Exécution du script 'sample-data.sql'..."
psql -U chu_user -d chu_management -f database/sample-data.sql
if [ $? -eq 0 ]; then
    echo "✅ Données de test insérées avec succès"
else
    echo "❌ ERREUR lors de l'insertion des données"
    exit 1
fi
echo ""

# Vérification finale
echo "========================================"
echo " VÉRIFICATION FINALE"
echo "========================================"
echo ""
echo "Liste des tables créées:"
psql -U chu_user -d chu_management -c "\dt"
echo ""

echo "========================================"
echo " CONFIGURATION TERMINÉE!"
echo "========================================"
echo ""
echo "Base de données: chu_management"
echo "Utilisateur:     chu_user"
echo "Mot de passe:    chu_password"
echo "Host:            localhost"
echo "Port:            5432"
echo ""
echo "Vous pouvez maintenant:"
echo "1. Lancer le backend Spring Boot (cd backend && mvn spring-boot:run)"
echo "2. Lancer le frontend React (npm run dev)"
echo ""
echo "Ou utiliser le script: ./start-local.sh"
echo "========================================"
echo ""
