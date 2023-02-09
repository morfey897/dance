const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
const content = Object.entries(argv).map(([key, value]) => `export const ${key}=${JSON.stringify(value)};`).join('\n');
console.log('>>> generated.ts', content);
fs.writeFileSync(path.join(__dirname, '../src/generated.ts'), content);