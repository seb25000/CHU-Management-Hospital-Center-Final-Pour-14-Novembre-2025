#!/bin/bash

# Script de démarrage complet - CHU Management
# Ce script démarre PostgreSQL, Spring Boot et React en une seule commande

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "  CHU MANAGEMENT - DÉMARRAGE COMPLET"
echo "========================================"
echo ""

# Étape 1 : Vérifier PostgreSQL
echo "[1/4] Vérification de PostgreSQL..."
echo ""

if ! command -v psql &> /dev/null; then
    echo -e "${RED}[ERREUR]${NC} PostgreSQL n'est pas installé"
    echo ""
    echo "Solutions possibles :"
    echo "  Mac    : brew install postgresql@14"
    echo "  Ubuntu : sudo apt install postgresql"
    echo ""
    exit 1
fi

if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "${RED}[ERREUR]${NC} PostgreSQL n'est pas démarré"
    echo ""
    echo "Pour démarrer PostgreSQL :"
    echo "  Mac    : brew services start postgresql@14"
    echo "  Ubuntu : sudo systemctl start postgresql"
    echo ""
    exit 1
fi

echo -e "${GREEN}[OK]${NC} PostgreSQL est actif et prêt"
echo ""

# Étape 2 : Vérifier Java
echo "[2/4] Vérification de Java..."
echo ""

if ! command -v java &> /dev/null; then
    echo -e "${RED}[ERREUR]${NC} Java n'est pas installé"
    echo ""
    echo "Installez Java 17+ :"
    echo "  Mac    : brew install openjdk@17"
    echo "  Ubuntu : sudo apt install openjdk-17-jdk"
    echo ""
    exit 1
fi

echo -e "${GREEN}[OK]${NC} Java est installé"
java -version
echo ""

# Étape 3 : Démarrer Spring Boot
echo "[3/4] Démarrage de Spring Boot Backend..."
echo ""

cd backend || exit 1

if [ -f .env.sh ]; then
    source .env.sh
    echo -e "${GREEN}[OK]${NC} Variables d'environnement chargées"
else
    echo -e "${YELLOW}[INFO]${NC} Fichier .env.sh non trouvé, utilisation des valeurs par défaut"
fi

echo ""
echo "Démarrage du serveur Spring Boot sur http://localhost:8080"
echo "Le backend continuera dans un processus en arrière-plan"
echo ""

# Démarrer Spring Boot en arrière-plan
./mvnw spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../backend.pid

cd ..

echo -e "${GREEN}[OK]${NC} Spring Boot démarré (PID: $BACKEND_PID)"
echo "Attente de 30 secondes pour l'initialisation..."
sleep 30

# Étape 4 : Démarrer React Frontend
echo ""
echo "[4/4] Démarrage de React Frontend..."
echo ""

echo "Démarrage du frontend sur http://localhost:5173"
echo "Le frontend continuera dans un processus en arrière-plan"
echo ""

# Démarrer React en arrière-plan
npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > frontend.pid

echo -e "${GREEN}[OK]${NC} React démarré (PID: $FRONTEND_PID)"
echo ""

# Attendre un peu
sleep 5

# Message final
clear
echo ""
echo "========================================"
echo "  DÉMARRAGE TERMINÉ AVEC SUCCÈS !"
echo "========================================"
echo ""
echo "Les applications sont maintenant actives :"
echo ""
echo "  Frontend React : http://localhost:5173"
echo "  Backend Spring : http://localhost:8080"
echo "  Base de données : PostgreSQL (localhost:5432)"
echo ""
echo "========================================"
echo "  PROCESSUS EN COURS"
echo "========================================"
echo ""
echo "  Backend PID  : $BACKEND_PID"
echo "  Frontend PID : $FRONTEND_PID"
echo ""
echo "========================================"
echo "  LOGS"
echo "========================================"
echo ""
echo "  Backend  : tail -f logs/backend.log"
echo "  Frontend : tail -f logs/frontend.log"
echo ""
echo "========================================"
echo "  POUR ARRÊTER"
echo "========================================"
echo ""
echo "  Exécutez : ./STOP_TOUT.sh"
echo "  Ou manuellement :"
echo "    kill $BACKEND_PID  # Arrêter Spring Boot"
echo "    kill $FRONTEND_PID # Arrêter React"
echo ""
echo "========================================"
echo ""

# Ouvrir le navigateur (selon l'OS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    elif command -v gnome-open &> /dev/null; then
        gnome-open http://localhost:5173
    fi
fi

echo "Application ouverte dans le navigateur !"
echo ""
echo "Les processus continuent en arrière-plan."
echo "Gardez ce terminal ouvert ou notez les PID ci-dessus."
echo ""
