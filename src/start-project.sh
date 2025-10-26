#!/bin/bash

# Script de lancement complet du projet CHU Management

echo "🏥 Démarrage du projet CHU Management Center..."

# Vérifications préalables
echo "📋 Vérification des prérequis..."

# Vérifier PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier Java
if ! command -v java &> /dev/null; then
    echo "❌ Java n'est pas installé. Veuillez installer Java 17+."
    exit 1
fi

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Tous les prérequis sont installés."

# Configurer la base de données
echo "🗄️ Configuration de la base de données..."
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw chu_management; then
    echo "✅ Base de données chu_management déjà existante."
else
    echo "📦 Création de la base de données..."
    psql -U postgres -f database/init.sql
    psql -U chu_user -d chu_management -f database/create-tables.sql
    psql -U chu_user -d chu_management -f database/sample-data.sql
    echo "✅ Base de données créée avec succès."
fi

# Démarrer PostgreSQL si nécessaire
echo "🔄 Démarrage de PostgreSQL..."
sudo service postgresql start 2>/dev/null || brew services start postgresql 2>/dev/null || echo "PostgreSQL déjà démarré."

# Installation des dépendances frontend
echo "📦 Installation des dépendances frontend..."
npm install

# Fonction pour démarrer le backend
start_backend() {
    echo "🚀 Démarrage du backend Spring Boot..."
    cd backend
    ./mvnw spring-boot:run &
    BACKEND_PID=$!
    echo "Backend démarré avec PID: $BACKEND_PID"
    cd ..
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo "🎨 Démarrage du frontend React..."
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend démarré avec PID: $FRONTEND_PID"
}

# Démarrer les services
start_backend
sleep 10  # Attendre que le backend démarre
start_frontend

echo ""
echo "🎉 Projet démarré avec succès !"
echo ""
echo "📌 URLs d'accès :"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8080/api"
echo "   Base de données: postgresql://localhost:5432/chu_management"
echo ""
echo "👤 Comptes de test :"
echo "   Admin: admin@chu-management.fr / password123"
echo "   Docteur: marie.dubois@chu-management.fr / password123"
echo "   Patient: jean.dupont@email.com / password123"
echo ""
echo "⚠️ Pour arrêter les services, appuyez sur Ctrl+C"

# Fonction de nettoyage
cleanup() {
    echo ""
    echo "🛑 Arrêt des services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "Backend arrêté."
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "Frontend arrêté."
    fi
    echo "🏁 Tous les services ont été arrêtés."
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
wait