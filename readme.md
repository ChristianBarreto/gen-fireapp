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

Create your schema.json file in the functions directory. See below a little snippet:
```json
[
  {
    "resource": "resource1Name",
    "resourceName": "Resource1 Name",
    "url": "url1",
    "fields": [
      {"field": "field", "name": "Name", "type": "type", "nullable": true/false}
    ]
  },
  {
    "resource": "resource2Name",
    "resourceName": "Resource2 Name",
    "url": "url2",
    "fields": [
      {"field": "field2", "name": "Name2", "type": "fk", "fkField": "resource1Name", "nullable": true/false}
    ]
  }
]
```
Where
- "resource": is the name of the resource (singular form, no hyphens)
- "resourceName": is the name of the resource (singular form, with hyphens)
- "url": is the url of the resource
- "fields": is an array of fields
- "field": is the name of the field
- "name": is the name of the field
- "type": is the type of the field
    - "text": short text
    - "long-text": long text
    - "number": number
    - "date": date
    - "date-time": date and time
    - "fk": foreign key
    - "file": file
    - "image": image
    - "boolean": boolean
- "nullable": is a boolean that indicates whether the field is nullable
- "fkField": is the name of the field to use as the foreign key (only for fk type)

(See schema.example.json for an example of how to structure your schema.json file.)

Deploy to Firebase:
`npm run deploy` 

Notes: 
1. Deploy will generate the firestore indexes for you.
2. After deploying, you will need to manually add the security rules to your firebase console.
3. After deploying, you will need to manually add the storage rules to your firebase console.
4. After deploying, Firebase console can take several minutes to update the indexes and sort/filter functionality will not work until the indexes are updated.

