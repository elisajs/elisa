"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);
var _DataStore2 = require("./DataStore");var _DataStore3 = _interopRequireDefault(_DataStore2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var 




Store = function (_DataStore) {_inherits(Store, _DataStore);function Store() {_classCallCheck(this, Store);return _possibleConstructorReturn(this, Object.getPrototypeOf(Store).apply(this, arguments));}_createClass(Store, [{ key: "find", value: function find() 



    {
      return this.findOne.apply(this, arguments);} }, { key: "findOne", value: function findOne(















    query) {var _this2 = this;
      var opts, callback;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};
      if (!query.id) throw new Error("Id field expected.");


      if (this.sync) return (0, _sync2.default)(function (done) {return _this2._findOne(query, opts, done);});else 
      this._findOne(query, opts, callback);} }, { key: "_findOne", value: function _findOne() 











    {
      throw new Error("Abstract method.");} }, { key: "insert", value: function insert(





    docs) {var _this3 = this;
      var opts, callback;for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};


      if (docs instanceof Array) {
        for (var i = 0; i < docs.length; ++i) {
          var doc = docs[i];

          if (!doc.id) throw new Error("Id field expected.");
          if (this.hasInjection()) docs[i] = this.injectInto(doc);}} else 

      {
        if (!docs.id) throw new Error("Id field expected.");
        if (this.hasInjection()) docs = this.injectInto(docs);}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this3._insert(docs, opts, done);});else 
      this._insert(docs, opts, callback || function () {});} }, { key: "_insert", value: function _insert() 


















    {
      throw new Error("Abstract method.");} }, { key: "update", value: function update(





    query, updt) {var _this4 = this;
      var opts, callback;for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {args[_key3 - 2] = arguments[_key3];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length == 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};
      if (!query.id) throw new Error("Id field expected.");


      if (this.sync) return (0, _sync2.default)(function (done) {return _this4._update(query, updt, opts, done);});else 
      this._update(query, updt, opts, callback || function () {});} }, { key: "_update", value: function _update() 














    {
      throw new Error("Abstract method.");} }, { key: "remove", value: function remove(





    query) {var _this5 = this;
      var opts, callback, nop;for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};
      if (!query.id) throw new Error("Id field expected.");

      nop = Object.keys(query).length === 0;


      if (this.sync) {
        if (nop) return;else 
        return (0, _sync2.default)(function (done) {return _this5._remove(query, opts, done);});} else 
      {
        if (nop) process.nextTick(function () {if (callback) callback();});else 
        this._remove(query, opts, callback || function () {});}} }, { key: "_remove", value: function _remove() 












    {
      throw new Error("Abstract method.");} }]);return Store;}(_DataStore3.default);exports.default = Store;