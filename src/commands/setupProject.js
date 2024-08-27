import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";


// Define tools for Node.js
const nodeTools = ["ESLint", "Prettier", "TypeScript", "Jest", "Mocha", "Webpack", "Nodemon"];

// Define tools for Python
const pythonTools = ["Flake8", "Black", "Pylint", "Mypy", "Pytest", "isort", "Virtualenv"];

const questions = [
  {
    type: "input", //assigns a string
    name: "projectName",
    message: "What is your project name?",
    validate: (input) => {
        if(input.trim() === ""){
            return "Project name cannot be empty. Please enter a valid name"
        }
        return true
    }
  },
  {
    type: "list", //choose from a list, assigns a single string based on the choices
    name: "projectType",
    message: "What type of project are you creating?",
    choices: ["Node.js", "Python", "Other"],
  },
  {
    type: "confirm", //assigns a boolean type
    name: "gitInit",
    message: "Do you want to initialize a Git repository?",
  },
  {
    //TODO: Change the options available based on the user project type choice
    type: "checkbox", //assigns an array fille with the choices that were chosen
    name: "tools",
    message: "Which tools would you like to configure",
    choices: (answers) =>{
        return answers.projectType === 'Node.js' ? nodeTools : pythonTools
    } 
  },
  { 
    type: "confirm", //assigns a boolean type
    name: "installDependencies",
    message: (answers) =>
      `Should I install common dependecies for ${answers.projectType}?`,
    default: true,
  },
];

export const setupProject = async () => {
  let confirmed = false;
  let answers
  while (!confirmed) {
    answers = await inquirer.prompt(questions);

    //Display selected options using chalk for styling
    console.log(chalk.green("These are the options you've selected:"));
    //Doing this so it looks nicer
    for (const [key, value] of Object.entries(answers)) {
      console.log(`${key}: ${value}`);
    }

    confirmed = (
      await inquirer.prompt({
        type: "confirm",
        name: "confirmation",
        message: "Are you sure you want to proceed?",
      })
    ).confirmation;
  }
    //continue project setup based on the anwsers
    createProjectStructure(answers);

    if (answers.gitInit) {
      initializeGit(answers.projectName);
    }
    if (answers.installDependencies) {
      installDependencies(answers.projectType);
    }
    configureTools(answers.tools, answers.projectType);
};

const createProjectStructure = (answers) => {
  //The root folder will be whatever the root directory of this application is ( process.cwd() )
  const projectPath = path.join(process.cwd(), answers.projectName);
  console.log(projectPath);

  if (!fs.existsSync(projectPath)) {
    //Make main directory
    fs.mkdirSync(projectPath);
    //Create src folder, then tests folder
    fs.mkdirSync(path.join(projectPath, "src"));
    fs.mkdirSync(path.join(projectPath, "tests"));
    //Create readme
    fs.writeFileSync(
      path.join(projectPath, "README.md"),
      `# ${answers.projectName}`
    );

    console.log(
      chalk.green(`Project Structure for ${answers.projectName} created.`)
    );
  }
  else{
    console.log(chalk.red(`ERROR: File with name "${answers.projectName}" already exists in this directory, exiting...`))
  }
};


const initializeGit = (projectName) => {
    execSync
};

const installDependencies = (projectType) => {};

const configureTools = (tools, projectType) => {};


    