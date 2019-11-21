const chalk = require("chalk");
const { log } = console;
const success = chalk.yellowBright;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const info = chalk.bold.green;

const logger = {
  log(msg = "") {
    log(msg);
  },

  success(msg = "") {
    log(success(msg));
  },

  error(err = "error") {
    log(error(err));
  },

  warning(msg = "") {
    log(warning(msg));
  },

  info(msg = "") {
    log(info(msg));
  }
};

module.exports = logger;
