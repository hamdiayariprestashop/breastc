# BIC Medical Center - Plateforme Web

## 📋 Vue d'ensemble

BIC Medical Center est une plateforme web complète pour un centre médical moderne, développée avec React, TypeScript et Tailwind CSS. La plateforme comprend un site public pour les patients et une interface d'administration complète pour la gestion du contenu.

## 🏥 Fonctionnalités Principales

### Site Public
- **Page d'accueil** avec présentation du centre
- **Services médicaux** détaillés avec descriptions
- **Départements spécialisés** (Radiologie, Cardiologie, etc.)
- **Équipe médicale** avec profils des médecins
- **Articles scientifiques** avec modal de lecture complète
- **FAQ** interactive
- **Galerie d'images** médicales
- **Formulaire de contact** avec tracking
- **Prise de rendez-vous** en ligne

### Interface d'Administration
- **Dashboard analytique** en temps réel
- **Gestion de contenu** complète
- **Gestion des articles scientifiques**
- **Upload de médias** (images/vidéos)
- **Analytics et statistiques** détaillées
- **Authentification sécurisée**

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React Router** - Navigation
- **React Hook Form** - Gestion des formulaires
- **Tremor.rs** - Composants dashboard
- **Heroicons** - Icônes

### Backend
- **Node.js** - Serveur
- **Express.js** - Framework web
- **Multer** - Upload de fichiers
- **CORS** - Cross-origin requests

### Stockage
- **JSON** - Base de données légère
- **LocalStorage** - Analytics côté client
- **Fichiers statiques** - Médias uploadés

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone [url-du-repo]
cd projet
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur backend**
```bash
cd server
npm install
npm start
```

4. **Démarrer l'application frontend**
```bash
npm start
```

5. **Accéder à l'application**
- Site public : `http://localhost:3000`
- Admin : `http://localhost:3000/admin/login`

## 👨‍💼 Guide d'Administration

### Connexion à l'Admin

1. **Accès à l'interface**
   - URL : `http://localhost:3000/admin/login`
   - Identifiants par défaut :
     - Email : `admin@bicmedical.com`
     - Mot de passe : `admin123`

2. **Sécurité**
   - Changez les identifiants par défaut
   - Utilisez des mots de passe forts
   - Déconnectez-vous après utilisation

### Dashboard Principal

Le dashboard fournit une vue d'ensemble complète avec :

#### 📊 Métriques Principales
- **Total des visites** - Nombre de visiteurs uniques
- **Utilisateurs** - Comptage des utilisateurs actifs
- **Articles** - Nombre d'articles scientifiques publiés
- **Fichiers média** - Total des uploads (images/vidéos)

#### 📈 Analytics en Temps Réel
- **Données en direct** avec mise à jour automatique
- **Activité récente** - Actions des utilisateurs
- **Pages populaires** - Contenu le plus consulté
- **Croissance** - Pourcentages d'évolution

#### 🎛️ Contrôles
- **Ajouter des données d'exemple** - Pour tester le système
- **Effacer les données** - Reset complet des analytics
- **Mise à jour en direct** - Indicateur de données live

### Gestion du Contenu

#### 📝 Éditeur de Contenu Principal

**Accès :** Menu "✏️ Contenu" ou `/admin/content`

**Sections disponibles :**

1. **Hero Section**
   - Titre principal et sous-titre
   - Bouton d'action personnalisable
   - Image de fond

2. **À Propos**
   - Description du centre médical
   - Mission et valeurs
   - Historique

3. **Services**
   - Liste des services médicaux
   - Descriptions détaillées
   - Icônes et images

4. **Départements**
   - Services spécialisés
   - Équipes médicales
   - Informations de contact

5. **Équipe**
   - Profils des médecins
   - Photos et spécialités
   - Expérience et qualifications

6. **FAQ**
   - Questions fréquemment posées
   - Réponses détaillées
   - Catégorisation

7. **Footer**
   - Informations de contact
   - Liens utiles
   - Réseaux sociaux

#### 📰 Gestion des Articles Scientifiques

**Accès :** Menu "📰 Articles" ou `/admin/articles`

**Fonctionnalités :**

- **Ajouter un article**
  - Titre et résumé
  - Contenu complet (Markdown supporté)
  - Image ou vidéo d'illustration
  - Auteur et date de publication
  - Catégorie et statut (publié/brouillon)

- **Modifier un article existant**
  - Édition en ligne complète
  - Prévisualisation en temps réel
  - Sauvegarde automatique

- **Gestion des médias**
  - Upload d'images (JPG, PNG, WebP)
  - Upload de vidéos (MP4, WebM)
  - Compression automatique
  - Noms de fichiers optimisés

#### 🖼️ Upload de Médias

**Types supportés :**
- **Images** : JPG, JPEG, PNG, WebP
- **Vidéos** : MP4, WebM, AVI
- **Taille max** : 10MB par fichier

**Processus d'upload :**
1. Sélectionner le fichier
2. Upload automatique vers `/uploads/`
3. Génération d'URL accessible
4. Intégration dans le contenu

### Analytics et Suivi

#### 📊 Système de Tracking

**Données collectées :**
- **Vues de pages** - Navigation des visiteurs
- **Lectures d'articles** - Engagement du contenu
- **Soumissions de formulaires** - Leads générés
- **Uploads de médias** - Activité admin
- **Nouveaux articles** - Production de contenu

#### 📈 Métriques Détaillées

**Dashboard Analytics :**
- **Visites totales** avec évolution
- **Utilisateurs uniques** par période
- **Pages populaires** avec classement
- **Activité récente** chronologique
- **Performance des articles** (vues, commentaires)

**Fonctionnalités avancées :**
- **Mise à jour en temps réel** (30 secondes)
- **Stockage local** pour performance
- **Export des données** (à venir)
- **Alertes automatiques** (à venir)

## 🔧 Configuration et Personnalisation

### Structure des Fichiers

```
src/
├── components/          # Composants réutilisables
│   ├── admin/          # Composants d'administration
│   ├── ScientificArticles.tsx
│   ├── Contact.tsx
│   └── ...
├── pages/              # Pages principales
│   └── admin/          # Pages d'administration
├── contexts/           # Contextes React
├── services/           # Services et API
├── types/              # Définitions TypeScript
└── data/               # Données statiques

server/
├── server.js           # Serveur Express
├── uploads/            # Fichiers uploadés
└── package.json
```

### Personnalisation du Contenu

#### Modifier les Couleurs
```css
/* src/index.css */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

#### Ajouter de Nouveaux Services
1. Aller dans `/admin/content`
2. Section "Services"
3. Ajouter un nouvel élément
4. Sauvegarder

#### Personnaliser le Footer
1. Aller dans `/admin/content`
2. Section "Footer"
3. Modifier les informations
4. Ajouter/retirer des liens

### Configuration du Serveur

#### Variables d'Environnement
Créer un fichier `.env` dans le dossier `server/` :

```env
PORT=3001
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_TYPES=image/jpeg,image/png,image/webp,video/mp4,video/webm
```

#### Sécurité
- Changer les identifiants admin par défaut
- Configurer HTTPS en production
- Limiter l'accès admin par IP
- Sauvegarder régulièrement les données

## 🚀 Déploiement en Production

### Préparation
1. **Build de production**
```bash
npm run build
```

2. **Optimisation des images**
- Compression des médias
- Formats WebP pour les images
- Lazy loading des contenus

3. **Configuration serveur**
- Variables d'environnement
- Certificats SSL
- Backup automatique

### Serveur de Production
- **Nginx** pour servir les fichiers statiques
- **PM2** pour gérer les processus Node.js
- **Sauvegarde quotidienne** des données
- **Monitoring** des performances

## 📱 Responsive Design

La plateforme est entièrement responsive et optimisée pour :
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Breakpoints Tailwind
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🔒 Sécurité

### Mesures Implémentées
- **Authentification** avec tokens
- **Validation** des données d'entrée
- **Sanitisation** du contenu
- **Upload sécurisé** des fichiers
- **CORS** configuré
- **Rate limiting** (à implémenter)

### Bonnes Pratiques
- Mots de passe forts obligatoires
- Déconnexion automatique après inactivité
- Audit des actions admin
- Sauvegarde chiffrée des données

## 🐛 Dépannage

### Problèmes Courants

#### Serveur ne démarre pas
```bash
# Vérifier le port
netstat -an | grep 3001

# Redémarrer
cd server && npm start
```

#### Upload de fichiers échoue
- Vérifier les permissions du dossier `uploads/`
- Contrôler la taille du fichier (< 10MB)
- Vérifier le type MIME autorisé

#### Analytics ne s'affichent pas
- Effacer le cache du navigateur
- Vérifier la console pour erreurs JavaScript
- Cliquer sur "Add Sample Data" pour tester

### Logs et Debug
- **Console navigateur** : F12 → Console
- **Logs serveur** : Terminal du serveur
- **Analytics** : LocalStorage du navigateur

## 📞 Support

Pour toute question ou problème :
1. Vérifier cette documentation
2. Consulter les logs d'erreur
3. Tester avec les données d'exemple
4. Contacter l'équipe de développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Développé par** : Équipe BIC Medical Center

