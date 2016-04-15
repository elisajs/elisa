//imports
import sync from "./sync";

//internal members
const hasSchemaAsync = Symbol();

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
   * Destructure a qualified name.
   *
   * @protected
   * @param qn:string The qualified name to destructure.
   * @return object[]
   * @throw Error when the qualified name is not valid.
   */
  destructureDataStoreQn(qn) {
    //(1) check
    if (!/.+\..+/.test(qn)) throw new Error("Invalid qualified name.");

    //(2) return
    return /(.+)\.(.+)/.exec(qn).slice(1, 3);
  }

  /**
   * Return a schema.
   * This method doesn't check whether the schema exists.
   *
   * @abstract
   * @param name:string The schema name.
   * @return Schema
   */
  getSchema() {
    throw new Error("Abstract method.");
  }

  /**
   * Check whether a schema exists.
   *
   * @overload Synchronous connection.
   * @param name:string       The schema name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param name:string       The schema name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasSchema(name, callback) {
    //(1) arguments
    if (!name) throw new Error("Schema name expected.");

    //(2) check
    if (this.sync) return sync((done) => done(undefined, !!this.findSchema(name)));
    else this[hasSchemaAsync](name, callback);
  }

  [hasSchemaAsync](name, callback) {
    this.findSchema(name, (error, sch) => {
      if (error) callback(error);
      else callback(undefined, !!sch);
    });
  }

  /**
   * Find a schema.
   * This method checks whether the schema exists if possible.
   *
   * @overload Synchronous connection.
   * @param name:string       The schema name.
   * @return Schema
   *
   * @overload Asynchronous connection.
   * @param name:string       The schema name.
   * @param callback:function The function to call: fn(error, schema).
   */
  findSchema(name, callback) {
    if (this.sync) return sync((done) => this.readSchema(name, done));
    else this.readSchema(name, callback);
  }

  /**
   * Read a schema.
   * This method is called by the driver internally for getting the schema info.
   *
   * @protected
   * @abstract
   * @param name:string       The schema name.
   * @param callback:function The function to call: fn(error, schema).
   */
  readSchema() {
    throw new Error("Abstract method.");
  }

  /**
   * Return a store.
   * This method doesn't check whether the store exists.
   *
   * @overload
   * @param schema:string The schema name.
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
    var sch, store, opts;

    //(1) arguments
    if (args.length == 1) {
      [sch, store] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [sch, store] = args;
      } else {
        [sch, store] = this.destructureDataStoreQn(args[0]);
        opts = args[1];
      }
    } else if (args.length >= 3) {
      [sch, store, opts] = args;
    }

    //(2) return
    return this.getSchema(sch).getStore(store, opts);
  }

  /**
   * Check whether a store exists.
   *
   * @overload Synchronous connection.
   * @param schema:string     The schema name.
   * @param store:string      The store name.
   * @return boolean
   *
   * @overload Synchronous connection.
   * @param qn:string         The store qualified name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param schema:string     The schema name.
   * @param store:string      The store name.
   * @param callback:function The function to call: fn(error, exists).
   *
   * @overload Asynchronous connection.
   * @param qn:string         The store qualified name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasStore(...args) {
    var schema, store, callback;

    //(1) pre: arguments
    if (args.length == 1) {
      [schema, store] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [schema, store] = args;
      } else {
        let qn;

        [qn, callback] = args;
        [schema, store] = this.destructureDataStoreQn(qn);
      }
    } else if (args.length >= 3) {
      [schema, store, callback] = args;
    }

    //(2) check
    return this.getSchema(schema).hasStore(store, callback);
  }

  /**
   * Return a store.
   *
   * @overload Synchronous connection.
   * @param schema:string     The schema name.
   * @param store:string      The store name.
   * @param opts?:object      The store options.
   * @return Store
   *
   * @overload Synchronous connection.
   * @param qn:string         The store qualified name.
   * @param opts?:object      The store options.
   *
   * @overload Asynchronous connection.
   * @param schema:string     The schema name.
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
    var schema, store, opts, callback;

    //(1) pre: arguments
    if (args.length == 1) {
      [schema, store] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [schema, store] = args;
      } else if (args[1] instanceof Function) {
        let qn;

        [qn, callback] = args;
        [schema, store] = this.destructureDataStoreQn(qn);
      } else if (typeof(args[1] == "object")) {
        let qn;

        [qn, opts] = args;
        [schema, store] = this.destructureDataStoreQn(qn);
      }
    } else if (args.length == 3) {
      if (typeof(args[1]) == "object") {
        let qn;

        [qn, opts, callback] = args;
        [schema, store] = this.destructureDataStoreQn(qn);
      } else if (typeof(args[2]) == "object") {
        [schema, store, opts] = args;
      } else {
        [schema, store, callback] = args;
      }
    } else if (args.length >= 4) {
      [schema, store, opts, callback] = args;
    }

    //(2) read
    return this.getSchema(schema).findStore(store, opts, callback);
  }

  /**
   * Return a collection.
   * This method doesn't check whether the collection exists.
   *
   * @overload
   * @param schema:string     The schema name.
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
    var sch, coll, opts;

    //(1) arguments
    if (args.length == 1) {
      [sch, coll] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [sch, coll] = args;
      } else {
        [sch, coll] = this.destructureDataStoreQn(args[0]);
        opts = args[1];
      }
    } else if (args.length >= 3) {
      [sch, coll, opts] = args;
    }

    //(2) return
    return this.getSchema(sch).getCollection(coll, opts);
  }

  /**
   * Check whether a collection exists.
   *
   * @overload Synchronous connection.
   * @param schema:string     The schema name.
   * @param collection:string The collection name.
   * @return boolean
   *
   * @overload Synchronous connection.
   * @param qn:string         The collection qualified name.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param schema:string     The schema name.
   * @param collection:string The collection name.
   * @param callback:function The function to call: fn(error, exists).
   *
   * @overload Asynchronou connection.
   * @param qn:string         The collection qualified name.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasCollection(...args) {
    var schema, coll, callback;

    //(1) pre: arguments
    if (args.length == 1) {
      [schema, coll] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [schema, coll] = args;
      } else {
        let qn;

        [qn, callback] = args;
        [schema, coll] = this.destructureDataStoreQn(qn);
      }
    } else if (args.length >= 3) {
      [schema, coll, callback] = args;
    }

    //(2) check
    return this.getSchema(schema).hasCollection(coll, callback);
  }

  /**
   * Return a collection.
   *
   * @overload Synhronous connection.
   * @param schema:string     The schema name.
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
   * @param schema:string     The schema name.
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
    var schema, coll, opts, callback;

    //(1) pre: arguments
    if (args.length == 1) {
      [schema, coll] = this.destructureDataStoreQn(args[0]);
    } else if (args.length == 2) {
      if (typeof(args[1]) == "string") {
        [schema, coll] = args;
      } else if (args[1] instanceof Function) {
        let qn;

        [qn, callback] = args;
        [schema, coll] = this.destructureDataStoreQn(qn);
      } else if (typeof(args[1] == "object")) {
        let qn;

        [qn, opts] = args;
        [schema, coll] = this.destructureDataStoreQn(qn);
      }
    } else if (args.length == 3) {
      if (typeof(args[1]) == "object") {
        let qn;

        [qn, opts, callback] = args;
        [schema, coll] = this.destructureDataStoreQn(qn);
      } else if (typeof(args[2]) == "object") {
        [schema, coll, opts] = args;
      } else {
        [schema, coll, callback] = args;
      }
    } else if (args.length >= 4) {
      [schema, coll, opts, callback] = args;
    }

    //(2) read
    return this.getSchema(schema).findCollection(coll, opts, callback);
  }
}
