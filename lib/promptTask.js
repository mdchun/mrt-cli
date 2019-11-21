const inquirer = require("inquirer");
const choices = Object.keys(require("./repos"));

module.exports = (name = "app") => {
  return inquirer.prompt([
    {
      name: "name",
      message: "project name",
      default: name
    },
    {
      type: "list",
      name: "type",
      message: "select project type",
      choices,
      default: choices[0]
    }
  ]);
};
