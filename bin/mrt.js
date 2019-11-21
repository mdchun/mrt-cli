#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");
const logger = require("../lib/logger");
program.version(pkg.version, "-v, --version").usage("init [project]");

program
  .command("init [project_name]")
  .alias("i")
  .action((name = "app") => {
    try {
      require("../lib/init")(name);
    } catch (e) {
      logger.error(`no such command:${name}`);
      process.exit(1);
    }
  });

program
  .command("build")
  .alias("b")
  .action(_ => {
    try {
      require("../scripts/build");
    } catch (e) {
      logger.error(e.message || e);
      process.exit(1);
    }
  });

program
  .command("start")
  .alias("s")
  .action(_ => {
    try {
      require("../scripts/start");
    } catch (e) {
      logger.error(e.message || e);
      process.exit(1);
    }
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
