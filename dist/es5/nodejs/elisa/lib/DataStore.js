"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _Namespace = require("./Namespace");var _Namespace2 = _interopRequireDefault(_Namespace);
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 










DataStore = function () {







  function DataStore(base, name, opts) {_classCallCheck(this, DataStore);
    if (base instanceof _Namespace2.default) {
      Object.defineProperty(this, "database", { value: base.db, enumerable: true });
      Object.defineProperty(this, "namespace", { value: base, enumerable: true });} else 
    {
      Object.defineProperty(this, "database", { value: base, enumerable: true });
      Object.defineProperty(this, "namespace", { value: undefined, enumerable: true });}


    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "sync", { value: base.sync });
    Object.defineProperty(this, "async", { value: base.async });

    if (!opts) opts = {};
    Object.defineProperty(this, "inject", { value: opts.inject });}_createClass(DataStore, [{ key: "hasInjection", value: function hasInjection() 























    {
      return !!this.inject;} }, { key: "injectInto", value: function injectInto(











    query) {var opts = arguments.length <= 1 || arguments[1] === undefined ? { overwrite: false } : arguments[1];
      var q;


      if (!query) query = {};


      if (this.inject) {
        if (opts.overwrite) q = query;else 
        q = Object.assign({}, query);
        for (var field in this.inject) {q[field] = this.inject[field];}} else 
      {
        q = query;}



      return q;} }, { key: "hasId", value: function hasId(






























































    id, callback) {var _this = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this._hasId(id, done);});else 
      if (this.async) this._hasId(id, callback);} }, { key: "_hasId", value: function _hasId() 










    {
      throw new Error("Abstract method.");} }, { key: "count", value: function count() 











    {var _this2 = this;
      var opts, callback;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};


      if (this.sync) return (0, _sync2.default)(function (done) {return _this2._count(opts, done);});else 
      if (this.async) this._count(opts, callback);} }, { key: "_count", value: function _count() 








    {
      throw new Error("Abstract method.");} }, { key: "findAll", value: function findAll() 













    {var _this3 = this;
      var opts, callback;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};


      if (this.sync) {
        return (0, _sync2.default)(function (done) {return _this3._findAll(opts, done);});} else 
      if (this.async) {
        if (!callback) throw new Error("Callback expected.");
        this._findAll(opts, callback);}} }, { key: "_findAll", value: function _findAll() 











    {
      throw new Error("Abstract method.");} }, { key: "insert", value: function insert(

































    docs) {
      throw new Error("Abstract method.");} }, { key: "update", value: function update() 


















    {
      throw new Error("Abstract method.");} }, { key: "remove", value: function remove() 


















    {
      throw new Error("Abstract method.");} }, { key: "truncate", value: function truncate() 












    {var _this4 = this;
      var opts, callback;for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this4._truncate(opts, done);});else 
      this._truncate(opts, callback || function () {});} }, { key: "_truncate", value: function _truncate(










    opts, callback) {
      throw new Error("Abstract method.");} }, { key: "ns", get: function get() {return this.namespace;} }, { key: "client", get: function get() {return this.connection.client;} }, { key: "db", get: function get() {return this.database;} }, { key: "connection", get: function get() {return this.db.connection;} }, { key: "qualifiedName", get: function get() {return (this.ns ? this.ns.qn + "." : "") + this.name;} }, { key: "qn", get: function get() {return this.qualifiedName;} }, { key: "fullQualifiedName", get: function get() {return (this.ns ? this.ns.fqn : this.db.name) + "." + this.name;} }, { key: "fqn", get: function get() {return this.fullQualifiedName;} }]);return DataStore;}();exports.default = DataStore;