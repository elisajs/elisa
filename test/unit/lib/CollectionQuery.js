//imports
const assert = require("assert");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const spy = require("justo-spy");
const Collection = require("../../../dist/es5/nodejs/elisa").Collection;
const CollectionQuery = require("../../../dist/es5/nodejs/elisa").CollectionQuery;

//suite
suite("CollectionQuery", function() {
  var q;

  init("*", function() {
    q = spy(new CollectionQuery(new Collection({}, "coll")), ["run() {}"]);
  });

  suite("#project()", function() {
    test("project(field)", function() {
      q.project("abc").must.be.same(q);
      q.fields.must.be.eq({
        abc: "abc"
      });
    });

    test("project(fields : ...string[])", function() {
      q.project("abc", "def").must.be.same(q);
      q.fields.must.be.eq({
        abc: "abc",
        def: "def"
      });
    });

    test("project(fields : object)", function() {
      q.project({x: "a", y: "b"}).must.be.same(q);
      q.fields.must.be.eq({
        x: "a",
        y: "b"
      });
    });
  });

  suite("#limit()", function() {
    test("limit(0)", function() {
      q.limit(0).must.be.same(q);
      q.maxLimit.must.be.eq(0);
    });

    test("limit(123)", function() {
      q.limit(123).must.be.same(q);
      q.maxLimit.must.be.eq(123);
    });

    test("limit(undefined)", function() {
      q.limit(undefined).must.be.same(q);
      q.must.not.have("maxLimit");
    });

    test("limit(null)", function() {
      q.limit(null).must.be.same(q);
      q.must.not.have("maxLimit");
    });
  });

  suite("#offset()", function() {
    test("offset(0)", function() {
      q.offset(0).must.be.same(q);
      q.skip.must.be.eq(0);
    });

    test("offset(123)", function() {
      q.offset(123).must.be.same(q);
      q.skip.must.be.eq(123);
    });

    test("offset(undefined)", function() {
      q.offset(undefined).must.be.same(q);
      q.must.not.have("skip");
    });

    test("offset(null)", function() {
      q.offset(null).must.be.same(q);
      q.must.not.have("skip");
    });
  });

  suite("sort()", function() {
    test("sort(field)", function() {
      q.sort("x").must.be.same(q);
      q.order.must.be.eq({x: "ASC"});
    });

    test("sort(fields : object)", function() {
      q.sort({a: "ASC"}).must.be.same(q);
      q.order.must.be.eq({a: "ASC"});
    });

    test("sort(...fields : string[])", function() {
      q.sort("x", "y").must.be.same(q);
      q.order.must.be.eq({x: "ASC", y: "ASC"});
    });
  });

  suite("#filter()", function() {
    test("filter(cond)", function() {
      q.filter({x: 5}).must.be.same(q);
      assert(q.condition !== undefined);
      q.condition.must.be.eq({x: 5});
    });

    test("filter(cond) - several times", function() {
      q.filter({x: 5}).filter({y: 6});
      assert(q.condition !== undefined);
      q.condition.must.be.eq({y: 6});
    });
  });

  suite("#find()", function() {
    test("find(callback)", function() {
      q.find(function() {});
      q.spy.called("run()").must.be.eq(1);
    });

    test("find(cond, callback)", function() {
      q.find({x: 1}, function() {});
      q.spy.called("run()").must.be.eq(1);
      q.condition.must.be.eq({x: 1});
    });

    test("find(cond, opts, callback)", function() {
      q.find({x: 1}, {}, function() {});
      q.spy.called("run()").must.be.eq(1);
      q.condition.must.be.eq({x: 1});
    });
  });
})();
