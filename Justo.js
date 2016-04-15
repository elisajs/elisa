//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;

//catalog
catalog.workflow({name: "build", desc: "Build the package"}, function() {
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  jshint("Best practices and grammar", {
    output: true,
    src: ["index.js", "lib/"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/elisa/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/elisa/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/elisa/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "elisajs",
    src: "dist/es5/nodejs/elisa/"
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
