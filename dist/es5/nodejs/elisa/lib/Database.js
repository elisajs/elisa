"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;};var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}


var hasSchemaAsync = Symbol();var 










Database = function () {







  function Database(connection, name) {_classCallCheck(this, Database);

    if (!name) throw new Error("Database name expected.");


    Object.defineProperty(this, "connection", { value: connection });
    Object.defineProperty(this, "sync", { value: connection.sync });
    Object.defineProperty(this, "async", { value: connection.async });
    Object.defineProperty(this, "driver", { value: connection.driver });
    Object.defineProperty(this, "name", { value: name.toLowerCase(), enumerable: true });}_createClass(Database, [{ key: "destructureDataStoreQn", value: function destructureDataStoreQn(










    qn) {

      if (!/.+\..+/.test(qn)) throw new Error("Invalid qualified name.");


      return (/(.+)\.(.+)/.exec(qn).slice(1, 3));} }, { key: "getSchema", value: function getSchema() 










    {
      throw new Error("Abstract method.");} }, { key: "hasSchema", value: function hasSchema(













    name, callback) {var _this = this;

      if (!name) throw new Error("Schema name expected.");


      if (this.sync) return (0, _sync2.default)(function (done) {return done(undefined, !!_this.findSchema(name));});else 
      this[hasSchemaAsync](name, callback);} }, { key: 


    hasSchemaAsync, value: function value(name, callback) {
      this.findSchema(name, function (error, sch) {
        if (error) callback(error);else 
        callback(undefined, !!sch);});} }, { key: "findSchema", value: function findSchema(















    name, callback) {var _this2 = this;
      if (this.sync) return (0, _sync2.default)(function (done) {return _this2.readSchema(name, done);});else 
      this.readSchema(name, callback);} }, { key: "readSchema", value: function readSchema() 











    {
      throw new Error("Abstract method.");} }, { key: "getStore", value: function getStore() 

















    {
      var sch, store, opts;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length == 1) {var _destructureDataStore = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore2 = _slicedToArray(_destructureDataStore, 2);sch = _destructureDataStore2[0];store = _destructureDataStore2[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          sch = args[0];store = args[1];} else 
        {var _destructureDataStore3 = 
          this.destructureDataStoreQn(args[0]);var _destructureDataStore4 = _slicedToArray(_destructureDataStore3, 2);sch = _destructureDataStore4[0];store = _destructureDataStore4[1];
          opts = args[1];}} else 

      if (args.length >= 3) {
        sch = args[0];store = args[1];opts = args[2];}



      return this.getSchema(sch).getStore(store, opts);} }, { key: "hasStore", value: function hasStore() 























    {
      var schema, store, callback;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}


      if (args.length == 1) {var _destructureDataStore5 = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore6 = _slicedToArray(_destructureDataStore5, 2);schema = _destructureDataStore6[0];store = _destructureDataStore6[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          schema = args[0];store = args[1];} else 
        {
          var qn = void 0;

          qn = args[0];callback = args[1];var _destructureDataStore7 = 
          this.destructureDataStoreQn(qn);var _destructureDataStore8 = _slicedToArray(_destructureDataStore7, 2);schema = _destructureDataStore8[0];store = _destructureDataStore8[1];}} else 

      if (args.length >= 3) {
        schema = args[0];store = args[1];callback = args[2];}



      return this.getSchema(schema).hasStore(store, callback);} }, { key: "findStore", value: function findStore() 


























    {
      var schema, store, opts, callback;for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}


      if (args.length == 1) {var _destructureDataStore9 = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore10 = _slicedToArray(_destructureDataStore9, 2);schema = _destructureDataStore10[0];store = _destructureDataStore10[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          schema = args[0];store = args[1];} else 
        if (args[1] instanceof Function) {
          var qn = void 0;

          qn = args[0];callback = args[1];var _destructureDataStore11 = 
          this.destructureDataStoreQn(qn);var _destructureDataStore12 = _slicedToArray(_destructureDataStore11, 2);schema = _destructureDataStore12[0];store = _destructureDataStore12[1];} else 
        if (_typeof(args[1] == "object")) {
          var _qn = void 0;

          _qn = args[0];opts = args[1];var _destructureDataStore13 = 
          this.destructureDataStoreQn(_qn);var _destructureDataStore14 = _slicedToArray(_destructureDataStore13, 2);schema = _destructureDataStore14[0];store = _destructureDataStore14[1];}} else 

      if (args.length == 3) {
        if (_typeof(args[1]) == "object") {
          var _qn2 = void 0;

          _qn2 = args[0];opts = args[1];callback = args[2];var _destructureDataStore15 = 
          this.destructureDataStoreQn(_qn2);var _destructureDataStore16 = _slicedToArray(_destructureDataStore15, 2);schema = _destructureDataStore16[0];store = _destructureDataStore16[1];} else 
        if (_typeof(args[2]) == "object") {
          schema = args[0];store = args[1];opts = args[2];} else 
        {
          schema = args[0];store = args[1];callback = args[2];}} else 

      if (args.length >= 4) {
        schema = args[0];store = args[1];opts = args[2];callback = args[3];}



      return this.getSchema(schema).findStore(store, opts, callback);} }, { key: "getCollection", value: function getCollection() 

















    {
      var sch, coll, opts;for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}


      if (args.length == 1) {var _destructureDataStore17 = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore18 = _slicedToArray(_destructureDataStore17, 2);sch = _destructureDataStore18[0];coll = _destructureDataStore18[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          sch = args[0];coll = args[1];} else 
        {var _destructureDataStore19 = 
          this.destructureDataStoreQn(args[0]);var _destructureDataStore20 = _slicedToArray(_destructureDataStore19, 2);sch = _destructureDataStore20[0];coll = _destructureDataStore20[1];
          opts = args[1];}} else 

      if (args.length >= 3) {
        sch = args[0];coll = args[1];opts = args[2];}



      return this.getSchema(sch).getCollection(coll, opts);} }, { key: "hasCollection", value: function hasCollection() 























    {
      var schema, coll, callback;for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}


      if (args.length == 1) {var _destructureDataStore21 = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore22 = _slicedToArray(_destructureDataStore21, 2);schema = _destructureDataStore22[0];coll = _destructureDataStore22[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          schema = args[0];coll = args[1];} else 
        {
          var qn = void 0;

          qn = args[0];callback = args[1];var _destructureDataStore23 = 
          this.destructureDataStoreQn(qn);var _destructureDataStore24 = _slicedToArray(_destructureDataStore23, 2);schema = _destructureDataStore24[0];coll = _destructureDataStore24[1];}} else 

      if (args.length >= 3) {
        schema = args[0];coll = args[1];callback = args[2];}



      return this.getSchema(schema).hasCollection(coll, callback);} }, { key: "findCollection", value: function findCollection() 



























    {
      var schema, coll, opts, callback;for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}


      if (args.length == 1) {var _destructureDataStore25 = 
        this.destructureDataStoreQn(args[0]);var _destructureDataStore26 = _slicedToArray(_destructureDataStore25, 2);schema = _destructureDataStore26[0];coll = _destructureDataStore26[1];} else 
      if (args.length == 2) {
        if (typeof args[1] == "string") {
          schema = args[0];coll = args[1];} else 
        if (args[1] instanceof Function) {
          var qn = void 0;

          qn = args[0];callback = args[1];var _destructureDataStore27 = 
          this.destructureDataStoreQn(qn);var _destructureDataStore28 = _slicedToArray(_destructureDataStore27, 2);schema = _destructureDataStore28[0];coll = _destructureDataStore28[1];} else 
        if (_typeof(args[1] == "object")) {
          var _qn3 = void 0;

          _qn3 = args[0];opts = args[1];var _destructureDataStore29 = 
          this.destructureDataStoreQn(_qn3);var _destructureDataStore30 = _slicedToArray(_destructureDataStore29, 2);schema = _destructureDataStore30[0];coll = _destructureDataStore30[1];}} else 

      if (args.length == 3) {
        if (_typeof(args[1]) == "object") {
          var _qn4 = void 0;

          _qn4 = args[0];opts = args[1];callback = args[2];var _destructureDataStore31 = 
          this.destructureDataStoreQn(_qn4);var _destructureDataStore32 = _slicedToArray(_destructureDataStore31, 2);schema = _destructureDataStore32[0];coll = _destructureDataStore32[1];} else 
        if (_typeof(args[2]) == "object") {
          schema = args[0];coll = args[1];opts = args[2];} else 
        {
          schema = args[0];coll = args[1];callback = args[2];}} else 

      if (args.length >= 4) {
        schema = args[0];coll = args[1];opts = args[2];callback = args[3];}



      return this.getSchema(schema).findCollection(coll, opts, callback);} }]);return Database;}();exports.default = Database;