# 📋 Guide d'Administration - BIC Medical Center

## 🔐 Connexion à l'Administration

### Accès Initial
1. **URL d'accès** : `http://localhost:3000/admin/login`
2. **Identifiants par défaut** :
   - **Email** : `admin@bicmedical.com`
   - **Mot de passe** : `admin123`

⚠️ **Important** : Changez ces identifiants dès la première connexion !

### Sécurité
- Utilisez un mot de passe fort (minimum 12 caractères)
- Déconnectez-vous après chaque session
- Ne partagez jamais vos identifiants
- Activez l'authentification à deux facteurs si disponible

## 🏠 Dashboard Principal

### Vue d'Ensemble
Le dashboard affiche les métriques essentielles de votre site :

#### 📊 Métriques Clés
- **Total des Visites** : Nombre de visiteurs uniques
- **Total des Utilisateurs** : Comptage des utilisateurs actifs
- **Total des Articles** : Articles scientifiques publiés
- **Fichiers Média** : Nombre total d'uploads

#### 🎛️ Contrôles du Dashboard

**Bouton "Add Sample Data"**
- Génère des données d'exemple réalistes
- Utile pour tester le système
- Ajoute 100+ interactions simulées

**Bouton "Clear Data"**
- Efface toutes les données d'analytics
- Remet le compteur à zéro
- Utilisez avec précaution !

**Indicateur "Live Data"**
- Point vert pulsant = données en temps réel
- Mise à jour automatique toutes les 30 secondes
- Dernière mise à jour affichée

### Widgets du Dashboard

#### 🎯 Widget de Bienvenue
Affiche un résumé personnalisé :
- Nombre d'articles en brouillon
- Commentaires récents
- Visites du mois

#### 📈 Graphiques de Performance
- **Évolution des visites** avec pourcentage de croissance
- **Top 5 des pages** les plus visitées
- **Activité récente** chronologique

#### 📋 Tableau des Articles
- **Titre** et **statut** (publié/brouillon)
- **Date** de publication
- **Vues** et **commentaires**
- **Actions** rapides

## ✏️ Gestion du Contenu

### Accès à l'Éditeur
- **Menu principal** : "✏️ Contenu"
- **URL directe** : `/admin/content`
- **Navigation par onglets** : Chaque section a son onglet

### 📝 Sections Éditables

#### 1. Hero Section (Page d'Accueil)
**Éléments modifiables :**
- **Titre principal** : Phrase d'accroche
- **Sous-titre** : Description courte
- **Bouton d'action** : Texte et lien
- **Image de fond** : Upload d'image

**Conseils :**
- Titre court et percutant (max 60 caractères)
- Sous-titre explicatif en 1-2 phrases
- Bouton avec action claire ("Prendre RDV", "Découvrir")

#### 2. À Propos
**Contenu :**
- **Titre de section**
- **Description** : Histoire et mission du centre
- **Points clés** : Valeurs et engagements
- **Image** : Photo du centre ou équipe

**Structure recommandée :**
```
## Notre Mission
Texte sur la mission...

## Nos Valeurs
- Excellence médicale
- Accueil personnalisé
- Innovation technologique
```

#### 3. Services Médicaux
**Gestion par liste :**
- **Ajouter un service** : Bouton "+ Add Service"
- **Titre** : Nom du service
- **Description** : Détails du service
- **Icône** : Sélection dans la liste
- **Image** : Photo illustrative

**Services suggérés :**
- Radiologie générale
- Mammographie 3D
- IRM et Scanner
- Échographie
- Consultation spécialisée

#### 4. Départements
**Organisation par spécialité :**
- **Nom du département**
- **Chef de service**
- **Description** des activités
- **Contact** spécifique
- **Image** du département

#### 5. Équipe Médicale
**Profils des médecins :**
- **Photo** professionnelle
- **Nom et prénom**
- **Spécialité**
- **Expérience** et formation
- **Disponibilités**

**Format recommandé :**
```
Dr. [Nom] [Prénom]
Spécialité : [Spécialité]
Expérience : [X] années
Formation : [Université, Année]
```

#### 6. FAQ (Questions Fréquentes)
**Structure par question :**
- **Question** : Phrase claire et directe
- **Réponse** : Explication détaillée
- **Catégorie** : Groupement logique

**Catégories suggérées :**
- Rendez-vous et consultations
- Examens et préparations
- Tarifs et remboursements
- Accès et localisation

#### 7. Footer
**Informations de contact :**
- **Adresse** complète
- **Téléphone** principal
- **Email** de contact
- **Horaires** d'ouverture
- **Liens utiles** (mentions légales, etc.)

## 📰 Gestion des Articles Scientifiques

### Accès aux Articles
- **Menu** : "📰 Articles"
- **URL** : `/admin/articles`
- **Onglet dédié** dans l'éditeur de contenu

### Créer un Nouvel Article

#### 1. Informations de Base
- **Titre** : Nom de l'article (max 100 caractères)
- **Résumé** : Description courte (2-3 phrases)
- **Auteur** : Nom du médecin/auteur
- **Date de publication** : Date de mise en ligne

#### 2. Contenu Principal
- **Éditeur de texte riche**
- **Support Markdown** pour le formatage
- **Prévisualisation** en temps réel
- **Structure** recommandée :

```markdown
## Introduction
Contexte et objectif de l'article...

## Méthodes
Description des techniques utilisées...

## Résultats
Données et observations...

## Conclusion
Synthèse et perspectives...

## Références
[1] Auteur, Titre, Journal, Année
```

#### 3. Médias d'Illustration
- **Image principale** : Photo d'accroche
- **Vidéo optionnelle** : Démonstration
- **Images additionnelles** : Graphiques, schémas

#### 4. Métadonnées
- **Catégorie** : Technologie, Recherche, Cas clinique
- **Mots-clés** : Pour le référencement
- **Statut** : Publié ou Brouillon
- **Article vedette** : Mise en avant sur la page

### Modifier un Article Existant

#### Actions Disponibles
- **Éditer** : Modification du contenu
- **Dupliquer** : Créer une copie
- **Supprimer** : Suppression définitive
- **Changer le statut** : Publié ↔ Brouillon

#### Bonnes Pratiques
- **Sauvegardez régulièrement** pendant l'édition
- **Vérifiez la prévisualisation** avant publication
- **Testez sur mobile** pour la lisibilité
- **Ajoutez des images** pour illustrer

## 🖼️ Gestion des Médias

### Types de Fichiers Supportés

#### Images
- **Formats** : JPG, JPEG, PNG, WebP
- **Taille max** : 10 MB
- **Résolution recommandée** : 1920x1080px
- **Compression** : Automatique vers WebP

#### Vidéos
- **Formats** : MP4, WebM, AVI
- **Taille max** : 10 MB
- **Durée recommandée** : < 2 minutes
- **Qualité** : 720p minimum

### Processus d'Upload

#### 1. Sélection du Fichier
- Cliquer sur "Choose File" ou glisser-déposer
- Vérifier le type et la taille
- Attendre la validation

#### 2. Upload et Traitement
- **Progression** affichée en temps réel
- **Compression automatique** des images
- **Génération d'URL** unique
- **Stockage** dans `/public/uploads/`

#### 3. Intégration
- **URL générée** automatiquement
- **Copier-coller** dans le contenu
- **Prévisualisation** immédiate

### Organisation des Médias

#### Structure des Dossiers
```
public/uploads/
├── images/          # Images générales
├── articles/        # Images d'articles
├── doctors/         # Photos d'équipe
├── departments/     # Photos de services
└── gallery/         # Galerie publique
```

#### Nommage des Fichiers
- **Format automatique** : `nom-original_timestamp.ext`
- **Caractères spéciaux** supprimés
- **Espaces** remplacés par des tirets
- **Majuscules** converties en minuscules

## 📊 Analytics et Suivi

### Types de Données Collectées

#### Visites et Navigation
- **Pages vues** par URL
- **Sessions** utilisateur
- **Durée** de visite
- **Source** de trafic

#### Engagement du Contenu
- **Articles lus** avec titre
- **Formulaires soumis** avec coordonnées
- **Médias consultés**
- **Temps** passé sur chaque page

#### Activité Administrative
- **Nouveaux articles** créés
- **Médias uploadés**
- **Modifications** de contenu
- **Connexions** admin

### Métriques Détaillées

#### Dashboard Analytics
- **Visites totales** avec évolution mensuelle
- **Utilisateurs uniques** par période
- **Pages populaires** avec classement
- **Activité récente** chronologique
- **Performance des articles** (vues, engagement)

#### Rapports Disponibles
- **Rapport quotidien** : Activité du jour
- **Rapport hebdomadaire** : Tendances sur 7 jours
- **Rapport mensuel** : Vue d'ensemble du mois
- **Rapport annuel** : Statistiques de l'année

### Utilisation des Analytics

#### Interprétation des Données
- **Croissance positive** : +X% = bonne performance
- **Pages populaires** : Contenu qui fonctionne
- **Articles lus** : Engagement des visiteurs
- **Formulaires** : Conversion en leads

#### Actions Basées sur les Données
- **Contenu populaire** : Développer le sujet
- **Pages peu visitées** : Améliorer le référencement
- **Articles non lus** : Optimiser les titres
- **Abandons** : Analyser les points de sortie

## 🔧 Maintenance et Dépannage

### Tâches Régulières

#### Quotidiennes
- **Vérifier** les nouvelles soumissions de contact
- **Modérer** les commentaires si activés
- **Surveiller** les performances du site
- **Sauvegarder** les modifications importantes

#### Hebdomadaires
- **Analyser** les rapports de performance
- **Mettre à jour** le contenu si nécessaire
- **Vérifier** les liens et médias
- **Nettoyer** les fichiers inutilisés

#### Mensuelles
- **Sauvegarde complète** des données
- **Analyse** des tendances d'audience
- **Mise à jour** des informations de contact
- **Révision** du contenu obsolète

### Problèmes Courants

#### Le site ne se charge pas
1. **Vérifier** que le serveur est démarré
2. **Contrôler** la console pour erreurs
3. **Redémarrer** le serveur si nécessaire
4. **Vérifier** les logs d'erreur

#### Upload de fichiers échoue
1. **Vérifier** la taille du fichier (< 10MB)
2. **Contrôler** le format (JPG, PNG, MP4)
3. **Vérifier** les permissions du dossier uploads/
4. **Tester** avec un fichier plus petit

#### Analytics ne s'affichent pas
1. **Effacer** le cache du navigateur
2. **Cliquer** sur "Add Sample Data"
3. **Vérifier** la console JavaScript
4. **Redémarrer** l'application

#### Problèmes de connexion admin
1. **Vérifier** les identifiants
2. **Effacer** les cookies du site
3. **Tester** en navigation privée
4. **Vérifier** la session serveur

### Logs et Debug

#### Console du Navigateur
- **F12** → Onglet Console
- **Erreurs JavaScript** affichées
- **Requêtes réseau** dans l'onglet Network
- **LocalStorage** dans l'onglet Application

#### Logs du Serveur
- **Terminal** du serveur Node.js
- **Messages d'erreur** détaillés
- **Requêtes HTTP** loggées
- **Uploads** de fichiers trackés

#### Analytics Locales
- **LocalStorage** : `bic_analytics_*`
- **Données** de tracking
- **Activité** récente
- **Métriques** calculées

## 📞 Support et Assistance

### Ressources Disponibles
- **Documentation** complète dans README.md
- **Code source** commenté
- **Exemples** de contenu
- **Templates** d'articles

### Contact Support
- **Email** : support@bicmedical.com
- **Documentation** : Consultez d'abord les guides
- **Issues** : Reportez les bugs détaillés
- **Feature requests** : Proposez les améliorations

### Formation
- **Tutoriels** vidéo (à venir)
- **Webinaires** mensuels (à venir)
- **Documentation** interactive (à venir)
- **Support** personnalisé (sur demande)

---

**Version du Guide** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Compatible avec** : BIC Medical Center v1.0.0

