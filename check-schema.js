const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'functions/src', 'schema.json');

try {
  const schemaStr = fs.readFileSync(schemaPath, 'utf8');
  const schema = JSON.parse(schemaStr);
  
  if (!Array.isArray(schema)) {
    throw new Error("Schema must be an array of resources.");
  }

  const validTypes = ["text", "long-text", "number", "date", "date-time", "fk", "file", "image", "boolean"];
  
  const resourceNames = new Set(schema.map(r => r.resource));
  const resourceFieldsMap = {};
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
  // First pass: validate required fields and populate resource map
  schema.forEach((r, index) => {
    if (!r.resource || typeof r.resource !== 'string') throw new Error(`Resource at index ${index} is missing a valid 'resource' string property.`);
    if (!alphanumericRegex.test(r.resource)) throw new Error(`Resource '${r.resource}' at index ${index} contains special characters. Only alphanumeric characters are allowed. Recommended to use camelCase.`);
    
    if (!r.resourceName || typeof r.resourceName !== 'string') throw new Error(`Resource '${r.resource}' is missing a valid 'resourceName' string property.`);
    if (!r.url || typeof r.url !== 'string') throw new Error(`Resource '${r.resource}' is missing a valid 'url' string property.`);
    if (!Array.isArray(r.fields)) throw new Error(`Resource '${r.resource}' is missing a valid 'fields' array.`);
    
    resourceFieldsMap[r.resource] = new Set();
    
    r.fields.forEach((f, fIndex) => {
      if (!f.field || typeof f.field !== 'string') throw new Error(`Resource '${r.resource}' field at index ${fIndex} is missing a valid 'field' string property.`);
      if (!alphanumericRegex.test(f.field)) throw new Error(`Resource '${r.resource}' field '${f.field}' at index ${fIndex} contains special characters. Only alphanumeric characters are allowed.`);
      
      if (!f.name || typeof f.name !== 'string') throw new Error(`Resource '${r.resource}' field '${f.field}' is missing a valid 'name' string property.`);
      if (!f.type || !validTypes.includes(f.type)) throw new Error(`Resource '${r.resource}' field '${f.field}' has an invalid or missing 'type'. Valid types are: ${validTypes.join(', ')}.`);
      if (typeof f.nullable !== 'boolean') throw new Error(`Resource '${r.resource}' field '${f.field}' is missing a valid 'nullable' boolean property.`);
      
      resourceFieldsMap[r.resource].add(f.field);
    });
  });

  // Second pass: Validate FK references
  schema.forEach(r => {
    r.fields.forEach(f => {
      if (f.type === 'fk') {
        if (!f.fkField || typeof f.fkField !== 'string') {
          throw new Error(`Resource '${r.resource}' field '${f.field}' is of type 'fk' but missing a valid 'fkField' string property.`);
        }
        
        // For 'fk' fields, the 'field' property is expected to be the target resource name
        const targetResource = f.field;
        if (!resourceNames.has(targetResource)) {
          throw new Error(`Resource '${r.resource}' field '${f.field}' is an FK, but target resource '${targetResource}' does not exist in the schema.`);
        }
        
        if (!resourceFieldsMap[targetResource].has(f.fkField)) {
          throw new Error(`Resource '${r.resource}' field '${f.field}' is an FK pointing to resource '${targetResource}', but target field '${f.fkField}' does not exist in that resource.`);
        }
      }
    });
  });

  console.log("Schema validation passed successfully!");
} catch (error) {
  console.error("Schema validation failed:", error.message);
  process.exit(1);
}
