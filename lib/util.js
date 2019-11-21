const path = require("path");

module.exports = {
  // get absolute path to cwd
  cwdPath() {
    const argvs = Array.prototype.slice.call(arguments);
    argvs.unshift(process.cwd());
    return path.join.apply(path, argvs);
  },

  // get absolute path to __dirname
  relPath: function(p) {
    const argvs = Array.prototype.slice.call(arguments);
    argvs.unshift(__dirname);
    return path.join.apply(path, argvs);
  },

  // test if the path is a directory
  isDirectory(file) {
    try {
      return fs.statSync(file).isDirectory();
    } catch (e) {
      return false;
    }
  }
};
