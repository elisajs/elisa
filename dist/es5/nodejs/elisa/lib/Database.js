"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;};var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 










Database = function () {







  function Database(connection, name) {_classCallCheck(this, Database);

    if (!name) throw new Error("Database name expected.");


    Object.defineProperty(this, "connection", { value: connection });
    Object.defineProperty(this, "sync", { value: connection.sync });
    Object.defineProperty(this, "async", { value: connection.async });
    Object.defineProperty(this, "driver", { value: connection.driver });
    Object.defineProperty(this, "name", { value: name.toLowerCase(), enumerable: true });}_createClass(Database, [{ key: "getNamespace", value: function getNamespace(



















    name, opts) {
      return new (this.connection.getNamespaceClass())(this, name, opts);} }, { key: "hasNamespace", value: function hasNamespace(













    name, callback) {

      if (!name) throw new Error("Namespace name expected.");


      if (this.sync) {

        return !!this.findNamespace(name);} else 
      {
        this.findNamespace(name, function (error, ns) {
          if (error) callback(error);else 
          callback(undefined, !!ns);});}} }, { key: "findNamespace", value: function findNamespace(


















    name) {var _this = this;
      var opts, callback;for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {rest[_key - 1] = arguments[_key];}


      if (rest.length == 1) {
        if (rest[0] instanceof Function) callback = rest[0];else 
        opts = rest[0];} else 
      if (rest.length >= 2) {
        opts = rest[0];callback = rest[1];}



      if (this.sync) return (0, _sync2.default)(function (done) {return _this._findNamespace(name, opts, done);});else 
      this._findNamespace(name, opts, callback);} }, { key: "_findNamespace", value: function _findNamespace(











    name, opts, callback) {var _this2 = this;
      process.nextTick(function () {return callback(undefined, _this2.getNamespace(name, opts));});} }, { key: "getStore", value: function getStore() 

















    {
      var ns, store, opts;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}var _parseDataStoreArgs = 


      parseDataStoreArgs(args);var _parseDataStoreArgs2 = _slicedToArray(_parseDataStoreArgs, 3);ns = _parseDataStoreArgs2[0];store = _parseDataStoreArgs2[1];opts = _parseDataStoreArgs2[2];


      if (ns) store = this.getNamespace(ns, opts).getStore(store, opts);else 
      store = new (this.connection.getStoreClass())(this, store, opts);


      return store;} }, { key: "hasStore", value: function hasStore() 























    {
      var ns, store, opts, callback, res;for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}var _parseDataStoreArgs3 = 


      parseDataStoreArgs(args);var _parseDataStoreArgs4 = _slicedToArray(_parseDataStoreArgs3, 4);ns = _parseDataStoreArgs4[0];store = _parseDataStoreArgs4[1];opts = _parseDataStoreArgs4[2];callback = _parseDataStoreArgs4[3];


      if (ns) {
        return this.getNamespace(ns).hasStore(store, callback);} else 
      {
        if (this.sync) {

          return !!this.findStore(store);} else 
        {
          this.findStore(store, function (error, store) {
            if (error) callback(error);else 
            callback(undefined, !!store);});}}} }, { key: "findStore", value: function findStore() 





























    {var _this3 = this;
      var ns, store, opts, callback;for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}var _parseDataStoreArgs5 = 


      parseDataStoreArgs(args);var _parseDataStoreArgs6 = _slicedToArray(_parseDataStoreArgs5, 4);ns = _parseDataStoreArgs6[0];store = _parseDataStoreArgs6[1];opts = _parseDataStoreArgs6[2];callback = _parseDataStoreArgs6[3];


      if (ns) {
        return this.getNamespace(ns, opts).findStore(store, opts, callback);} else 
      {
        if (this.sync) return (0, _sync2.default)(function (done) {return _this3._findStore(store, opts, done);});else 
        this._findStore(store, opts, callback);}} }, { key: "_findStore", value: function _findStore(












    name, opts, callback) {
      callback(undefined, new (this.connection.getStoreClass())(this, name, opts));} }, { key: "getCollection", value: function getCollection() 

















    {
      var ns, ds, opts;for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}var _parseDataStoreArgs7 = 


      parseDataStoreArgs(args);var _parseDataStoreArgs8 = _slicedToArray(_parseDataStoreArgs7, 3);ns = _parseDataStoreArgs8[0];ds = _parseDataStoreArgs8[1];opts = _parseDataStoreArgs8[2];


      if (ns) ds = this.getNamespace(ns, opts).getCollection(ds, opts);else 
      ds = new (this.connection.getCollectionClass())(this, ds, opts);


      return ds;} }, { key: "hasCollection", value: function hasCollection() 























    {
      var ns, ds, opts, callback, res;for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}var _parseDataStoreArgs9 = 


      parseDataStoreArgs(args);var _parseDataStoreArgs10 = _slicedToArray(_parseDataStoreArgs9, 4);ns = _parseDataStoreArgs10[0];ds = _parseDataStoreArgs10[1];opts = _parseDataStoreArgs10[2];callback = _parseDataStoreArgs10[3];


      if (ns) {
        return this.getNamespace(ns).hasCollection(ds, callback);} else 
      {
        if (this.sync) {
          return !!this.findCollection(ds);} else 
        {
          this.findCollection(ds, function (error, ds) {
            if (error) callback(error);else 
            callback(undefined, !!ds);});}}} }, { key: "findCollection", value: function findCollection() 






























    {var _this4 = this;
      var ns, ds, opts, callback;for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}var _parseDataStoreArgs11 = 


      parseDataStoreArgs(args);var _parseDataStoreArgs12 = _slicedToArray(_parseDataStoreArgs11, 4);ns = _parseDataStoreArgs12[0];ds = _parseDataStoreArgs12[1];opts = _parseDataStoreArgs12[2];callback = _parseDataStoreArgs12[3];


      if (ns) {
        return this.getNamespace(ns, opts).findCollection(ds, opts, callback);} else 
      {
        if (this.sync) return (0, _sync2.default)(function (done) {return _this4._findCollection(ds, opts, done);});else 
        this._findCollection(ds, opts, callback);}} }, { key: "_findCollection", value: function _findCollection(












    name, opts, callback) {
      callback(undefined, new (this.connection.getCollectionClass())(this, name, opts));} }, { key: "client", get: function get() {return this.connection.client;} }]);return Database;}();exports.default = Database;







function parseDataStoreArgs(args) {
  var ns, ds, opts, callback;


  if (args.length == 1) {var _destructureDataStore = 
    destructureDataStoreQn(args[0]);var _destructureDataStore2 = _slicedToArray(_destructureDataStore, 2);ns = _destructureDataStore2[0];ds = _destructureDataStore2[1];} else 
  if (args.length == 2) {
    if (typeof args[1] == "string") {var _args = _slicedToArray(
      args, 2);ns = _args[0];ds = _args[1];} else 
    {var _destructureDataStore3 = 
      destructureDataStoreQn(args[0]);var _destructureDataStore4 = _slicedToArray(_destructureDataStore3, 2);ns = _destructureDataStore4[0];ds = _destructureDataStore4[1];

      if (args[1] instanceof Function) callback = args[1];else 
      opts = args[1];}} else 

  if (args.length == 3) {
    if (_typeof(args[1]) == "object") {var _destructureDataStore5 = 
      destructureDataStoreQn(args[0]);var _destructureDataStore6 = _slicedToArray(_destructureDataStore5, 2);ns = _destructureDataStore6[0];ds = _destructureDataStore6[1];var _args$slice = 
      args.slice(1);var _args$slice2 = _slicedToArray(_args$slice, 2);opts = _args$slice2[0];callback = _args$slice2[1];} else 
    if (_typeof(args[2]) == "object") {var _args2 = _slicedToArray(
      args, 3);ns = _args2[0];ds = _args2[1];opts = _args2[2];} else 
    {var _args3 = _slicedToArray(
      args, 3);ns = _args3[0];ds = _args3[1];callback = _args3[2];}} else 

  if (args.length >= 4) {var _args4 = _slicedToArray(
    args, 4);ns = _args4[0];ds = _args4[1];opts = _args4[2];callback = _args4[3];}



  return [ns, ds, opts, callback];}









function destructureDataStoreQn(qn) {
  if (qn.indexOf(".") > 0) return (/(.+)\.(.+)/.exec(qn).slice(1, 3));else 
  return [undefined, qn];}