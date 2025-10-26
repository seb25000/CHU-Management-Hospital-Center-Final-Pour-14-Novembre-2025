#!/bin/bash

clear

echo "███████████████████████████████████████████████████████████████"
echo "█                                                             █"
echo "█         🏥 CHU MANAGEMENT CENTER - LANCEMENT COMPLET        █"
echo "█                                                             █"
echo "███████████████████████████████████████████████████████████████"
echo ""

# ==============================================
# 1. VERIFICATION DES PREREQUIS
# ==============================================
echo "📋 ÉTAPE 1 : Vérification des prérequis..."
echo "================================================"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js manquant"
    echo "🔗 Installer : https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js détecté"

if ! command -v java &> /dev/null; then
    echo "❌ Java manquant"
    echo "🔗 Installer : https://adoptium.net/"
    exit 1
fi
echo "✅ Java détecté"

if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL manquant"
    echo "🔗 Installer : https://www.postgresql.org/download/"
    exit 1
fi
echo "✅ PostgreSQL détecté"

echo ""
echo "🎉 Tous les prérequis sont installés !"
sleep 2

# ==============================================
# 2. DEMARRAGE POSTGRESQL
# ==============================================
echo ""
echo "🗄️ ÉTAPE 2 : Démarrage de PostgreSQL..."
echo "================================================"

# Démarrer PostgreSQL selon l'OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo service postgresql start
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start postgresql
fi

echo "✅ PostgreSQL démarré !"
sleep 2

# ==============================================
# 3. CONFIGURATION DE LA BASE DE DONNÉES
# ==============================================
echo ""
echo "📦 ÉTAPE 3 : Configuration de la base de données..."
echo "================================================"

echo "📦 Création de la base de données..."
psql -U postgres << EOF
DROP DATABASE IF EXISTS chu_management;
CREATE DATABASE chu_management;
DROP USER IF EXISTS chu_user;
CREATE USER chu_user WITH PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\q
EOF

echo "🏗️ Création des tables..."
psql -U chu_user -d chu_management -f database/create-tables.sql

echo "📊 Insertion des données de test..."
psql -U chu_user -d chu_management -f database/sample-data.sql

echo "✅ Base de données configurée !"
sleep 2

# ==============================================
# 4. INSTALLATION DES DÉPENDANCES
# ==============================================
echo ""
echo "📦 ÉTAPE 4 : Installation des dépendances..."
echo "================================================"

echo "🎨 Installation dépendances Frontend (React)..."
npm install

echo "⚙️ Installation dépendances Backend (Spring Boot)..."
cd backend
./mvnw clean install -DskipTests
cd ..

echo "✅ Toutes les dépendances installées !"
sleep 2

# ==============================================
# 5. LANCEMENT DES SERVICES
# ==============================================
echo ""
echo "🚀 ÉTAPE 5 : Lancement des services..."
echo "================================================"

echo "⚙️ Démarrage du Backend Spring Boot..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

echo "⏳ Attente du démarrage du backend (45 secondes)..."
sleep 45

echo "🎨 Démarrage du Frontend React..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

sleep 5

# ==============================================
# 6. INFORMATION FINALE
# ==============================================
echo ""
echo "███████████████████████████████████████████████████████████████"
echo "█                                                             █"
echo "█                    🎉 PROJET LANCÉ !                       █"
echo "█                                                             █"
echo "███████████████████████████████████████████████████████████████"
echo ""
echo "📌 URLS D'ACCÈS :"
echo "   🌐 Site Web       : http://localhost:5173"
echo "   ⚙️ API Backend    : http://localhost:8080/api"
echo "   🗄️ Base de données: postgresql://localhost:5432/chu_management"
echo ""
echo "👤 COMPTES DE TEST :"
echo "   👑 Admin    : admin@chu-management.fr / password123"
echo "   👨‍⚕️ Docteur  : marie.dubois@chu-management.fr / password123"
echo "   🧑‍🦱 Patient  : jean.dupont@email.com / password123"
echo ""

# Ouvrir le navigateur automatiquement
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
elif command -v open &> /dev/null; then
    open http://localhost:5173
fi

echo "⚠️ POUR ARRÊTER : Ctrl+C"
echo "📞 SUPPORT : Consultez INSTALLATION_COMPLETE.md"
echo ""

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