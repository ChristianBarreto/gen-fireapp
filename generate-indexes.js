const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'functions/src', 'schema.json');
const outputPath = path.join(__dirname, 'firestore.indexes.json');

try {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const indexes = [];

  for (const resource of schema) {
    const collectionGroup = resource.resource;
    
    if (resource.fields && Array.isArray(resource.fields)) {
      for (const fieldDef of resource.fields) {
        // Option to skip indexing if defined in schema in the future
        if (fieldDef.index === false) {
          continue;
        }

        indexes.push({
          collectionGroup: collectionGroup,
          queryScope: "COLLECTION",
          fields: [
            {
              fieldPath: fieldDef.field,
              order: "ASCENDING"
            },
            {
              fieldPath: "timestamp",
              order: "DESCENDING"
            }
          ]
        });
      }
    }
  }

  const output = {
    indexes: indexes,
    fieldOverrides: []
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Successfully generated firestore.indexes.json with ${indexes.length} indexes based on schema.json.`);
} catch (error) {
  console.error('Error generating indexes:', error);
  process.exit(1);
}
