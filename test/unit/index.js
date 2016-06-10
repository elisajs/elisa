//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const pkg = require("../../dist/es5/nodejs/elisa");

//suite
suite("API", function() {
  test("Collection", function() {
    pkg.Collection.must.be.instanceOf(Function);
  });

  test("CollectionQuery", function() {
    pkg.CollectionQuery.must.be.instanceOf(Function);
  });

  test("Connection", function() {
    pkg.Connection.must.be.instanceOf(Function);
  });

  test("Database", function() {
    pkg.Database.must.be.instanceOf(Function);
  });

  test("Driver", function() {
    pkg.Driver.must.be.instanceOf(Function);
  });

  test("Namespace", function() {
    pkg.Namespace.must.be.instanceOf(Function);
  });

  test("Server", function() {
    pkg.Server.must.be.instanceOf(Function);
  });

  test("Store", function() {
    pkg.Store.must.be.instanceOf(Function);
  });
})();
