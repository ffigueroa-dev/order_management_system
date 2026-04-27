#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const [,, entity, plural] = process.argv;

if (!entity || !plural) {
  console.error('❌ Usage: npm run generate <entity> <plural>');
  process.exit(1);
}

const basePath = path.join(process.cwd(), 'src/modules', plural);

const folders = ['controllers', 'models', 'schemas', 'services'];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

folders.forEach((folder) => {
  fs.mkdirSync(path.join(basePath, folder), { recursive: true });
});


fs.writeFileSync(
  path.join(basePath, 'controllers', `${entity}.controller.js`),
  `export const ${entity}Controller = {};\n`
);

fs.writeFileSync(
  path.join(basePath, 'models', `${entity}.model.js`),
  `export const ${capitalize(entity)} = {};\n`
);

fs.writeFileSync(
  path.join(basePath, 'schemas', `${entity}.schema.js`),
  ''
);

fs.writeFileSync(
  path.join(basePath, 'services', `${entity}.service.js`),
  `export class ${capitalize(entity)}Service {}\n`
);

console.log(`✅ Module "${plural}" created successfully`);