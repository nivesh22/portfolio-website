#!/usr/bin/env node
/*
 * Wrapper to run Contentlayer on Windows without failing due to
 * Clipanion setting a non-numeric process.exitCode. If generation
 * succeeded (documents exist in .contentlayer), continue with exit 0.
 */

const { spawn } = require('node:child_process');
const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');

const projectRoot = process.cwd();
const contentlayerDir = join(projectRoot, '.contentlayer');

const nodeCmd = process.execPath;
const cliPath = join(projectRoot, 'node_modules', 'contentlayer', 'bin', 'cli.cjs');
const args = [cliPath, 'build'];

const child = spawn(nodeCmd, args, { stdio: 'inherit' });

child.on('close', (code, signal) => {
  // Detect whether Contentlayer appears to have generated output
  const hasOutput = existsSync(contentlayerDir) && (() => {
    try {
      const entries = readdirSync(contentlayerDir);
      return Array.isArray(entries) && entries.length > 0;
    } catch (_) {
      return false;
    }
  })();

  if (code === 0) {
    process.exit(0);
    return;
  }

  // If there is generated content, log a warning and keep going.
  if (hasOutput) {
    console.warn('[contentlayer-build] Contentlayer exited non-zero, but output exists in .contentlayer. Continuing.');
    process.exit(0);
    return;
  }

  // Fall back to failing if nothing was generated.
  const reason = signal ? `signal ${signal}` : `code ${code}`;
  console.error(`[contentlayer-build] Contentlayer failed with ${reason} and no output generated.`);
  process.exit(typeof code === 'number' ? code : 1);
});

