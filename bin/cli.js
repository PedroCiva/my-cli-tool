#!/usr/bin/env node

//Load environment variables
import './loadEnv.js';

//Other imports
import { Command } from 'commander';
import { setupProject } from '../src/commands/setupProject.js';


const program = new Command();

program 
    .name('Project-Setup')
    .version('1.0.0')
    .description('CLI tool for setting up new projects')

program 
    .command('init')
    .description('Initialize a new project')
    .action(()=> setupProject()
    )
    


program.parse(process.argv)



