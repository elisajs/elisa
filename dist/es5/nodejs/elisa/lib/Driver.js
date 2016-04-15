"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var cache = {};var 








Driver = function () {







  function Driver(name) {var aliases = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];_classCallCheck(this, Driver);

    if (typeof aliases == "string") aliases = [aliases];


    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "aliases", { value: aliases, enumerable: true });}_createClass(Driver, [{ key: "createConnection", value: function createConnection() 






































    {
      var eliOpts, opts;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length == 1) opts = args[0];else 
      if (args.length >= 2) {;eliOpts = args[0];opts = args[1];}

      if (!eliOpts) eliOpts = { type: "async" };
      if (!eliOpts.type) eliOpts.type = "async";


      return this._createConnection(eliOpts, opts);} }, { key: "_createConnection", value: function _createConnection() 











    {
      throw new Error("Abstract method.");} }, { key: "openConnection", value: function openConnection() 














    {
      var eliOpts, opts, callback, cx;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}


      if (args.length == 1) {
        opts = args[0];} else 
      if (args.length == 2) {
        if (args[1] instanceof Function) {;opts = args[0];callback = args[1];} else {
          ;eliOpts = args[0];opts = args[1];}} else 
      if (args.length >= 3) {
        eliOpts = args[0];opts = args[1];callback = args[2];}


      if (!eliOpts) eliOpts = {};
      if (!opts) throw new TypeError("Connection options expected.");


      cx = this.createConnection(eliOpts, opts);


      if (cx.sync) {
        cx.open();
        return cx;} else 
      if (cx.async) {
        if (!callback) throw new TypeError("Callback expected.");

        cx.open(function (error) {
          if (error) callback(error);else 
          callback(undefined, cx);});}} }], [{ key: "getDriver", value: function getDriver(name) {if (!name) throw new Error("Driver name expected.");return cache[name.toLowerCase()];} }, { key: "register", value: function register(driver) {if (!driver) throw new TypeError("Driver expected.");cache[driver.name.toLowerCase()] = driver;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {for (var _iterator = driver.aliases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var alias = _step.value;cache[alias.toLowerCase()] = driver;}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}} }]);return Driver;}();exports.default = Driver;