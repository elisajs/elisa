"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _DataStore2 = require("./DataStore");var _DataStore3 = _interopRequireDefault(_DataStore2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var 




Collection = function (_DataStore) {_inherits(Collection, _DataStore);function Collection() {_classCallCheck(this, Collection);return _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).apply(this, arguments));}_createClass(Collection, [{ key: "query", value: function query() 





    {
      throw new Error("Abstract method.");} }, { key: "q", value: function q() 





    {
      return this.query.apply(this, arguments);} }, { key: "_findAll", value: function _findAll(





    opts, callback) {
      this.q().filter({})._run(opts, callback);} }, { key: "_find", value: function _find(





    query, opts, callback) {
      this.q().filter(query)._run(opts, callback);} }, { key: "_findOne", value: function _findOne(





    query, opts, callback) {
      this.q().filter(query)._run(opts, function (error, res) {
        if (error) callback(error);else 
        callback(undefined, res.docs[0]);});} }]);return Collection;}(_DataStore3.default);exports.default = Collection;