import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..');
const parentDir = path.resolve(baseDir, '..');
const stagingDir = path.join(parentDir, 'staging/portfolio-website');
const zipFile = path.join(parentDir, 'portfolio-website.zip');

if (fs.existsSync(path.join(parentDir, 'staging'))) {
  fs.rmSync(path.join(parentDir, 'staging'), { recursive: true, force: true });
}

fs.mkdirSync(stagingDir, { recursive: true });

const ignored = new Set(['node_modules', '.git', '.vite', 'dist', '.DS_Store', 'staging']);

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying project files to staging/portfolio-website...');
copyRecursive(baseDir, stagingDir);

console.log('Compressing staging directory into ZIP...');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}' -DestinationPath '${zipFile}' -Force"`);

console.log('Cleaning up staging directory...');
fs.rmSync(path.join(parentDir, 'staging'), { recursive: true, force: true });

console.log(`\nSuccessfully created: ${zipFile}`);
