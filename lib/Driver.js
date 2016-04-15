//internal members
const cache = {};

/**
 * An Elisa driver.
 *
 * @abstract
 * @readonly name:string      The driver name.
 * @readonly aliases:string[] The driver aliases.
 */
export default class Driver {
  /**
   * Constructor.
   * @protected
   *
   * @param(attr) name
   * @param(attr) aliases
   */
  constructor(name, aliases = []) {
    //(1) pre: arguments
    if (typeof(aliases) == "string") aliases = [aliases];

    //(2) initialize instance
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "aliases", {value: aliases, enumerable: true});
  }

  /**
   * Returns a registered driver by name.
   *
   * @param name:string The driver name or alias.
   * @return Driver
   */
  static getDriver(name) {
    //(1) pre: arguments
    if (!name) throw new Error("Driver name expected.");

    //(2) return driver
    return cache[name.toLowerCase()];
  }

  /**
   * Registers a driver.
   * This method is used by the drivers to register in the Elisa API.
   *
   * @param driver:Driver The driver to register.
   */
  static register(driver) {
    //(1) pre: arguments
    if (!driver) throw new TypeError("Driver expected.");

    //(2) register
    cache[driver.name.toLowerCase()] = driver;
    for (let alias of driver.aliases) cache[alias.toLowerCase()] = driver;
  }

  /**
   * Create a connection object
   *
   * @param eliOpts?:object The Elisa connection options: type (string: sync or async).
   * @param opts:object     The connection options.
   * @return Connection
   */
  createConnection(...args) {
    var eliOpts, opts;

    //(1) arguments
    if (args.length == 1) opts = args[0];
    else if (args.length >= 2) [eliOpts, opts] = args;

    if (!eliOpts) eliOpts = {type: "async"};
    if (!eliOpts.type) eliOpts.type = "async";

    //(2) return
    return this._createConnection(eliOpts, opts);
  }

  /**
   * Create a connection object.

   * @protected
   * @abstract
   * @param eliOpts:object  The Elisa connection options: type (string: sync or async).
   * @param opts:object     The connection options.
   * @return Connection
   */
  _createConnection() {
    throw new Error("Abstract method.");
  }

  /**
   * Creates and opens a connection.
   *
   * @overload Synchronous connection.
   * @param eliOpts?:object The Elisa connection options: type (string: sync or async).
   * @param opts:object     The connection options.
   *
   * @overload Asynchronous connection.
   * @param cxOpts?:object  The Elisa connection options: type (string: sync or async).
   * @param opts:object       The connection options.
   * @param callback:function The function to call: fn(error, cx).
   */
  openConnection(...args) {
    var eliOpts, opts, callback, cx;

    //(1) arguments
    if (args.length == 1) {
      opts = args[0];
    } else if (args.length == 2) {
      if (args[1] instanceof Function) [opts, callback] = args;
      else [eliOpts, opts] = args;
    } else if (args.length >= 3) {
      [eliOpts, opts, callback] = args;
    }

    if (!eliOpts) eliOpts = {};
    if (!opts) throw new TypeError("Connection options expected.");

    //(2) create connection
    cx = this.createConnection(eliOpts, opts);

    //(3) open connection
    if (cx.sync) {
      cx.open();
      return cx;
    } else if (cx.async) {
      if (!callback) throw new TypeError("Callback expected.");

      cx.open((error) => {
        if (error) callback(error);
        else callback(undefined, cx);
      });
    }
  }
}
