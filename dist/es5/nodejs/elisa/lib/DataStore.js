"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 










DataStore = function () {






  function DataStore(schema, name) {_classCallCheck(this, DataStore);
    Object.defineProperty(this, "schema", { value: schema, enumerable: true });
    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "sync", { value: schema.sync });
    Object.defineProperty(this, "async", { value: schema.async });}_createClass(DataStore, [{ key: "hasId", value: function hasId(







































































    id, callback) {var _this = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this._hasId(id, done);});else 
      if (this.async) this._hasId(id, callback);} }, { key: "_hasId", value: function _hasId() 










    {
      throw new Error("Abstract method.");} }, { key: "find", value: function find(















    query) {var _this2 = this;
      var opts, callback;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this2._find(query, opts, done);});else 
      this._find(query, opts, callback);} }, { key: "_find", value: function _find() 











    {
      throw new Error("Abstract method.");} }, { key: "findOne", value: function findOne(















    query) {var _this3 = this;
      var opts, callback;for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this3._findOne(query, opts, done);});else 
      this._findOne(query, opts, callback);} }, { key: "_findOne", value: function _findOne() 











    {
      throw new Error("Abstract method.");} }, { key: "findAll", value: function findAll() 













    {var _this4 = this;
      var opts, callback;for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this4._findAll(opts, done);});else 
      if (this.async) this._findAll(opts, callback);} }, { key: "_findAll", value: function _findAll() 










    {
      throw new Error("Abstract method.");} }, { key: "count", value: function count() 











    {var _this5 = this;
      var opts, callback;for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};


      if (this.sync) return (0, _sync2.default)(function (done) {return _this5._count(opts, done);});else 
      if (this.async) this._count(opts, callback);} }, { key: "_count", value: function _count(









    opts, callback) {
      this._findAll(opts, function (error, res) {
        if (error) callback(error);else 
        callback(undefined, res.length);});} }, { key: "insert", value: function insert(
































    docs) {var _this6 = this;
      var opts, callback;for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {args[_key5 - 1] = arguments[_key5];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this6._insert(docs, opts, done);});else 
      this._insert(docs, opts, callback);} }, { key: "_insert", value: function _insert() 


















    {
      throw new Error("Abstract method.");} }, { key: "update", value: function update(
















    query, updt) {var _this7 = this;
      var opts, callback;for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {args[_key6 - 2] = arguments[_key6];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length == 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this7._update(query, updt, opts, done);});else 
      this._update(query, updt, opts, callback);} }, { key: "_update", value: function _update() 














    {
      throw new Error("Abstract method.");} }, { key: "remove", value: function remove(
















    query) {var _this8 = this;
      var opts, callback, nop;for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {args[_key7 - 1] = arguments[_key7];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      nop = Object.keys(query).length === 0;


      if (this.sync) {
        if (nop) return;else 
        return (0, _sync2.default)(function (done) {return _this8._remove(query, opts, done);});} else 
      {
        if (nop) process.nextTick(function () {if (callback) callback();});else 
        this._remove(query, opts, callback);}} }, { key: "_remove", value: function _remove() 












    {
      throw new Error("Abstract method.");} }, { key: "truncate", value: function truncate() 












    {var _this9 = this;
      var opts, callback;for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this9._truncate(opts, done);});else 
      this._truncate(opts, callback || function () {});} }, { key: "_truncate", value: function _truncate(










    opts, callback) {
      throw new Error("Abstract method.");} }, { key: "database", get: function get() {return this.schema.database;} }, { key: "db", get: function get() {return this.database;} }, { key: "connection", get: function get() {return this.db.connection;} }, { key: "qualifiedName", get: function get() {return this.schema.qn + "." + this.name;} }, { key: "qn", get: function get() {return this.qualifiedName;} }, { key: "fullQualifiedName", get: function get() {return this.schema.fqn + "." + this.name;} }, { key: "fqn", get: function get() {return this.fullQualifiedName;} }]);return DataStore;}();exports.default = DataStore;