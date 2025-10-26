#!/bin/bash

# ========================================
#  CHU Management - Lancement Complet
#  Backend Spring Boot + Frontend React
# ========================================

echo ""
echo "========================================"
echo " CHU Management Center"
echo " Démarrage du Projet Complet"
echo "========================================"
echo ""

# Vérification PostgreSQL
echo "[1/4] Vérification de PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "❌ ERREUR: PostgreSQL n'est pas installé"
    echo ""
    echo "Installation:"
    echo "  Mac:   brew install postgresql@16"
    echo "  Linux: sudo apt install postgresql"
    echo ""
    exit 1
fi

# Vérifier que PostgreSQL est démarré
if ! pgrep -x postgres > /dev/null; then
    echo "PostgreSQL n'est pas démarré. Démarrage..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start postgresql@16
    else
        sudo systemctl start postgresql
    fi
    sleep 3
fi
echo "✅ PostgreSQL est en cours d'exécution"
echo ""

# Vérification Maven
echo "[2/4] Vérification de Maven..."
if ! command -v mvn &> /dev/null; then
    echo "❌ ERREUR: Maven n'est pas installé"
    echo ""
    echo "Installation:"
    echo "  Mac:   brew install maven"
    echo "  Linux: sudo apt install maven"
    echo ""
    exit 1
fi
echo "✅ Maven est installé"
echo ""

# Vérification Node.js
echo "[3/4] Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ ERREUR: Node.js n'est pas installé"
    echo ""
    echo "Installation:"
    echo "  Mac:   brew install node"
    echo "  Linux: sudo apt install nodejs npm"
    echo ""
    exit 1
fi
echo "✅ Node.js est installé"
echo ""

# Installation des dépendances npm si nécessaire
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances npm..."
    npm install
    echo ""
fi

# Fonction pour nettoyer les processus à la sortie
cleanup() {
    echo ""
    echo "Arrêt des services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Lancement du Backend
echo "[4/4] Démarrage du Backend Spring Boot..."
echo ""
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

echo "Attente du démarrage du backend (30 secondes)..."
sleep 30

# Lancement du Frontend
echo ""
echo "Démarrage du Frontend React..."
echo ""
npm run dev &
FRONTEND_PID=$!

sleep 5

# Affichage final
echo ""
echo "========================================"
echo " PROJET LANCÉ AVEC SUCCÈS!"
echo "========================================"
echo ""
echo "Backend Spring Boot:  http://localhost:8080"
echo "Frontend React:       http://localhost:5173"
echo ""
echo "pgAdmin 4:            Voir la base de données"
echo "                      Database: chu_management"
echo ""
echo "========================================"
echo ""
echo "Processus en cours d'exécution:"
echo "- Backend PID: $BACKEND_PID"
echo "- Frontend PID: $FRONTEND_PID"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les services"
echo ""

# Ouvrir le navigateur (optionnel)
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:5173 2>/dev/null
fi

# Attendre les processus
wait $BACKEND_PID $FRONTEND_PID
