"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _class = function () {

















  function _class(database, name, opts) {_classCallCheck(this, _class);
    Object.defineProperty(this, "database", { value: database, enumerable: true });
    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "connection", { value: database.connection });
    Object.defineProperty(this, "sync", { value: database.sync });
    Object.defineProperty(this, "async", { value: database.async });
    Object.defineProperty(this, "driver", { value: database.connection.driver });}_createClass(_class, [{ key: "getQn", value: function getQn(







































    name) {
      return this.name + "." + name;} }, { key: "getStore", value: function getStore(


























    name, opts) {
      return new (this.connection.getStoreClass())(this, name, opts);} }, { key: "hasStore", value: function hasStore(













    name, callback) {
      if (this.sync) {
        return !!this.findStore(name);} else 
      {
        this.findStore(name, function (error, store) {
          if (error) callback(error);else 
          callback(undefined, !!store);});}} }, { key: "findStore", value: function findStore(

















    name) {var _this = this;
      var opts, callback;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this._findStore(name, opts, done);});else 
      this._findStore(name, opts, callback);} }, { key: "_findStore", value: function _findStore(











    name, opts, callback) {
      callback(undefined, new (this.connection.getStoreClass())(this, name, opts));} }, { key: "getCollection", value: function getCollection(











    name, opts) {
      return new (this.connection.getCollectionClass())(this, name, opts);} }, { key: "hasCollection", value: function hasCollection(













    name, callback) {
      if (this.sync) {
        return !!this.findCollection(name);} else 
      {
        this.findCollection(name, function (error, coll) {
          if (error) callback(error);else 
          callback(undefined, !!coll);});}} }, { key: "findCollection", value: function findCollection(

















    name) {var _this2 = this;
      var opts, callback;for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this2._findCollection(name, opts, done);});else 
      this._findCollection(name, opts, callback);} }, { key: "_findCollection", value: function _findCollection(











    name, opts, callback) {
      callback(undefined, new (this.connection.getCollectionClass())(this, name, opts));} }, { key: "client", get: function get() {return this.connection.client;} }, { key: "db", get: function get() {return this.database;} }, { key: "qualifiedName", get: function get() {return this.name;} }, { key: "qn", get: function get() {return this.qualifiedName;} }, { key: "fullQualifiedName", get: function get() {return this.db.name + "." + this.name;} }, { key: "fqn", get: function get() {return this.fullQualifiedName;} }]);return _class;}();exports.default = _class;