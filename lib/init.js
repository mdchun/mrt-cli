module.exports = async pro_name => {
  const ora = require("ora");
  const choices = require("./repos");
  const promiseify = require("promiseify");
  const download = require("download-git-repo");
  const promptTask = require("./promptTask");
  const logger = require("./logger");
  const spinner = ora("initializing...");

  const { name, type } = await promptTask(pro_name);
  const repo = choices[type];

  if (!repo) {
    return logger.error("To be perfect...");
  }

  spinner.start();

  try {
    await promiseify(
      download(repo, name, err => {
        if (err) {
          spinner.fail(`${err.message}`);
        } else {
          logger.success("Project initializing was successful!");
          spinner.succeed("successfully");
        }
      })
    );
  } catch (e) {
    spinner.fail(
      `project '${name}' initializing failed. You may not have github access`
    );
  }
};
