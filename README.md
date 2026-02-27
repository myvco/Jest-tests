📦 Jest-tests

Une application React complète avec validation de formulaire, tests unitaires (jest), tests d’intégration (React Testing Library), tests E2E (Cypress), couverture de code et pipeline CI fonctionnelle.

📌 Description du projet

Jest-tests est une application React avec :

✔ Un formulaire d’inscription
✔ Validation avancée (âge, email, postCode, identité, town)
✔ Tests unitaires pour la logique métier
✔ Tests d’intégration pour les interactions React
✔ Tests E2E avec Cypress
✔ Couverture maximale du code
✔ Pipeline de CI avec Codecov

🧱 Démarrage rapide

1️⃣ Clone le dépôt

git clone https://github.com/myvco/Jest-tests.git
cd Jest-tests

2️⃣ Installer les dépendances

npm install

3️⃣ Lancer l’application en mode développement

npm run dev

4️⃣ Ouvrir le navigateur
👉 http://localhost:5173

⚙️ Scripts disponibles
🧪 Tests
Script	Description
npm run test	Lance les tests unitaires avec couvertures
npm run coverage	Génère un rapport coverage HTML
npm run cypress:run	Exécute les tests E2E

Exemple :

🧪 Tests unitaires (jest)

Les tests unitaires sont situés dans :

📍 tests/

Ils couvrent :

✅ validateAge (âge, invalid date, unrealistic, future, <18)
✅ validatePostCode
✅ validateIdentity (types, XSS, invalid chars)
✅ validateEmail
✅ validateTown

Vitest génère un rapport de couverture en :

📍 coverage/

🎭 Mocks expliqués

Pour isoler les tests, certains modules sont mockés :

createUser → contrôlé dans chaque test

getUsers → valeur par défaut vide

Dans chaque test, on peut surcharger :

getUsers.mockResolvedValue([{ email: "TEST@example.com" }]);

Cela simule un scénario d’erreur (email already exists).

🌐 Tests E2E (Cypress)

🔹 Cypress teste l’application complète dans le navigateur réel.

Exemple scénario :

✔ Home page
✔ Navigation vers Form
✔ Submit valide
✔ Validation error backend simuler via cy.intercept()

Exemple d’interception pour forcer erreur backend
cy.intercept("POST", "https://jsonplaceholder.typicode.com/users", {
statusCode: 400,
body: { message: "Email already exists" }
}).as("createUserError");

cy.get('button[type="submit"]').click();
cy.wait("@createUserError");
cy.contains(/email already exists/i).should("be.visible");

🤖 Pipeline CI (GitHub Actions + Codecov)
📌 Objectif

✔ Exécuter les tests unitaires
✔ Générer la couverture
✔ Publier le rapport sur Codecov

Exemple de workflow : .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
test:
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm test -- --coverage
      - run: npm run coverage
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true

🚀 À chaque push/PR, Codecov affiche le coverage à jour.

📊 Couverture de code

Vitest génère :

✔ text summary
✔ HTML report (coverage/index.html)
✔ LCOV (coverage/lcov.info)

Codecov utilise lcov pour afficher :

📉 Coverage global
📉 Coverage par fichier
📉 Branch coverage

💡 Assurez-vous que vitest.config.js inclut les bons patterns :

coverage: {
provider: 'v8',
reporter: ['text', 'html', 'lcov'],
include: [
'src/utils/**/*.js',
'src/component/**/*.jsx'
],
exclude: [
'src/main.jsx',
'src/App.jsx'
]
}

🔗 Package NPM : https://www.npmjs.com/package/manon-ci-cd-ynov