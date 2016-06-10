//imports
import sync from "./sync";

/**
 * A database.
 *
 * @abstract
 * @readonly(#) connection:Connection The connection.
 * @readonly(#) driver:Driver         The driver.
 * @readonly name:string              The database name.
 *
 */
export default class Database {
  /**
   * Constructor.
   *
   * @protected
   * @param(attr) connection
   * @param(attr) name
   */
  constructor(connection, name) {
    //(1) pre: arguments
    if (!name)  throw new Error("Database name expected.");

    //(2) initialize
    Object.defineProperty(this, "connection", {value: connection});
    Object.defineProperty(this, "sync", {value: connection.sync});
    Object.defineProperty(this, "async", {value: connection.async});
    Object.defineProperty(this, "driver", {value: connection.driver});
    Object.defineProperty(this, "name", {value: name.toLowerCase(), enumerable: true});
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
   * Return a namespace.
   * This method doesn't check whether the namespace exists.
   *
   * @param name:string   The namespace name.
   * @param opts?:object  The options.
   * @return Namespace
   */
  getNamespace(name, opts) {
    return new (this.connection.getNamespaceClass())(this, name, opts);
  }

  /**
   * Check whether a namespace exists.
   *
   * @overload Synchronous connection.
   * @param name:string       The namespace name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param name:string       The namespace name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasNamespace(name, callback) {
    //(1) arguments
    if (!name) throw new Error("Namespace name expected.");

    //(2) check
    if (this.sync) {
      // return sync((done) => done(undefined, !!this.findNamespace(name)));
      return !!this.findNamespace(name);
    } else {
      this.findNamespace(name, (error, ns) => {
        if (error) callback(error);
        else callback(undefined, !!ns);
      });
    }
  }

  /**
   * Find a namespace.
   * This method checks whether the namespace exists if possible.
   *
   * @overload Synchronous connection.
   * @param name:string       The ns name.
   * @param opts?:object      The options.
   * @return Namespace
   *
   * @overload Asynchronous connection.
   * @param name:string       The ns name.
   * @param opts?:object      The options.
   * @param callback:function The function to call: fn(error, ns).
   */
  findNamespace(name, ...rest) {
    var opts, callback;

    //(1) arguments
    if (rest.length == 1) {
      if (rest[0] instanceof Function) callback = rest[0];
      else opts = rest[0];
    } else if (rest.length >= 2) {
      [opts, callback] = rest;
    }

    //(2) find
    if (this.sync) return sync((done) => this._findNamespace(name, opts, done));
    else this._findNamespace(name, opts, callback);
  }

  /**
   * Read a namespace.
   * This method is called by the driver internally for getting the namespace info.
   *
   * @protected
   * @param name:string       The ns name.
   * @param opts:object       The options.
   * @param callback:function The function to call: fn(error, ns).
   */
  _findNamespace(name, opts, callback) {
    process.nextTick(() => callback(undefined, this.getNamespace(name, opts)));
  }

  /**
   * Return a store.
   * This method doesn't check whether the store exists.
   *
   * @overload
   * @param ns:string     The namespace name.
   * @param store:string  The store name.
   * @param opts?:object  The store options.
   * @return Store
   *
   * @overload
   * @param qn:string     The store qualified name.
   * @param opts?:object  The store options.
   * @return Store
   */
  getStore(...args) {
    var ns, store, opts;

    //(1) arguments
    [ns, store, opts] = parseDataStoreArgs(args);

    //(2) get store
    if (ns) store = this.getNamespace(ns, opts).getStore(store, opts);
    else store = new (this.connection.getStoreClass())(this, store, opts);

    //(3) return
    return store;
  }

  /**
   * Check whether a store exists.
   *
   * @overload Synchronous connection.
   * @param ns:string         The namespace name.
   * @param store:string      The store name.
   * @return boolean
   *
   * @overload Synchronous connection.
   * @param qn:string         The store qualified name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param ns:string         The namespace name.
   * @param store:string      The store name.
   * @param callback:function The function to call: fn(error, exists).
   *
   * @overload Asynchronous connection.
   * @param qn:string         The store qualified name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasStore(...args) {
    var ns, store, opts, callback, res;

    //(1) pre: arguments
    [ns, store, opts, callback] = parseDataStoreArgs(args);

    //(2) check
    if (ns) {
      return this.getNamespace(ns).hasStore(store, callback);
    } else {
      if (this.sync) {
        // return sync((done) => done(undefined, !!this.findStore(name)));
        return !!this.findStore(store);
      } else {
        this.findStore(store, (error, store) => {
          if (error) callback(error);
          else callback(undefined, !!store);
        });
      }
    }
  }

  /**
   * Return a store.
   *
   * @overload Synchronous connection.
   * @param ns:string         The namespace name.
   * @param store:string      The store name.
   * @param opts?:object      The store options.
   * @return Store
   *
   * @overload Synchronous connection.
   * @param qn:string         The store qualified name.
   * @param opts?:object      The store options.
   *
   * @overload Asynchronous connection.
   * @param ns:string         The namespace name.
   * @param store:string      The store name.
   * @param opts?:object      The store options.
   * @param callback:function The function to call: fn(error, store).
   *
   * @overload Asynchronous connection.
   * @param qn:string         The store qualified name.
   * @param opts?:object      The store options.
   * @param callback:function The function to call: fn(error, store).
   */
  findStore(...args) {
    var ns, store, opts, callback;

    //(1) pre: arguments
    [ns, store, opts, callback] = parseDataStoreArgs(args);

    //(2) read
    if (ns) {
      return this.getNamespace(ns, opts).findStore(store, opts, callback);
    } else {
      if (this.sync) return sync((done) => this._findStore(store, opts, done));
      else this._findStore(store, opts, callback);
    }
  }

  /**
   * Find a store without namespace into the database.
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
   * @overload
   * @param ns:string         The namespace name.
   * @param collection:string The collection name.
   * @param opts?:object      The collection options.
   * @return Collection
   *
   * @overload
   * @param qn:string         The collection qualified name.
   * @param opts?:object      The collection options.
   * @return Collection
   */
  getCollection(...args) {
    var ns, coll, opts;

    //(1) arguments
    [ns, coll, opts] = destructureDataStoreQn(args);

    //(2) return
    if (ns) return this.getNamespace(ns, opts).getCollection(coll, opts);
    else return new (this.connection.getCollectionClass())(this, coll, opts);
  }

  /**
   * Check whether a collection exists.
   *
   * @overload Synchronous connection.
   * @param ns:string         The namespace name.
   * @param collection:string The collection name.
   * @return boolean
   *
   * @overload Synchronous connection.
   * @param qn:string         The collection qualified name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param ns:string         The namespace name.
   * @param collection:string The collection name.
   * @param callback:function The function to call: fn(error, exists).
   *
   * @overload Asynchronou connection.
   * @param qn:string         The collection qualified name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasCollection(...args) {
    var ns, coll, opts, callback, res;

    //(1) pre: arguments
    [ns, coll, opts, callback] = parseDataStoreArgs(args);

    //(2) check
    if (ns) {
      return this.getNamespace(ns).hasCollection(coll, callback);
    } else {
      if (this.sync) {
        return !!this.findCollection(coll);
      } else {
        this.findCollection(name, (error, coll) => {
          if (error) callback(error);
          else callback(undefined, !!coll);
        });
      }
    }
  }

  /**
   * Return a collection.
   *
   * @overload Synhronous connection.
   * @param ns:string         The namespace name.
   * @param collection:string The collection name.
   * @param opts?:object      The collection options.
   * @return Collection
   *
   * @overload Synchronous connection.
   * @param qn:string         The collection qualified name.
   * @param opts?:object      The collection options.
   * @return Collection
   *
   * @overload Asynchronou connection.
   * @param ns:string         The namespace name.
   * @param collection:string The collection name.
   * @param opts?:object      The collection options.
   * @param callback:function The function to call: fn(error, store).
   *
   * @overload Asynchronous connection.
   * @param qn:string         The collection qualified name.
   * @param opts?:object      The collection options.
   * @param callback:function The function to call: fn(error, store).
   */
  findCollection(...args) {
    var ns, coll, opts, callback;

    //(1) pre: arguments
    [ns, coll, opts, callback] = parseDataStoreArgs(args);

    //(2) read
    if (ns) {
      return this.getNamespace(ns, opts).findCollection(coll, opts, callback);
    } else {
      if (this.sync) return sync((done) => this._findCollection(coll, opts, done));
      else this._findCollection(coll, opts, callback);
    }
  }

  /**
   * Find a collection without namespace into the database.
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

//helpers
/**
 * Parse arguments passed to getXXX(), findXXX(), etc.
 */
function parseDataStoreArgs(args) {
  var ns, ds, opts, callback;

  //(1) parse
  if (args.length == 1) { //ns or ns.ds
    [ns, ds] = destructureDataStoreQn(args[0]);
  } else if (args.length == 2) {  //(ns, ds) || (qn, opts) || (qn, callback)
    if (typeof(args[1]) == "string") {
      [ns, ds] = args;
    } else {
      [ns, ds] = destructureDataStoreQn(args[0]);

      if (args[1] instanceof Function) callback = args[1];
      else opts = args[1];
    }
  } else if (args.length == 3) {  //(ns, ds, opts) || (ns, ds, callback) || (qn, opts, callback)
    if (typeof(args[1]) == "object") {
      [ns, ds] = destructureDataStoreQn(args[0]);
      [opts, callback] = args.slice(1);
    } else if (typeof(args[2]) == "object") {
      [ns, ds, opts] = args;
    } else {
      [ns, ds, callback] = args;
    }
  } else if (args.length >= 4) {
    [ns, ds, opts, callback] = args;
  }

  //(2) return
  return [ns, ds, opts, callback];
}

/**
 * Destructure a qualified name.
 *
 * @param qn:string The qualified name to destructure.
 * @return object[]
 * @throw Error when the qualified name is not valid.
 */
function destructureDataStoreQn(qn) {
  if (qn.indexOf(".") > 0) return /(.+)\.(.+)/.exec(qn).slice(1, 3);
  else return [undefined, qn];
}
