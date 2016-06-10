//imports
import sync from "./sync";

/**
 * A namespace object.
 *
 * @readonly database:Database        The database object.
 * @readonly name:string              The namespace name.
 * @readonly(#) connection:Connection The connection to use.
 * @readonly(#) driver:Driver         The driver to use.
 */
export default class {
  /**
   * Constructor.
   *
   * @param(attr) database
   * @param(attr) name
   * @param opts:object The namespace options.
   */
  constructor(database, name, opts) {
    Object.defineProperty(this, "database", {value: database, enumerable: true});
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "connection", {value: database.connection});
    Object.defineProperty(this, "sync", {value: database.sync});
    Object.defineProperty(this, "async", {value: database.async});
    Object.defineProperty(this, "driver", {value: database.connection.driver});
  }

  /**
   * The native client.
   *
   * @protected
   */
  get client() {
    return this.connection.client;
  }

  /**
   * @alias database
   */
  get db() {
    return this.database;
  }

  /**
   * Qualified name.
   *
   * @type string
   */
  get qualifiedName() {
    return this.name;
  }

  /**
   * @alias qualifiedName
   */
  get qn() {
    return this.qualifiedName;
  }

  /**
   * Return a object QN.
   *
   * @return string
   */
  getQn(name) {
    return this.name + "." + name;
  }

  /**
   * Full qualified name.
   *
   * @type string
   */
  get fullQualifiedName() {
    return this.db.name + "." + this.name;
  }

  /**
   * @alias fullQualifiedName
   */
  get fqn() {
    return this.fullQualifiedName;
  }

  /**
   * Return a store.
   * This method doesn't check whether the store exists.
   *
   * @param name:string The store name.
   * @param opts?:opts  The store options.
   * @return Store
   */
  getStore(name, opts) {
    return new (this.connection.getStoreClass())(this, name, opts);
  }

  /**
   * Check whether a store exists.
   *
   * @overload Synchronous connection.
   * @param name:string       The store name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param name:string       The store name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasStore(name, callback) {
    if (this.sync) {
      return !!this.findStore(name);
    } else {
      this.findStore(name, (error, store) => {
        if (error) callback(error);
        else callback(undefined, !!store);
      });
    }
  }

  /**
   * Find a store into the namespace.
   *
   * @overload Synchronous connection.
   * @param name:string       The store name.
   * @param opts?:object      The store options.
   * @return Store
   *
   * @overload Asynchronous connection.
   * @param name:string       The store name.
   * @param opts?:object      The store options.
   * @param callback:function The function to call: fn(error, store).
   */
  findStore(name, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) find
    if (this.sync) return sync((done) => this._findStore(name, opts, done));
    else this._findStore(name, opts, callback);
  }

  /**
   * Find a store into the namespace.
   * Internal method. This method must not be invoked by the users.
   *
   * @protected
   * @param name:string       The store name.
   * @param opts:object       The store options.
   * @param callback:function The function to call: fn(error, store).
   */
  _findStore(name, opts, callback) {
    callback(undefined, new (this.connection.getStoreClass())(this, name, opts));
  }

  /**
   * Return a collection.
   * This method doesn't check whether the collection exists.
   *
   * @abstract
   * @param name:string   The collection name.
   * @param opts?:object  The collection options.
   * @return Collection
   */
  getCollection(name, opts) {
    return new (this.connection.getCollectionClass())(this, name, opts);
  }

  /**
   * Check whether a collection exists.
   *
   * @overload Synchronous connection.
   * @param name:string       The collection name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param name:string       The collection name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasCollection(name, callback) {
    if (this.sync) {
      return !!this.findCollection(name);
    } else {
      this.findCollection(name, (error, coll) => {
        if (error) callback(error);
        else callback(undefined, !!coll);
      });
    }
  }

  /**
   * Find a collection into the namespace.
   *
   * @overload Synchronous connection.
   * @param name:string       The collection name.
   * @param opts?:object      The collection options.
   * @return Store
   *
   * @overload Asynchronous connection.
   * @param name:string       The collection name.
   * @param opts?:object      The collection options.
   * @param callback:function The function to call: fn(error, coll).
   */
  findCollection(name, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) find
    if (this.sync) return sync((done) => this._findCollection(name, opts, done));
    else this._findCollection(name, opts, callback);
  }

  /**
   * Find a collection.
   * Internal method. This method must not be invoked by the users.
   *
   * @protected
   * @param name:string       The collection name.
   * @param opts:object       The collection options.
   * @param callback:function The function to call: fn(error, coll).
   */
  _findCollection(name, opts, callback) {
    callback(undefined, new (this.connection.getCollectionClass())(this, name, opts));
  }
}
