"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 










Connection = function () {









  function Connection(driver, eliOpts, options) {_classCallCheck(this, Connection);
    Object.defineProperty(this, "driver", { value: driver });
    Object.defineProperty(this, "options", { value: Object.assign({}, options) });
    Object.defineProperty(this, "type", { value: eliOpts.type, enumerable: true });}_createClass(Connection, [{ key: "open", value: function open(

















































































    callback) {var _this = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this._open(done);});else 
      if (this.async) this._open(callback);} }, { key: "_open", value: function _open() 









    {
      throw new Error("Abstract method.");} }, { key: "close", value: function close(











    callback) {var _this2 = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this2._close(done);});else 
      if (this.async) return this._close(callback);} }, { key: "_close", value: function _close() 









    {
      throw new Error("Abstract method.");} }, { key: "connected", value: function connected(

























    callback) {var _this3 = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this3._connected(done);});else 
      this._connected(callback);} }, { key: "_connected", value: function _connected() 









    {
      throw new Error("Abstract method.");} }, { key: "ping", value: function ping(











    callback) {var _this4 = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this4._ping(done);});else 
      if (this.async) this._ping(callback);} }, { key: "_ping", value: function _ping(









    callback) {
      throw new Error("Abstract method.");} }, { key: "getNamespaceClass", value: function getNamespaceClass() 









    {
      throw new Error("Abstract method.");} }, { key: "getServerClass", value: function getServerClass() 









    {
      throw new Error("Abstract method.");} }, { key: "getDatabaseClass", value: function getDatabaseClass() 









    {
      throw new Error("Abstract method.");} }, { key: "getStoreClass", value: function getStoreClass() 









    {
      throw new Error("Abstract method.");} }, { key: "getCollectionClass", value: function getCollectionClass() 









    {
      throw new Error("Abstract method.");} }, { key: "sync", get: function get() {return this.type == "sync";} }, { key: "async", get: function get() {return this.type == "async";} }, { key: "mode", get: function get() {return this.options.mode || "rw";} }, { key: "readonly", get: function get() {return this.mode == "r";} }, { key: "rw", get: function get() {return this.mode == "rw";} }, { key: "server", get: function get() {return new (this.getServerClass())(this);} }, { key: "database", get: function get() {return new (this.getDatabaseClass())(this, this.options.db);} }, { key: "db", get: function get() {return this.database;} }, { key: "opened", get: function get() {return !!this.client;} }, { key: "closed", get: function get() {return !this.opened;} }]);return Connection;}();exports.default = Connection;