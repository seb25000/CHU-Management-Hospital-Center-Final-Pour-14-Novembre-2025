# ❓ FAQ - Connexion Base de Données

## Questions Fréquentes sur la Connexion PostgreSQL

---

## 🔍 Questions Générales

### Q1 : Mon application est-elle déjà connectée à une base de données ?

**Réponse** : OUI ✅

Votre application utilise actuellement **Supabase** qui est un backend cloud avec PostgreSQL intégré. Tout fonctionne déjà !

```bash
npm run dev
# L'application fonctionne immédiatement
```

---

### Q2 : Quelle est la différence entre Supabase et PostgreSQL local ?

| Aspect | Supabase (Actuel) | PostgreSQL Local |
|--------|-------------------|------------------|
| **Configuration** | ✅ Déjà fait | ⚠️ Nécessite installation |
| **Internet** | ❌ Obligatoire | ✅ Pas nécessaire |
| **Hébergement** | ☁️ Cloud | 💻 Votre ordinateur |
| **Vitesse** | ⚠️ Dépend réseau | ✅ Très rapide |
| **Contrôle** | ⚠️ Limité | ✅ Total |
| **Coût** | 💰 Gratuit (limites) | ✅ Gratuit (illimité) |

---

### Q3 : Dois-je obligatoirement passer à PostgreSQL local ?

**Réponse** : NON ❌

Supabase fonctionne parfaitement. Changez seulement si :
- ✅ Vous voulez travailler hors ligne
- ✅ Vous voulez apprendre Spring Boot
- ✅ C'est requis pour votre formation
- ✅ Vous voulez plus de contrôle

**Sinon, restez avec Supabase !**

---

## 🔧 Installation et Configuration

### Q4 : Comment savoir si PostgreSQL est installé sur mon ordinateur ?

**Windows** :
```cmd
psql --version
```

**Mac/Linux** :
```bash
psql --version
```

**Si installé** : Affiche `psql (PostgreSQL) 14.x`  
**Si non installé** : `command not found` ou erreur

---

### Q5 : Où télécharger PostgreSQL ?

**Windows** :
- URL : https://www.postgresql.org/download/windows/
- Télécharger l'installeur EnterpriseDB
- Version recommandée : 14.x ou 15.x

**Mac** :
```bash
brew install postgresql@14
```

**Linux (Ubuntu/Debian)** :
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

---

### Q6 : Quel mot de passe utiliser pour PostgreSQL ?

**Lors de l'installation** :
- PostgreSQL vous demande un mot de passe pour l'utilisateur `postgres`
- **IMPORTANT** : Notez ce mot de passe, vous en aurez besoin !

**Pour ce projet** :
- Utilisateur : `chu_user`
- Mot de passe : `chu_password` (modifiable dans `.env.bat` ou `.env.sh`)

---

### Q7 : Comment créer la base de données `chu_management` ?

**Étape 1** : Se connecter à PostgreSQL
```bash
psql -U postgres
```

**Étape 2** : Copier-coller ces commandes
```sql
CREATE DATABASE chu_management;
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\c chu_management
GRANT ALL ON SCHEMA public TO chu_user;
\q
```

**Fait !** ✅

---

### Q8 : Comment créer les tables ?

**Une seule commande** :
```bash
psql -U chu_user -d chu_management -h localhost -f database/init.sql
```

**Vérifier** :
```bash
psql -U chu_user -d chu_management -h localhost
\dt
# Vous devriez voir : users, doctors, patients, appointments, services, departments
\q
```

---

## 🚀 Démarrage

### Q9 : Comment démarrer avec PostgreSQL local ?

**Windows** :
```bash
START_TOUT.bat
```

**Mac/Linux** :
```bash
chmod +x START_TOUT.sh
./START_TOUT.sh
```

**Le script fait tout automatiquement** :
1. Vérifie PostgreSQL
2. Vérifie Java
3. Démarre Spring Boot
4. Démarre React
5. Ouvre le navigateur

---

### Q10 : Quelle ligne modifier pour passer à PostgreSQL local ?

**Fichier** : `/services/apiConfig.ts`

**Modifier** :
```typescript
export const BACKEND_TYPE: BackendType = 'supabase';
```

**En** :
```typescript
export const BACKEND_TYPE: BackendType = 'springboot';
```

**Sauvegarder et redémarrer** - C'est tout ! ✅

---

## ⚠️ Problèmes Courants

### Q11 : Erreur "PostgreSQL is not running"

**Cause** : PostgreSQL n'est pas démarré

**Solution Windows** :
```
1. Ouvrir Services (services.msc)
2. Chercher "postgresql-x64-14" (ou version similaire)
3. Clic droit → Démarrer
```

**Solution Mac** :
```bash
brew services start postgresql@14
```

**Solution Linux** :
```bash
sudo systemctl start postgresql
```

---

### Q12 : Erreur "password authentication failed for user chu_user"

**Cause** : Mauvais mot de passe ou utilisateur non créé

**Solution 1** : Vérifier que l'utilisateur existe
```sql
psql -U postgres -c "\du"
# Devrait afficher chu_user dans la liste
```

**Solution 2** : Recréer l'utilisateur
```sql
psql -U postgres
DROP USER IF EXISTS chu_user;
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\c chu_management
GRANT ALL ON SCHEMA public TO chu_user;
\q
```

---

### Q13 : Erreur "Port 8080 already in use"

**Cause** : Un autre service utilise le port 8080

**Solution** : Changer le port Spring Boot

**Fichier** : `backend/src/main/resources/application.yml`

```yaml
server:
  port: 8081  # Changer de 8080 à 8081 (ou autre)
```

**Redémarrer Spring Boot**

---

### Q14 : Erreur "Java not found"

**Cause** : Java n'est pas installé ou pas dans le PATH

**Solution** : Installer Java 17+

**Windows** :
- Télécharger : https://adoptium.net/
- Installer le JDK 17 (ou supérieur)

**Mac** :
```bash
brew install openjdk@17
```

**Linux** :
```bash
sudo apt install openjdk-17-jdk
```

**Vérifier** :
```bash
java -version
# Devrait afficher : openjdk version "17.x.x"
```

---

### Q15 : Erreur "Table 'doctors' doesn't exist"

**Cause** : Les tables n'ont pas été créées

**Solution** : Exécuter le script SQL
```bash
psql -U chu_user -d chu_management -h localhost -f database/init.sql
```

**Vérifier** :
```bash
psql -U chu_user -d chu_management -h localhost
\dt
\q
```

---

### Q16 : Erreur CORS dans le navigateur

**Cause** : Spring Boot n'accepte pas les requêtes depuis localhost:5173

**Solution** : Vérifier la configuration CORS

**Fichier** : `backend/src/main/java/com/chu/management/config/CorsConfig.java`

Doit contenir :
```java
.allowedOrigins("http://localhost:5173", "http://localhost:3000")
```

**Redémarrer Spring Boot**

---

### Q17 : Spring Boot démarre mais l'API ne répond pas

**Vérifier** :

1. **Spring Boot est bien démarré** :
```bash
curl http://localhost:8080/actuator/health
# Devrait afficher : {"status":"UP"}
```

2. **apiConfig.ts est correctement configuré** :
```typescript
export const BACKEND_TYPE: BackendType = 'springboot'; // PAS 'supabase'
```

3. **Les logs** :
```bash
# Mac/Linux
tail -f logs/backend.log

# Windows
type logs\backend.log
```

---

## 📊 Données et Contenu

### Q18 : Comment ajouter des médecins dans la base de données ?

**Option 1** : Via SQL
```sql
psql -U chu_user -d chu_management -h localhost

INSERT INTO doctors (first_name, last_name, specialty, email, phone, years_experience, is_available)
VALUES ('Jean', 'Dupont', 'Cardiologie', 'jean.dupont@chu.fr', '0123456789', 15, true);
```

**Option 2** : Via l'API
```bash
curl -X POST http://localhost:8080/api/doctors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN]" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "specialty": "Cardiologie",
    "email": "jean.dupont@chu.fr"
  }'
```

---

### Q19 : Où sont stockées les données avec Supabase ?

**Réponse** : Dans le cloud Supabase (PostgreSQL hébergé)

- Stockage : Table `kv_store_d31784ab` (Key-Value Store)
- Format : Clés préfixées (`doctors:1`, `patients:1`, etc.)
- Accès : Via les Edge Functions Supabase

---

### Q20 : Comment voir les données dans PostgreSQL local ?

**Interface Graphique** : pgAdmin
1. Télécharger : https://www.pgadmin.org/
2. Connecter au serveur localhost:5432
3. Ouvrir la base `chu_management`
4. Voir les tables et données

**Ligne de commande** :
```bash
psql -U chu_user -d chu_management -h localhost

# Voir tous les médecins
SELECT * FROM doctors;

# Voir tous les rendez-vous
SELECT * FROM appointments;

# Voir les stats
SELECT COUNT(*) FROM patients;

# Quitter
\q
```

---

## 🎓 Formation et Apprentissage

### Q21 : Dois-je expliquer Supabase ou PostgreSQL à mes profs ?

**Les deux sont valables !**

**Option 1 : Présenter avec Supabase**
```
"J'utilise Supabase comme backend-as-a-service avec PostgreSQL.
Supabase fournit une API REST et gère automatiquement la base de données.
C'est moderne et utilisé en production par de nombreuses entreprises."
```

**Option 2 : Présenter avec Spring Boot**
```
"J'ai configuré un backend Spring Boot avec Spring Security et JPA.
La base de données est PostgreSQL en local. J'ai implémenté
l'authentification JWT et créé une API REST complète."
```

**Les deux montrent des compétences techniques !**

---

### Q22 : Quelle option impressionnera plus mes professeurs ?

**Spring Boot + PostgreSQL Local** = Plus technique
- Montre que vous maîtrisez Spring Boot
- Configuration complète (JPA, Security, JWT)
- Démontre des compétences backend Java

**Supabase** = Plus moderne
- Montre que vous connaissez les technologies cloud
- Architecture serverless
- Utilisé par des startups modernes

**Conseil** : Choisissez selon votre programme :
- Cours Java/Spring → Spring Boot
- Cours Web Moderne → Supabase

---

### Q23 : Comment prouver que c'est moi qui ai fait le code ?

**Ne cachez RIEN, soyez honnête !**

Expliquez :
```
"J'ai utilisé des frameworks standards :
- React pour le frontend (comme Facebook, Netflix)
- Spring Boot pour le backend (standard industrie)
- PostgreSQL pour la base de données (gratuit, open source)

Mon travail a été de :
1. Concevoir l'architecture
2. Configurer les technologies ensemble
3. Créer les modèles de données
4. Implémenter la logique métier
5. Personnaliser l'interface utilisateur
6. Connecter frontend et backend

C'est comme construire une maison : j'ai utilisé des briques
standards (React, Spring Boot) mais c'est MOI qui ai conçu
et assemblé la maison (l'application)."
```

**Les profs veulent voir** :
- ✅ Que vous COMPRENEZ le code
- ✅ Que vous pouvez l'EXPLIQUER
- ✅ Que vous pouvez le MODIFIER
- ❌ PAS forcément que vous avez écrit chaque ligne

---

## 🔒 Sécurité

### Q24 : Est-ce que les mots de passe sont sécurisés ?

**OUI** ✅

- **Hashage** : Les mots de passe sont hashés avec bcrypt
- **JWT** : Authentification par token sécurisé
- **HTTPS** : Recommandé en production (Supabase l'utilise déjà)

---

### Q25 : Puis-je utiliser ce projet en production ?

**Oui, mais avec des modifications** :

**À faire avant production** :
1. Changer tous les secrets (JWT_SECRET, passwords)
2. Configurer HTTPS (certificat SSL)
3. Activer les logs de sécurité
4. Mettre à jour `ddl-auto: validate` (pas `create-drop`)
5. Configurer des backups réguliers
6. Implémenter rate limiting
7. Scanner les vulnérabilités

---

## 🆘 Support

### Q26 : Où trouver de l'aide ?

**Documentation du projet** :
- `CONNEXION_DATABASE_COMPLETE.md` - Guide complet
- `GUIDE_CONNEXION_POSTGRESQL.md` - Installation détaillée
- `DEMARRAGE_RAPIDE.md` - Guide rapide
- `SCHEMA_CONNEXION.md` - Schémas visuels
- `FAQ_CONNEXION.md` - Ce fichier

**Logs** :
```bash
# Backend
tail -f logs/backend.log

# Frontend
tail -f logs/frontend.log
```

**Tests** :
```bash
# Tester PostgreSQL
pg_isready -h localhost -p 5432

# Tester Spring Boot
curl http://localhost:8080/actuator/health

# Tester l'API
curl http://localhost:8080/api/doctors
```

---

### Q27 : Comment arrêter tous les services ?

**Windows** :
- Fermer les fenêtres CMD ouvertes
- Ou Ctrl+C dans chaque fenêtre

**Mac/Linux** :
```bash
./STOP_TOUT.sh
```

**Ou manuellement** :
```bash
# Trouver les processus
ps aux | grep spring-boot
ps aux | grep vite

# Arrêter par PID
kill [PID_SPRING_BOOT]
kill [PID_REACT]
```

---

## 🎯 Résumé

### Situation Actuelle
✅ Votre app fonctionne avec **Supabase** (cloud)  
✅ Vous AVEZ DÉJÀ une base de données connectée  
✅ Aucune action requise pour utiliser l'application  

### Pour Passer à PostgreSQL Local
1. Installer PostgreSQL
2. Créer la base de données
3. Créer les tables
4. Modifier 1 ligne dans `apiConfig.ts`
5. Lancer `START_TOUT.bat` ou `./START_TOUT.sh`

### Besoin d'Aide ?
📖 Consultez `CONNEXION_DATABASE_COMPLETE.md`  
🚀 Utilisez `DEMARRAGE_RAPIDE.md`  
📊 Regardez `SCHEMA_CONNEXION.md`  

---

**Votre application est complètement configurée ! Choisissez l'option qui vous convient.** 🎉
