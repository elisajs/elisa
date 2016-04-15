"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




function (fn) {
  var deasync = require("deasync");
  var result;


  deasync(function (done) {
    function mydone(err, res) {
      if (err) {
        if (err instanceof Error) done(err);else 
        done(new Error(err));} else 
      {
        result = res;
        done();}}



    fn(mydone);})();



  return result;};