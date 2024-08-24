#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk'

const program = new Command();

program 
    .version('1.0.0')
    .description('My CLI Tool')

program 
    .command('greet <name>')
    .description('Greet a person by name')
    .action((name) =>{console.log(chalk.green(`Hello, ${name}!`))}
    )
    
program.parse(process.argv)



