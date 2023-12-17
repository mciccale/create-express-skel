#!/usr/bin/env node

import { stat, mkdir, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { program } from 'commander';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name('create-express-skel')
  .version('1.0.1')
  .option('<project-name>', 'name of the project')
  .option('--ts', 'use TypeScript template (default JavaScript)')
  .option('--eslint', 'configure ESlint')
  .option('--no-eslint', 'do not configure ESlint')
  .option('--git', 'initialize Git repository')
  .option('--no-git', 'do not initialize Git repository');

async function createProject(projectName, useTs, eslint, initializeGit) {
  const skeletonDir = useTs ? 'skel-ts' : 'skel-js';
  const targetPath = join(process.cwd(), projectName);

  try {
    if (await stat(targetPath).catch(() => false)) {
      console.error(`Directory ${projectName} already exists.`);
      process.exit(1);
    }

    await mkdir(targetPath);
    await cp(join(__dirname, `../${skeletonDir}`), targetPath, {
      recursive: true,
    });

    process.chdir(targetPath);

    execSync('npm install', { stdio: 'inherit' });

    if (eslint) {
      console.log('\nConfigure ESlint\n');
      execSync('npm init @eslint/config', { stdio: 'inherit' });
    }

    if (initializeGit) {
      execSync('git init', { stdio: 'ignore' });
      execSync('git add .', { stdio: 'ignore' });
      execSync('git commit -m "initial commit by create-express-app"', {
        stdio: 'ignore',
      });
    }

    console.log(
      `\nProject ${projectName} created successfully.\n\n\t$ cd ${projectName}\n\t$ npm run dev\n`
    );
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
}

async function main() {
  program.parse(process.argv);
  let options = program.opts();

  let projectName = program.args[0];
  let useTs = options.ts;
  let eslint = options.eslint;
  let initializeGit = options.git;

  const questions = [];

  if (!projectName) {
    questions.push({
      name: 'projectName',
      type: 'input',
      message: 'Enter the name of your project:',
      default: 'express-skel',
      validate: (input) => (input ? true : 'Project name cannot be empty.'),
    });
  }

  if (useTs === undefined) {
    questions.push({
      name: 'templateType',
      type: 'list',
      message: 'Choose the template for your project:',
      choices: ['JavaScript', 'TypeScript'],
      default: 'JavaScript',
    });
  }

  if (eslint === undefined) {
    questions.push({
      name: 'configureESlint',
      type: 'list',
      message: 'Would you like to use ESlint:',
      choices: ['Yes', 'No'],
      default: 'Yes',
    });
  }

  if (initializeGit === undefined) {
    questions.push({
      name: 'initializeGit',
      type: 'list',
      message: 'Would you like to initialize a Git repository:',
      choices: ['Yes', 'No'],
      default: 'Yes',
    });
  }

  if (questions.length > 0) {
    const answers = await inquirer.prompt(questions);
    projectName = projectName || answers.projectName;
    useTs = useTs !== undefined ? useTs : answers.templateType === 'TypeScript';
    eslint = eslint !== undefined ? eslint : answers.configureESlint === 'Yes';
    initializeGit =
      initializeGit !== undefined
        ? initializeGit
        : answers.initializeGit === 'Yes';
  }

  await createProject(projectName, useTs, eslint, initializeGit);
}

main().catch(() => {
  console.error('Exiting.');
  process.exit(1);
});
