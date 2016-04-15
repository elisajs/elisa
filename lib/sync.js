/**
 * Run an asynchronous function synchronously.
 *
 * @return object
 */
export default function(fn) {
  const deasync = require("deasync");
  var result;

  //(1) invoke
  deasync(function(done) {
    function mydone(err, res) {
      if (err) {
        if (err instanceof Error) done(err);
        else done(new Error(err));
      } else {
        result = res;
        done();
      }
    }

    fn(mydone);
  })();

  //(2) return result
  return result;
}
