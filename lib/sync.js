/**
 * Run an asynchronous function synchronously.
 *
 * @return object
 */
export default function(fn) {
  return require("justo-sync")(fn);
}
