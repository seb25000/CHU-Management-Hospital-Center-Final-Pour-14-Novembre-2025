# ⚡ Démarrage Rapide - CHU Management

## 🎯 Situation Actuelle

Votre application **fonctionne déjà** avec **Supabase** (backend cloud).

```
npm run dev
```

Ouvrez http://localhost:5173 et tout fonctionne ! ✅

---

## 🔄 Vous Voulez Passer à PostgreSQL Local ?

### Pourquoi ?
- ✅ Contrôle total de vos données
- ✅ Pas besoin d'internet
- ✅ Parfait pour l'apprentissage
- ✅ Idéal pour projet scolaire

---

## 📋 3 ÉTAPES SIMPLES

### ÉTAPE 1 : Installer PostgreSQL

**Windows** :
1. Télécharger : https://www.postgresql.org/download/windows/
2. Installer (noter le mot de passe !)
3. Port : 5432 (par défaut)

**Mac** :
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux** :
```bash
sudo apt install postgresql
sudo systemctl start postgresql
```

---

### ÉTAPE 2 : Créer la Base de Données

**Copier-coller ces commandes** :

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Puis exécuter :
CREATE DATABASE chu_management;
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\c chu_management
GRANT ALL ON SCHEMA public TO chu_user;
\q
```

**Créer les tables** :
```bash
psql -U chu_user -d chu_management -h localhost -f database/init.sql
```

---

### ÉTAPE 3 : Changer 1 Ligne de Code

Ouvrir `/services/apiConfig.ts`

**Changer** :
```typescript
export const BACKEND_TYPE: BackendType = 'supabase';
```

**En** :
```typescript
export const BACKEND_TYPE: BackendType = 'springboot';
```

---

## 🚀 DÉMARRER

### Windows
```bash
START_TOUT.bat
```

### Mac/Linux
```bash
chmod +x START_TOUT.sh STOP_TOUT.sh backend/.env.sh
./START_TOUT.sh
```

---

## 🎯 C'EST TOUT !

L'application s'ouvrira automatiquement dans votre navigateur :
- Frontend : http://localhost:5173
- Backend : http://localhost:8080

---

## ⚠️ Problèmes ?

### "PostgreSQL n'est pas démarré"

**Windows** :
```
Services (services.msc) → postgresql → Démarrer
```

**Mac** :
```bash
brew services start postgresql@14
```

**Linux** :
```bash
sudo systemctl start postgresql
```

### "Java n'est pas installé"

**Télécharger Java 17** : https://adoptium.net/

**Mac** :
```bash
brew install openjdk@17
```

**Linux** :
```bash
sudo apt install openjdk-17-jdk
```

### "Port 8080 already in use"

Changer le port dans `backend/src/main/resources/application.yml` :
```yaml
server:
  port: 8081
```

---

## 📊 Comparaison Rapide

| | Supabase (Actuel) | PostgreSQL Local |
|---|---|---|
| **Configuration** | ✅ Déjà fait | ⚠️ 10 minutes |
| **Internet** | ❌ Requis | ✅ Pas besoin |
| **Vitesse** | ⚠️ Variable | ✅ Très rapide |
| **Contrôle** | ⚠️ Limité | ✅ Total |

---

## 🎓 Pour Votre Formation

### Option 1 : Présenter avec Supabase
"J'utilise Supabase comme backend cloud avec PostgreSQL"

**Avantage** : Aucune installation, démo facile

### Option 2 : Présenter avec PostgreSQL Local
"J'ai configuré un backend Spring Boot avec PostgreSQL local"

**Avantage** : Montre plus de compétences techniques

**Les deux sont valables !**

---

## 📚 Documentation Complète

- **`CONNEXION_DATABASE_COMPLETE.md`** - Guide détaillé complet
- **`GUIDE_CONNEXION_POSTGRESQL.md`** - Installation pas à pas
- **`README.md`** - Vue d'ensemble du projet

---

## ✅ Checklist

### Pour rester avec Supabase (rien à faire)
- [ ] `npm run dev`
- [ ] Ça fonctionne !

### Pour passer à PostgreSQL Local
- [ ] PostgreSQL installé
- [ ] Base de données créée
- [ ] Tables créées
- [ ] Java installé
- [ ] `BACKEND_TYPE = 'springboot'` dans apiConfig.ts
- [ ] `START_TOUT.bat` ou `./START_TOUT.sh`

---

## 🎯 Besoin d'Aide ?

Consultez les fichiers :
1. **`CONNEXION_DATABASE_COMPLETE.md`** → Guide complet
2. **`GUIDE_CONNEXION_POSTGRESQL.md`** → Détails d'installation
3. **`README.md`** → Architecture générale

---

**Votre projet est prêt ! Choisissez votre option et démarrez !** 🚀
