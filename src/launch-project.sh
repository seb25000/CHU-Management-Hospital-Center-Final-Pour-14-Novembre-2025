#!/bin/bash

echo "🚀 Lancement du projet CHU Management Center"
echo "============================================="

# Fonction pour démarrer PostgreSQL
start_postgresql() {
    echo "🗄️ Démarrage de PostgreSQL..."
    sudo service postgresql start 2>/dev/null || brew services start postgresql 2>/dev/null || echo "PostgreSQL déjà démarré."
}

# Fonction pour démarrer le backend
start_backend() {
    echo "⚙️ Démarrage du backend Spring Boot..."
    cd backend
    echo "📦 Installation des dépendances Maven..."
    ./mvnw clean install -DskipTests
    echo "🚀 Lancement du serveur Spring Boot..."
    ./mvnw spring-boot:run &
    BACKEND_PID=$!
    echo "Backend PID: $BACKEND_PID"
    cd ..
    return $BACKEND_PID
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo "🎨 Démarrage du frontend React..."
    echo "📦 Installation des dépendances npm..."
    npm install
    echo "🚀 Lancement du serveur de développement..."
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend PID: $FRONTEND_PID"
    return $FRONTEND_PID
}

# Lancement séquentiel
start_postgresql
start_backend
BACKEND_PID=$?

echo "⏳ Attente du démarrage du backend (30 secondes)..."
sleep 30

start_frontend
FRONTEND_PID=$?

echo ""
echo "🎉 Projet lancé avec succès!"
echo "================================"
echo ""
echo "📌 URLs d'accès :"
echo "   🌐 Frontend : http://localhost:5173"
echo "   🔧 Backend  : http://localhost:8080"
echo "   📊 API      : http://localhost:8080/api"
echo "   🗄️ Database : postgresql://localhost:5432/chu_management"
echo ""
echo "👤 Comptes de test :"
echo "   👑 Admin    : admin@chu-management.fr / password123"
echo "   👨‍⚕️ Docteur  : marie.dubois@chu-management.fr / password123"
echo "   🧑‍🦱 Patient  : jean.dupont@email.com / password123"
echo ""
echo "⚠️ Pour arrêter : Ctrl+C"

# Gestion de l'arrêt propre
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
    echo "🏁 Tous les services ont été arrêtés proprement."
    exit 0
}

trap cleanup SIGINT
wait