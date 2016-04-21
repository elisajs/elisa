//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Database = require("../../../dist/es5/nodejs/elisa/lib/Database").default;

//suite
suite("Database", function() {
  var db;

  init({title: "Create Database instance"}, function() {
    db = new Database({}, "mydb");
  });

  suite("#destructureDataStoreQn()", function() {
    test("destructureDataStoreQn(qn) - sch.ds", function() {
      db.destructureDataStoreQn("sch.ds").must.be.eq(["sch", "ds"]);
    });

    test("destructureQn(qn) - sch", function() {
      db.destructureDataStoreQn.must.raise("Invalid qualified name.", ["sch"]);
    });

    test("destructureQn(qn) - sch.", function() {
      db.destructureDataStoreQn.must.raise("Invalid qualified name.", ["sch."]);
    });

    test("destructureQn(qn) - .ds", function() {
      db.destructureDataStoreQn.must.raise("Invalid qualified name.", [".ds"]);
    });
  });
})();
