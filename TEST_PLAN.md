#Test Plan – Project UT & IT

## Objectif

Décrire la stratégie de test mise en place pour le projet:

- Les cas couverts par les Unit Tests (UT)
- Les cas couverts par les Integration Tests (IT)
- Les choix techniques

---

# 1.Stratégie Générale

Une stratégie en 2 niveaux :

| Type | Objectif |
|------|----------|
| Unit Tests (UT) | Tester la logique métier isolée |
| Integration Tests (IT) | Tester le comportement utilisateur et l’UI |

---

# 2.Unit Tests (UT)

Les tests unitaires couvrent la logique métier, sans interface React.

##  Fichiers concernés

- `validator.js`
- `module.js`
- `Counter.jsx`

---

##  2.1 validator.js

### Couvert par les UT :

### validateAge
- Date invalide
- Date dans le futur
- Moins de 18 ans
- Exactement 18 ans
- Cas valide

### validatePostCode
- Format invalide
- Format valide

### validateIdentity
- Nom valide
- Nom invalide
- XSS injection
- Caractères interdits

### validateEmail
- Email valide
- Email invalide
- Format incorrect

---

## 2.2 module.js (calculateAge)

- Paramètre manquant
- Champ birth manquant
- Date invalide
- Date avant 1970
- Date future
- Calcul correct avec date injectée
- Gestion anniversaire non encore passé

---

## 2.3 Counter.jsx

- Valeur initiale = 0
- Incrémentation au clic
- Mise à jour du DOM

---

# 3.Integration Tests (IT)

Les tests d’intégration couvrent :

- Interaction utilisateur
- Validation UI
- Affichage des erreurs
- Activation / désactivation du bouton
- Sauvegarde localStorage
- Affichage Toast

---

## Fichier concerné

- `Form.test.jsx`

---

## 3.1 Comportement utilisateur

### Cas couverts :

- Saisie invalide
- Perte focus → affichage erreur
- Correction → disparition erreur
- Bouton disabled si formulaire invalide
- Bouton enabled si formulaire valide

---

## 3.2 Flux complet

- Remplissage correct de tous les champs
- Click Submit
- localStorage.setItem appelé
- Données correctement sauvegardées
- Toast succès affiché
- Reset du formulaire

---

## 3.3 Cas utilisateur chaotique

- Saisies incorrectes puis correction
- Effacement de champ
- Resaisie
- Validation dynamique

---

# 4.Outils utilisés

| Outil | Rôle |
|--------|------|
| Vitest | Framework de test |
| Testing Library | Simulation comportement utilisateur |
| user-event | Simulation réaliste |
| jsdom | DOM virtuel |
| coverage-v8 | Couverture |

---

# 5.Couverture

Objectif :

- 100% des fonctions critiques couvertes
- Toutes les branches métier testées
- Cas nominaux + cas d’erreur

---

# 6.Choix d’architecture test

## Séparer UT et IT

- Les UT garantissent la fiabilité métier
- Les IT garantissent l'expérience utilisateur
- Séparation des responsabilités
- Maintenance facilitée

---

#  Conclusion

La stratégie garantit :

- Robustesse métier
- Fiabilité UX
- Validation comportementale
- Maintenabilité du code

