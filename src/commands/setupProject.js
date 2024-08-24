import inquirer from "inquirer";
import fs from 'fs'
import path from 'path'
import chalk from "chalk";
import { execSync } from "child_process";

const questions = [
    {
        type: 'input', //assigns a string
        name: 'projectName',
        message: 'What is your project name?',
    },
    {
        type: 'list', //choose from a list, assigns a single string based on the choices
        name: 'projectType',
        message: 'What type of project are you creating?',
        choices: ['Node.js','Python','Other'],
    },
    {
        type: 'confirm', //assigns a boolean type
        name: 'gitInit',
        message: 'Do you want to initialize a Git repository?'
    },
    {
        type: 'checkbox', //assigns an array fille with the choices that were chosen
        name: 'tools',
        message: 'Which tools would you like to configure',
        choices: ['ESLint', 'Prettier', 'TypeScript']
    },
    { 
        type: 'confirm',  //assigns a boolean type
        name: 'installDependencies',
        message: (anwsers) => `Should I install common dependecies for ${anwsers.projectType}?`,
        default: true
    }
]

export const setupProject = async () => {
    const anwsers = await inquirer.prompt(questions)

    //Display selected options using chalk for styling
    console.log(chalk.green('Project Setup options:'))
    console.log(anwsers)

    //continue project setup based on the anwsers
    createProjectStructure(anwsers)

    if(anwsers.gitInit){
        initializeGit(anwsers.projectName)
    }
    if(anwsers.installDependencies){
        installDependencies(anwsers.projectType)
    }
    configureTools(anwsers.tools,anwsers.projectType)
}


const createProjectStructure = (anwsers) => {

}

const initializeGit = (projectName) => {

}

const installDependencies = (projectType) => {

}

const configureTools = (tools, projectType) => {

}