#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDependencies() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const devDeps = packageJson.devDependencies || {};
  const requiredDeps = [
    'jest',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    'jest-environment-jsdom'
  ];
  
  const missingDeps = requiredDeps.filter(dep => !devDeps[dep]);
  
  if (missingDeps.length > 0) {
    log('Missing test dependencies:', 'yellow');
    missingDeps.forEach(dep => log(`  - ${dep}`, 'yellow'));
    log('\nInstalling missing dependencies...', 'blue');
    
    try {
      execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' });
      log('Dependencies installed successfully!', 'green');
    } catch (error) {
      log('Failed to install dependencies:', 'red');
      log(error.message, 'red');
      process.exit(1);
    }
  }
}

function runTestCommand(command) {
  try {
    log(`Running: npm test ${command}`, 'blue');
    execSync(`npm test ${command}`, { stdio: 'inherit', cwd: process.cwd() });
  } catch (error) {
    log(`Test command failed: ${command}`, 'red');
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args.length > 0 ? args.join(' ') : '';
  
  log('🧪 WordPress-Gatsby Test Suite', 'blue');
  log('================================', 'blue');
  
  // Check and install dependencies
  checkDependencies();
  
  // Run the specified test command
  if (command.includes('coverage')) {
    log('Running tests with coverage...', 'blue');
    runTestCommand('-- --coverage --passWithNoTests');
  } else if (command.includes('watch')) {
    log('Running tests in watch mode...', 'blue');
    runTestCommand('-- --watch --passWithNoTests');
  } else {
    log('Running all tests...', 'blue');
    runTestCommand('-- --passWithNoTests');
  }
  
  log('\n✅ Tests completed!', 'green');
}

if (require.main === module) {
  main();
}

module.exports = { checkDependencies, runTestCommand };