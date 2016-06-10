//imports
import sync from "./sync";

/**
 * A database connection.
 *
 * @abstract
 *
 * @readonly(#) driver:Driver   The driver.
 * @readonly(#) options:object  The connection options.
 * @readonly type:string        The connection type: sync or async.
 */
export default class Connection {
  /**
   * The constructor.
   *
   * @protected
   *
   * @param(attr) driver
   * @param eliOpts:object The Elisa connection options: type (string: sync or async).
   * @param(attr) options
   */
  constructor(driver, eliOpts, options) {
    Object.defineProperty(this, "driver", {value: driver});
    Object.defineProperty(this, "options", {value: Object.assign({}, options)});
    Object.defineProperty(this, "type", {value: eliOpts.type, enumerable: true});
  }

  /**
   * Is it a synchronous connection?
   *
   * @type boolean
   */
  get sync() {
    return this.type == "sync";
  }

  /**
   * Is it an asynchronous connection?
   *
   * @type boolean
   */
  get async() {
    return this.type == "async";
  }

  /**
   * The connection mode: r (readonly) o rw (read/write).
   *
   * @type string
   */
  get mode() {
    return this.options.mode || "rw";
  }

  /**
   * Read-only connection?
   *
   * @type boolean
   */
  get readonly() {
    return this.mode == "r";
  }

  /**
   * Read/write connection?
   *
   * @type boolean
   */
  get rw() {
    return this.mode == "rw";
  }

  /**
   * The server object as connected.
   *
   * @type Server
   */
  get server() {
    return new (this.getServerClass())(this);
  }

  /**
   * The current database.
   *
   * @type Database
   */
  get database() {
    return new (this.getDatabaseClass())(this, this.options.db);
  }

  /**
   * @alias database
   */
  get db() {
    return this.database;
  }

  /**
   * Open the connection.
   *
   * @overload Sync connection.
   * @noparam
   *
   * @overload Async connection.
   * @param callback?:function  The function to call: fn(error).
   */
  open(callback) {
    if (this.sync) return sync((done) => this._open(done));
    else if (this.async) this._open(callback);
  }

  /**
   * Open the connection.
   *
   * @protected
   * @abstract
   * @param callback?:function  The function to call: fn(error).
   */
  _open() {
    throw new Error("Abstract method.");
  }

  /**
   * Close the connection.
   *
   * @overload Synchronous connection.
   * @noparam
   *
   * @param Asynchronous connection.
   * @param callback?:function The function to call: fn(error).
   */
  close(callback) {
    if (this.sync) return sync((done) => this._close(done));
    else if (this.async) return this._close(callback);
  }

  /**
   * Close the connection.
   *
   * @protected
   * @abstract
   * @param callback?:function  The function to call: fn(error).
   */
  _close() {
    throw new Error("Abstract method.");
  }

  /**
   * Is it opened?
   *
   * @type boolean
   */
  get opened() {
    return !!this.client;
  }

  /**
   * Is it closed?
   *
   * @type boolean
   */
  get closed() {
    return !this.opened;
  }

  /**
   * Is it connected?
   *
   * @param callback:function The function to call: fn(error, connected).
   */
  connected(callback) {
    if (this.sync) return sync((done) => this._connected(done));
    else this._connected(callback);
  }

  /**
    * Is it connected?
    *
    * @protected
    * @abstract
    * @param callback:function  The function to call: fn(error, connected).
   */
  _connected() {
    throw new Error("Abstract method.");
  }

  /**
   * Perform a ping.
   *
   * @overload Synchronous connection.
   * @noparam
   *
   * @overload Asynchronous connection.
   * @param callback:function The function to call: fn(error).
   */
  ping(callback) {
    if (this.sync) return sync((done) => this._ping(done));
    else if (this.async) this._ping(callback);
  }

  /**
   * Perform a ping.
   *
   * @protected
   * @abstract
   * @param callback:function The function to call: fn(error).
   */
  _ping(callback) {
    throw new Error("Abstract method.");
  }

  /**
   * Return the Namespace class of the driver.
   *
   * @abstract
   * @protected
   * @return class
   */
  getNamespaceClass() {
    throw new Error("Abstract method.");
  }

  /**
   * Return the Server class of the driver.
   *
   * @abstract
   * @protected
   * @return class
   */
  getServerClass() {
    throw new Error("Abstract method.");
  }

  /**
   * Return the Database class.
   *
   * @abstract
   * @protected
   * @return class
   */
  getDatabaseClass() {
    throw new Error("Abstract method.");
  }

  /**
   * Return the Store class.
   *
   * @abstract
   * @protected
   * @return class
   */
  getStoreClass() {
    throw new Error("Abstract method.");
  }

  /**
   * Return the Collection class.
   *
   * @abstract
   * @protected
   * @return class
   */
  getCollectionClass() {
    throw new Error("Abstract method.");
  }
}
