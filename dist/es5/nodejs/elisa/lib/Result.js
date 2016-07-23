"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 


Result = function () {





  function Result(docs) {_classCallCheck(this, Result);
    Object.defineProperty(this, "docs", { value: docs || [], enumerable: true });}_createClass(Result, [{ key: "add", value: function add(




























    doc) {
      this.docs.push(doc);} }, { key: "random", value: function random() 







    {
      return this.docs[Math.floor(Math.random() * this.length)];} }, { key: "rows", get: function get() {return this.docs;} }, { key: "length", get: function get() {return this.docs.length;} }, { key: "size", get: function get() {return this.length;} }]);return Result;}();exports.default = Result;