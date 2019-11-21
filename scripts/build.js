process.env.NODE_ENV = "production";

const webpack = require("webpack");
const logger = require("../lib/logger");
const buildConfig = require("../config/webpack.config.prod");

function handler(err, stats) {
  if (err) {
    logger.error(err.message || err);
    process.exit(1);
  }
  const info = stats.toJson();

  if (stats.hasErrors()) {
    logger.log(stats.toString("errors-only"));
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    logger.warning(info.warnings);
  }

  logger.log(
    stats.toString({
      colors: true
    })
  );
}

const compiler = webpack(buildConfig);
compiler.run(handler.bind(null));
