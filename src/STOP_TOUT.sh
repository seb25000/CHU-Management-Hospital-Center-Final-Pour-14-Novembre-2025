#!/bin/bash

# Script d'arrêt complet - CHU Management

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "  CHU MANAGEMENT - ARRÊT"
echo "========================================"
echo ""

# Arrêter Spring Boot
if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    echo "[1/2] Arrêt de Spring Boot (PID: $BACKEND_PID)..."
    
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo -e "${GREEN}[OK]${NC} Spring Boot arrêté"
    else
        echo -e "${RED}[INFO]${NC} Spring Boot n'était pas actif"
    fi
    
    rm backend.pid
else
    echo "[1/2] Pas de PID Spring Boot trouvé"
fi

echo ""

# Arrêter React
if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    echo "[2/2] Arrêt de React (PID: $FRONTEND_PID)..."
    
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID
        echo -e "${GREEN}[OK]${NC} React arrêté"
    else
        echo -e "${RED}[INFO]${NC} React n'était pas actif"
    fi
    
    rm frontend.pid
else
    echo "[2/2] Pas de PID React trouvé"
fi

echo ""
echo "========================================"
echo "  ARRÊT TERMINÉ"
echo "========================================"
echo ""
