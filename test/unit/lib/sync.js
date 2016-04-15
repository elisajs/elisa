//imports
const fs = require("fs");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const sync = require("../../../dist/es5/nodejs/elisa/lib/sync").default;

//suite
suite("sync", function() {
  test("sync(fn) : object", function() {
    sync(function(done) {
      fs.readdir("test/unit/", function(error, files) {
        done(undefined, "the value");
      });
    }).must.be.eq("the value");
  });

  test("sync(fn) throws error", function() {
    sync.must.raise(Error, [function(done) {
      fs.readdir("unknown", function(error, files) {
        done(error);
      });
    }]);
  });
})();
