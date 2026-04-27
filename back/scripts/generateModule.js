#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [,, entity, plural] = process.argv;

if (!entity || !plural) {
  console.error('❌ Usage: npm run generate <entity> <plural>');
  process.exit(1);
}

const basePath = path.join(process.cwd(), 'src/modules', plural);

const folders = ['controllers', 'models', 'schemas', 'services'];

const files = [
  {
    folder: 'controllers',
    name: `${entity}.controller.js`,
    content: `export class ${capitalize(entity)}Controller {}\n`,
  },
  {
    folder: 'models',
    name: `${entity}.model.js`,
    content: `export const ${entity}Model = {};\n`,
  },
  {
    folder: 'schemas',
    name: `${entity}.schema.js`,
    content: `export const ${entity}Schema = {};\n`,
  },
  {
    folder: 'services',
    name: `${entity}.service.js`,
    content: `export class ${capitalize(entity)}Service {}\n`,
  },
];

folders.forEach((folder) => {
  fs.mkdirSync(path.join(basePath, folder), { recursive: true });
});

files.forEach(({ folder, name, content }) => {
  const filePath = path.join(basePath, folder, name);
  fs.writeFileSync(filePath, content);
});

console.log(`✅ Module "${plural}" created successfully`);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}