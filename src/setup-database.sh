#!/bin/bash

echo "🗄️ Configuration de la base de données PostgreSQL..."

# Vérifier si PostgreSQL est installé
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL n'est pas installé. Veuillez l'installer d'abord."
    echo "🔗 Télécharger : https://www.postgresql.org/download/"
    exit 1
fi

# Démarrer PostgreSQL
echo "🔄 Démarrage de PostgreSQL..."
sudo service postgresql start 2>/dev/null || brew services start postgresql 2>/dev/null || echo "PostgreSQL déjà démarré."

# Créer la base de données et l'utilisateur
echo "📦 Création de la base de données et de l'utilisateur..."
psql -U postgres << EOF
-- Créer la base de données
DROP DATABASE IF EXISTS chu_management;
CREATE DATABASE chu_management;

-- Créer l'utilisateur
DROP USER IF EXISTS chu_user;
CREATE USER chu_user WITH PASSWORD 'chu_password';

-- Accorder les privilèges
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\q
EOF

# Exécuter les scripts de création
echo "🏗️ Création des tables..."
psql -U chu_user -d chu_management -f database/create-tables.sql

echo "📊 Insertion des données de test..."
psql -U chu_user -d chu_management -f database/sample-data.sql

echo "✅ Base de données configurée avec succès!"
echo ""
echo "📌 Informations de connexion :"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: chu_management"
echo "   Username: chu_user"
echo "   Password: chu_password"