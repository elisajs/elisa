//imports
const assert = require("assert");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Driver = require("../../../dist/es5/nodejs/elisa").Driver;

//suite
suite("Driver", function() {
  suite("#constructor()", function() {
    test("constructor(name)", function() {
      var drv = new Driver("MyTest");
      drv.name.must.be.eq("MyTest");
      drv.aliases.must.be.eq([]);
    });

    test("constructor(name, alias)", function() {
      var drv = new Driver("MyTest", "MyAlias");
      drv.name.must.be.eq("MyTest");
      drv.aliases.must.be.eq(["MyAlias"]);
    });

    test("constructor(name, aliases)", function() {
      var drv = new Driver("MyTest", ["Alias1", "Alias2"]);
      drv.name.must.be.eq("MyTest");
      drv.aliases.must.be.eq(["Alias1", "Alias2"]);
    });
  });

  suite("#register()", function() {
    test("register(drv)", function() {
      var drv = new Driver("MyDriver", ["alias1", "alias2"]);
      Driver.register(drv);
    });
  });

  suite("#getDriver()", function() {
    var drv;

    init({title: "Register driver"}, function() {
      Driver.register((drv = new Driver("TheDriver", "TheAlias")));
    });

    test("getDriver(name) : Driver", function() {
      Driver.getDriver("thedriver").must.be.same(drv);
    });

    test("getDriver(alias) : Driver", function()  {
      Driver.getDriver("thealias").must.be.same(drv);
    });

    test("getDriver(name) : undefined", function() {
      assert(Driver.getDriver("unknown") === undefined);
    });
  });
})();
