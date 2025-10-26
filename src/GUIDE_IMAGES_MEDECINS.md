# 📸 Guide de Personnalisation des Images des Médecins

## Vue d'ensemble

Ce guide explique comment personnaliser les images (photos) de chaque médecin dans votre application CHU Management Hospital Center.

---

## 📍 Où se trouvent les images des médecins ?

Les images des médecins sont définies à **deux endroits** dans l'application :

### 1. **API Backend** (`/supabase/functions/server/chu-api.tsx`)
- **Ligne 213-306** : Données des médecins avec le champ `imageUrl`
- Utilisé par : Page d'accueil (section "Médecins en vedette")
- **6 médecins** avec images personnalisées

### 2. **Page Médecins** (`/pages/DoctorsPage.tsx`)
- **Ligne 10-91** : Données statiques `doctorsData` avec le champ `image`
- Utilisé par : Page complète des médecins
- **4 médecins** avec images personnalisées

---

## 🎨 Comment personnaliser une image de médecin ?

### Option 1 : Utiliser des images d'Unsplash (Recommandé pour le développement)

**Étape 1** : Trouvez une image sur [Unsplash](https://unsplash.com)
- Recherchez : "female doctor", "male surgeon", "cardiologist", etc.
- Choisissez une photo professionnelle appropriée

**Étape 2** : Copiez l'URL de l'image

**Étape 3** : Remplacez l'URL dans le code

#### Dans l'API (`chu-api.tsx`) :

```javascript
{
  id: 'dr_1',
  firstName: 'Marie',
  lastName: 'Dubois',
  specialty: 'Cardiologie',
  // ... autres champs
  imageUrl: 'https://images.unsplash.com/photo-VOTRE-IMAGE-ID' // ✅ Changez cette URL
}
```

#### Dans la Page Médecins (`DoctorsPage.tsx`) :

```javascript
{
  id: 'dr_dubois',
  name: 'Dr. Marie Dubois',
  specialty: 'Cardiologie',
  // ... autres champs
  image: 'https://images.unsplash.com/photo-VOTRE-IMAGE-ID' // ✅ Changez cette URL
}
```

### Option 2 : Utiliser vos propres images (Pour la production)

**Étape 1** : Préparez vos images
- Format recommandé : JPG ou PNG
- Résolution minimale : 800x800 pixels
- Poids optimal : < 500 KB

**Étape 2** : Hébergez vos images
- Utilisez un service d'hébergement d'images (Cloudinary, AWS S3, etc.)
- Ou placez-les dans le dossier `/public/images/doctors/` de votre projet local

**Étape 3** : Mettez à jour les URLs

```javascript
// Exemple avec images hébergées
imageUrl: 'https://votredomaine.com/images/doctors/dr-marie-dubois.jpg'

// Exemple avec images locales (projet local uniquement)
imageUrl: '/images/doctors/dr-marie-dubois.jpg'
```

---

## 🔄 Composant d'affichage

Le composant utilisé pour afficher les images est `ImageWithFallback` :

```javascript
<ImageWithFallback
  className="w-full h-64 object-cover"
  src={doctor.imageUrl || "URL_PAR_DEFAUT"}
  alt={`${doctor.firstName} ${doctor.lastName}`}
/>
```

**Avantages** :
- ✅ Gère automatiquement les erreurs de chargement
- ✅ Affiche une image de secours si l'URL ne fonctionne pas
- ✅ Optimise le rendu pour les performances

---

## 📊 Images actuelles des médecins

### Section "Médecins en vedette" (Page d'accueil)

| Médecin | Spécialité | Image |
|---------|-----------|-------|
| Dr. Marie Dubois | Cardiologie | Photo cardiologue féminine |
| Dr. Pierre Martin | Neurologie | Photo neurologue masculin |
| Dr. Sophie Lefebvre | Pédiatrie | Photo pédiatre féminine |
| Dr. Jean Rousseau | Orthopédie | Photo chirurgien orthopédiste |
| Dr. Émilie Bernard | Dermatologie | Photo dermatologue féminine |
| Dr. Thomas Petit | Radiologie | Photo radiologue masculin |

### Page complète des médecins

| Médecin | Spécialité | Image |
|---------|-----------|-------|
| Dr. Marie Dubois | Cardiologie | Photo cardiologue féminine |
| Dr. Pierre Martin | Neurologie | Photo neurologue masculin |
| Dr. Sophie Lefebvre | Pédiatrie | Photo pédiatre féminine |
| Dr. Paul Moreau | Orthopédie | Photo chirurgien orthopédiste |

---

## 🎯 Bonnes pratiques

### ✅ À FAIRE
1. **Uniformité** : Utilisez des images avec un style cohérent (même éclairage, même cadrage)
2. **Professionnalisme** : Choisissez des photos professionnelles en tenue médicale
3. **Qualité** : Utilisez des images haute résolution (minimum 800x800 px)
4. **Format** : Préférez le format portrait pour les photos de médecins
5. **Optimisation** : Compressez les images pour réduire le temps de chargement

### ❌ À ÉVITER
1. ❌ Images pixelisées ou de mauvaise qualité
2. ❌ Photos trop sombres ou mal éclairées
3. ❌ Images avec arrière-plan distrayant
4. ❌ URLs d'images expirées ou inaccessibles
5. ❌ Fichiers trop lourds (> 2 MB)

---

## 🚀 Ajouter un nouveau médecin avec une image

### Dans l'API (`chu-api.tsx`)

```javascript
{
  id: 'dr_7', // ID unique
  firstName: 'Nouveau',
  lastName: 'Médecin',
  specialty: 'Votre Spécialité',
  licenseNumber: 'SPE-2024-999',
  yearsExperience: 10,
  phone: '01 23 45 67 99',
  officeNumber: 'F404',
  consultationPrice: 70.00,
  isAvailable: true,
  bio: 'Courte biographie du médecin...',
  education: 'Université...',
  languages: ['Français', 'Anglais'],
  imageUrl: 'https://images.unsplash.com/photo-VOTRE-IMAGE' // 🎯 Image personnalisée
}
```

### Dans la Page Médecins (`DoctorsPage.tsx`)

```javascript
{
  id: 'dr_nouveau',
  name: 'Dr. Nouveau Médecin',
  specialty: 'Votre Spécialité',
  subSpecialty: 'Sous-spécialité',
  experience: '10 ans d\'expérience',
  qualifications: ['Qualification 1', 'Qualification 2'],
  education: ['Formation 1', 'Formation 2'],
  languages: ['Français', 'Anglais'],
  rating: 4.8,
  reviews: 50,
  consultationFee: '70€',
  availableTimes: ['09:00', '10:30', '14:00'],
  nextAvailable: '2024-01-20',
  location: 'Bâtiment F - 4ème étage',
  phone: '01 23 45 67 99',
  image: 'https://images.unsplash.com/photo-VOTRE-IMAGE', // 🎯 Image personnalisée
  bio: 'Biographie complète...',
  specialization: ['Spé 1', 'Spé 2', 'Spé 3']
}
```

---

## 🔍 Rechercher des images appropriées sur Unsplash

### Mots-clés recommandés par spécialité :

| Spécialité | Mots-clés Unsplash (en anglais) |
|-----------|----------------------------------|
| Cardiologie | "cardiologist doctor", "heart surgeon" |
| Neurologie | "neurologist doctor", "brain surgeon" |
| Pédiatrie | "pediatrician doctor", "child doctor" |
| Orthopédie | "orthopedic surgeon", "sports medicine" |
| Dermatologie | "dermatologist doctor", "skin specialist" |
| Radiologie | "radiologist doctor", "medical imaging" |
| Généraliste | "general practitioner", "family doctor" |
| Chirurgie | "surgeon doctor", "operating room" |

**Conseil** : Ajoutez "portrait" ou "professional" pour des résultats plus ciblés.

---

## 🔧 Dépannage

### Problème : L'image ne s'affiche pas

**Solutions** :
1. ✅ Vérifiez que l'URL de l'image est correcte et accessible
2. ✅ Assurez-vous que l'image est hébergée sur un serveur HTTPS
3. ✅ Testez l'URL dans votre navigateur
4. ✅ Vérifiez la syntaxe du code (guillemets, virgules)
5. ✅ L'image de secours s'affichera automatiquement si l'URL échoue

### Problème : L'image est déformée

**Solutions** :
1. ✅ Utilisez des images au format carré (1:1) ou portrait (3:4)
2. ✅ La classe CSS `object-cover` s'occupe du recadrage automatique
3. ✅ Vérifiez la résolution minimale (800x800 px)

### Problème : L'image se charge lentement

**Solutions** :
1. ✅ Compressez l'image avant l'upload
2. ✅ Utilisez des services d'optimisation d'images (TinyPNG, ImageOptim)
3. ✅ Réduisez la résolution si nécessaire (max 1500x1500 px)

---

## 📱 Responsive Design

Les images s'adaptent automatiquement à toutes les tailles d'écran :

- **Desktop** : Image grande (256px de hauteur)
- **Tablet** : Image moyenne (200px de hauteur)
- **Mobile** : Image adaptée (150px de hauteur)

Le composant `ImageWithFallback` gère automatiquement le responsive design.

---

## 💡 Conseils pour une galerie professionnelle

1. **Cohérence visuelle** : Utilisez le même style d'images pour tous les médecins
2. **Arrière-plan neutre** : Préférez les fonds unis (blanc, gris clair, bleu clair)
3. **Éclairage uniforme** : Toutes les photos avec le même type d'éclairage
4. **Expression** : Visages souriants et accueillants
5. **Tenue** : Blouse médicale ou tenue professionnelle

---

## 📞 Support

Pour toute question ou assistance supplémentaire concernant la personnalisation des images des médecins, consultez :

- 📖 Documentation React : Composants d'images
- 🎨 Guide de design : Standards visuels du CHU
- 💻 Stack Overflow : Problèmes techniques d'affichage d'images

---

**Dernière mise à jour** : Octobre 2025
**Version** : 1.0
