#!/usr/bin/env node
const { readFileSync, writeFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const targets = [
  join(process.cwd(), 'node_modules', 'clipanion', 'lib', 'advanced', 'Cli.js'),
  join(process.cwd(), 'node_modules', 'clipanion', 'lib', 'advanced', 'Cli.mjs'),
];

let patchedAny = false;
for (const file of targets) {
  if (!existsSync(file)) continue;
  let src = readFileSync(file, 'utf8');
  const before = src;
  // Replace the unsafe assignment with a guarded numeric coercion
  src = src.replace(
    /process\.exitCode\s*=\s*await\s*this\.run\(\s*input\s*,\s*context\s*\)\s*;/,
    'const __exit = await this.run(input, context); process.exitCode = (typeof __exit === "number" ? __exit : (Number(__exit) || 0));'
  );
  if (src !== before) {
    writeFileSync(file, src, 'utf8');
    patchedAny = true;
    console.log(`[patch-clipanion-exit] Patched: ${file}`);
  }
}

if (!patchedAny) {
  console.warn('[patch-clipanion-exit] No targets patched (pattern not found).');
}

