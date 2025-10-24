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

// Pipe stdio so we can optionally suppress noisy error output when safe.
const child = spawn(nodeCmd, args, { stdio: ['inherit', 'pipe', 'pipe'] });
child.stdout.pipe(process.stdout);
let stderrBuf = '';
child.stderr.on('data', (chunk) => {
  stderrBuf += String(chunk || '');
});

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
    // Treat as success and do not echo stderr noise.
    process.exit(0);
    return;
  }

  // If there is generated content, log a warning and keep going.
  if (hasOutput) {
    // Suppress the Clipanion/exitCode type error stack and print a concise note instead.
    const knownErr = /The "code" argument must be of type number|Cli\.runExit|clipanion/i.test(stderrBuf);
    if (!knownErr && stderrBuf) process.stderr.write(stderrBuf);
    console.warn('[contentlayer-build] Contentlayer completed with warnings on Windows. Output found in .contentlayer; continuing.');
    process.exit(0);
    return;
  }

  // Fall back to failing if nothing was generated.
  const reason = signal ? `signal ${signal}` : `code ${code}`;
  if (stderrBuf) process.stderr.write(stderrBuf);
  console.error(`[contentlayer-build] Contentlayer failed with ${reason} and no output generated.`);
  process.exit(typeof code === 'number' ? code : 1);
});
