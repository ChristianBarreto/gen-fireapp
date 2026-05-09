Requirements:
- Git
- Node.js 18 or higher (recommended to have nvm to switch between node versions)
- npm

Clone repo and install dependencies:
`git clone <repo_url>`
`npm install`

Install Firebase CLI:
- npm install -g firebase-tools

`firebase init`
`firebase use`

Run local server:
Functions (back end)
`cd functions `
`npm run serve`

App (front end)
`npm start`

Create your schema.json file in the functions directory. (See schema.example.json for an example of how to structure your schema.json file.)

Deploy to Firebase:
`npm run deploy` 

Deploy will generate the firestore indexes for you. 