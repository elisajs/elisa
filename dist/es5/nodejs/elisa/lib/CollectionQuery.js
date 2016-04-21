"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _sync = require("./sync");var _sync2 = _interopRequireDefault(_sync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 






CollectionQuery = function () {





  function CollectionQuery(source) {_classCallCheck(this, CollectionQuery);
    Object.defineProperty(this, "source", { value: source, enumerable: true });
    Object.defineProperty(this, "sync", { value: source.sync });
    Object.defineProperty(this, "async", { value: source.async });
    Object.defineProperty(this, "fields", { value: {}, enumerable: true });}_createClass(CollectionQuery, [{ key: "project", value: function project() 

















    {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}

      if (args.length === 1) {
        if (typeof args[0] == "string") this.fields[args[0]] = args[0];else 
        for (var field in args[0]) {this.fields[field] = args[0][field];}} else 
      if (args.length > 1) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
          for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _field = _step.value;this.fields[_field] = _field;}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}



      return this;} }, { key: "filter", value: function filter(








    cond) {
      var src = this.source;


      if (src.hasInjection()) cond = src.injectInto(cond);


      delete this.condition;
      Object.defineProperty(this, "condition", { value: cond, configurable: true });


      return this;} }, { key: "limit", value: function limit(









    count) {
      if (typeof count == "number") Object.defineProperty(this, "maxLimit", { value: count, configurable: true });
      return this;} }, { key: "offset", value: function offset(








    count) {
      if (typeof count == "number") Object.defineProperty(this, "skip", { value: count, configurable: true });
      return this;} }, { key: "sort", value: function sort() 














    {for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {fields[_key2] = arguments[_key2];}

      if (fields.length == 1) {
        if (typeof fields[0] == "string") fields = _defineProperty({}, fields[0], "ASC");else 
        fields = fields[0];} else 
      if (fields.length >= 2) {
        var ff = {};var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
          for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var fld = _step2.value;ff[fld] = "ASC";}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
        fields = ff;}



      Object.defineProperty(this, "order", { value: fields, configurable: true });


      return this;} }, { key: "find", value: function find() 















    {
      var query, opts, callback;for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        query = args[0];} else 
      if (args.length == 2) {
        if (args[1] instanceof Function) {;query = args[0];callback = args[1];} else {
          ;query = args[0];opts = args[1];}} else 
      if (args.length >= 3) {
        query = args[0];opts = args[1];callback = args[2];}



      if (query) this.filter(query);


      return this.run(opts, callback);} }, { key: "findOne", value: function findOne() 















    {
      var query, opts, callback;for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        query = args[0];} else 
      if (args.length == 2) {
        if (args[1] instanceof Function) {;query = args[0];callback = args[1];} else {
          ;query = args[0];opts = args[1];}} else 
      if (args.length >= 3) {
        query = args[0];opts = args[1];callback = args[2];}



      if (query) this.filter(query);


      if (this.sync) {
        return this.run(opts).docs[0];} else 
      if (this.async) {
        this.run(opts, function (error, result) {
          if (error) callback(error);else 
          callback(undefined, result.docs[0]);});}} }, { key: "run", value: function run() 















    {var _this = this;
      var src = this.source;
      var opts, callback;for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}


      if (args.length == 1) {
        if (args[0] instanceof Function) callback = args[0];else 
        opts = args[0];} else 
      if (args.length >= 2) {
        opts = args[0];callback = args[1];}


      if (!opts) opts = {};


      if (this.sync) return (0, _sync2.default)(function (done) {return _this._run(opts, done);});else 
      this._run(opts, callback);} }, { key: "_run", value: function _run() 










    {
      throw new Error("Abstract method.");} }]);return CollectionQuery;}();exports.default = CollectionQuery;