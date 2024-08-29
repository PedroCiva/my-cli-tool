import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { exec, execSync } from "child_process";
import { cwd } from "process";

// Define tools for Node.js using key values pairs (tool name: install command)
//Using --prefix . will force npm to install the packages on the desired path (since in our case (dev) we already have node_modules folder set up on a parent directory)
const usePrefix = usePrefix? '--prefix .' : ''

const nodeTools = {
  ESLint: `npm install eslint ${usePrefix} --save-dev` ,
  Prettier: `npm install prettier ${usePrefix} --save-dev`,
  TypeScript: `npm install typescript ${usePrefix} --save-dev`,
  Jest: `npm install jest ${usePrefix} --save-dev`,
  Mocha: `npm install mocha ${usePrefix} --save-dev`,
  Webpack: `npm install webpack ${usePrefix} --save-dev`,
  Nodemon: `npm install nodemon ${usePrefix} --save-dev`,
};

// Define tools for Python using key values pairs (tool name: install command)
const pythonTools = {
  Black: "pip install black",
  Pylint: "pip install pylint",
  Mypy: "pip install mypy",
  Pytest: "pip install pytest",
  isort: "pip install isort",
};

const questions = [
  {
    type: "input", //assigns a string
    name: "projectName",
    message: "What is your project name?",
    validate: (input) => {
      if (input.trim() === "") {
        return "Project name cannot be empty. Please enter a valid name";
      }
      return true;
    },
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
    type: "checkbox", //assigns an array filled with the choices selected by the user
    name: "tools",
    message: "Which tools would you like to configure",
    choices: (answers) => {
      return answers.projectType === "Node.js"
        ? Object.keys(nodeTools)
        : Object.keys(pythonTools);
    },
  },
  /*{ 
    type: "confirm", //assigns a boolean type
    name: "installDependencies",
    message: (answers) =>
      `Should I install common dependecies for ${answers.projectType}?`,
    default: true,
  },*/
];

export const setupProject = async () => {
  let confirmed = false;
  let answers;
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
  if (answers.tools.length > 0) {
    //Check if any tools were selected
    installDependencies(
      answers.projectName,
      answers.projectType,
      answers.tools
    );
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
  } else {
    console.log(
      chalk.red(
        `ERROR: File with name "${answers.projectName}" already exists in this directory, exiting...`
      )
    );
  }
};

//TODO: Run this method in the last place?
const initializeGit = (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);

  //Create git repository and perform first commit
  execSync("git init", { cwd: projectPath, stdio: "inherit" });
  execSync("git add .", { cwd: projectPath, stdio: "inherit" });
  execSync('git commit -m "Initial Commit"', {
    cwd: projectPath,
    stdio: "inherit",
  });
  console.log(chalk.green("Git repository initialized."));
};

//No need to check for project type since this is already being checked via the inquirer
const installDependencies = (projectName, projectType, tools) => {
  let dependencies = tools;
  const projectPath = path.join(process.cwd(), projectName);

  //TODO: Must check if NPM is already installed
  //Use NPM
  if (projectType === "Node.js") {
  }
  //TODO: Must check if PIP is already installed
  //Use PIP
  else if (projectType === "Python") {
  }
  dependencies.forEach((dependency) => {
    console.log(projectPath);
    execSync(nodeTools[dependency], { cwd: projectPath, stdio: "inherit" });
    console.log(chalk.green(`${dependency} has been installed`));
  });

  console.log(chalk.greenBright(`Finished installing dependencies`));
};

const configureTools = (tools, projectType) => {};
