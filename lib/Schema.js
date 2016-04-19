//imports
import sync from "./sync";

//internal members
const hasStoreAsync = Symbol();
const hasCollectionAsync = Symbol();

/**
 * A schema object.
 *
 * @readonly database:Database        The database object.
 * @readonly name:string              The schema name.
 * @readonly(#) connection:Connection The connection to use.
 * @readonly(#) driver:Driver         The driver to use.
 */
export default class Schema {
  /**
   * Constructor.
   *
   * @param(attr) database
   * @param(attr) name
   * @param opts:object The schema options.
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
   * @abstract
   * @param name:string The store name.
   * @param opts?:opts  The store options.
   * @return Store
   */
  getStore() {
    throw new Error("Abstract method.");
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
    if (this.sync) return sync((done) => done(undefined, !!this.findStore(name)));
    else this[hasStoreAsync](name, callback);
  }

  [hasStoreAsync](name, callback) {
    this.findStore(name, (error, store) => {
      if (error) callback(error);
      else callback(undefined, !!store);
    });
  }

  /**
   * Find a store into the schema.
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
    if (this.sync) return sync((done) => this.readStore(name, opts, done));
    else this.readStore(name, opts, callback);
  }

  /**
   * Find a store into the schema.
   * Internal method. This method must not be invoked by the users.
   *
   * @abstract
   * @protected
   * @param name:string       The store name.
   * @param opts?:object      The store options.
   * @param callback:function The function to call: fn(error, store).
   */
  readStore() {
    throw new Error("Abstract method.");
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
  getCollection() {
    throw new Error("Abstract method.");
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
    if (this.sync) return sync((done) => done(undefined, !!this.findCollection(name)));
    else this[hasCollectionAsync](name, callback);
  }

  [hasCollectionAsync](name, callback) {
    this.findCollection(name, (error, coll) => {
      if (error) callback(error);
      else callback(undefined, !!coll);
    });
  }

  /**
   * Find a collection into the schema.
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
    if (this.sync) return sync((done) => this.readCollection(name, opts, done));
    else this.readCollection(name, opts, callback);
  }

  /**
   * Find a collection.
   * Internal method. This method must not be invoked by the users.
   *
   * @abstract
   * @protected
   * @param name:string       The collection name.
   * @param opts?:object      The collection options.
   * @param callback:function The function to call: fn(error, coll).
   */
  readCollection(name, callback) {
    throw new Error("Abstract method.");
  }
}
