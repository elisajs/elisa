//imports
import sync from "./sync";

/**
 * A data store.
 *
 * @abstract
 * @protected
 *
 * @readonly schema:Schema  The schema.
 * @readonly name:string    The data store name.
 */
export default class DataStore {
  /**
   * Constructor.
   *
   * @param(attr) schema
   * @param(attr) name
   */
  constructor(schema, name) {
    Object.defineProperty(this, "schema", {value: schema, enumerable: true});
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "sync", {value: schema.sync});
    Object.defineProperty(this, "async", {value: schema.async});
  }

  /**
   * The database object.
   *
   * @type Database
   */
  get database() {
    return this.schema.database;
  }

  /**
   * @alias database
   */
  get db() {
    return this.database;
  }

  /**
   * The connection object to use.
   *
   * @protected
   * @type Connection
   */
  get connection() {
    return this.db.connection;
  }

  /**
   * Its qualified name.
   *
   * @type string
   */
  get qualifiedName() {
    return this.schema.qn + "." + this.name;
  }

  /**
   * @alias qualifiedName
   */
  get qn() {
    return this.qualifiedName;
  }

  /**
   * The qualified name.
   *
   * @type string
   */
  get fullQualifiedName() {
    return this.schema.fqn + "." + this.name;
  }

  /**
   * @alias fullQualifiedName
   */
  get fqn() {
    return this.fullQualifiedName;
  }

  /**
   * Check whether a document exists with the given id.
   *
   * @overload Synchronous connection.
   * @param id:string         The id to check.
   * @return boolean
   *
   * @overload Asynchronous connection.
   * @param id:string         The id to check.
   * @param callback:function The function to call: fn(error, exists).
   */
  hasId(id, callback) {
    if (this.sync) return sync((done) => this._hasId(id, done));
    else if (this.async) this._hasId(id, callback);
  }

  /**
   * Check whether a document exists with the given id.
   *
   * @protected
   * @abstract
   * @param id:string         The id to check.
   * @param callback:function The function to call: fn(error, exists).
   */
  _hasId() {
    throw new Error("Abstract method.");
  }

  /**
   * Return documents.
   *
   * @overload Synchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The get options.
   * @return Result
   *
   * @overload Asynchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The get options.
   * @param callback:function The function to call: fn(error, result).
   */
  find(query, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) find
    if (this.sync) return sync((done) => this._find(query, opts, done));
    else this._find(query, opts, callback);
  }

  /**
   * Return documents.
   *
   * @protected
   * @abstract
   * @param query:object      The query.
   * @param opts:object       The get options.
   * @param callback:function The function to call: fn(error, result).
   */
  _find() {
    throw new Error("Abstract method.");
  }

  /**
   * Return a document.
   *
   * @overload Synchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The get options.
   * @return object
   *
   * @overload Asynchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The get options.
   * @param callback:function The function to call: fn(error, object).
   */
  findOne(query, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) find
    if (this.sync) return sync((done) => this._findOne(query, opts, done));
    else this._findOne(query, opts, callback);
  }

  /**
   * Return the document with a given id.
   *
   * @protected
   * @abstract
   * @param query:object      The query.
   * @param opts:object       The get options.
   * @param callback:function The function to call: fn(error, object).
   */
  _findOne() {
    throw new Error("Abstract method.");
  }

  /**
   * Return all documents.
   *
   * @overload Synchronous connection.
   * @param opts?:object      The query options.
   * @return Result
   *
   * @overload Asynchronous connection.
   * @param opts?:object      The query options.
   * @param callback:function The function to call: fn(error, result).
   */
  findAll(...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) find
    if (this.sync) return sync((done) => this._findAll(opts, done));
    else if (this.async) this._findAll(opts, callback);
  }

  /**
   * Return all documents.
   *
   * @protected
   * @abstract
   * @param opts:object       The query options.
   * @param callback:function The function to call: fn(error, result).
   */
  _findAll() {
    throw new Error("Abstract method.");
  }

  /**
   * Return tne number of documents.
   *
   * @overload Synchronous connection.
   *
   * @overload Asynchronous connection.
   * @param opts?:object      The count options.
   * @param callback:function The function to call: fn(error, count).
   */
  count(...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    if (!opts) opts = {};

    //(2) count
    if (this.sync) return sync((done) => this._count(opts, done));
    else if (this.async) this._count(opts, callback);
  }

  /**
   * Return the number of documents.
   *
   * @protected
   * @param opts:object       The count options.
   * @param callback:function The function to call: fn(error, count).
   */
  _count(opts, callback) {
    this._findAll(opts, (error, res) => {
      if (error) callback(error);
      else callback(undefined, res.length);
    });
  }

  /**
   * Insert documents.
   *
   * @overload Synchronous connection.
   * @param doc:object          The document to insert.
   * @param opts?:Object        The set options.
   *
   * @overload Synchronous connection.
   * @param docs:object[]       The documents to insert.
   * @param opts?:Object        The set options.
   *
   * @overload Asychronous connection.
   * @param doc:object          The document to insert.
   * @param callback?:function  The function to call: fn(error).
   *
   * @overload  Asynchronous connection.
   * @param doc:object          The document to insert.
   * @param opts?:object         The set options.
   * @param callback?:function  The function to call: fn(error).
   *
   * @overload Asynchronous connection.
   * @param docs:object[]       The documents to insert.
   * @param callback?:function  The function to call: fn(error).
   *
   * @overload Asynchronous connection.
   * @param docs:object[]       The documents to insert.
   * @param opts?:object        The set options.
   * @param callback?:function  The function to call: fn(error).
   */
  insert(docs, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) insert
    if (this.sync) return sync((done) => this._insert(docs, opts, done));
    else this._insert(docs, opts, callback);
  }

   /**
    * Insert documents.
    *
    * @protected
    * @abstract
    *
    * @overload  One key-value.
    * @param doc:object         The document to insert.
    * @param opts:object        The set options.
    * @param callback:function  The function to call: fn(error).
    *
    * @overload  Several key-values.
    * @param docs:object[]      The documents to insert.
    * @param opts:object        The set options.
    * @param callback:function  The function to call: fn(error).
    */
  _insert() {
    throw new Error("Abstract method.");
  }

  /**
   * Update documents.
   *
   * @overload Synchronous/asynchronous connection.
   * @param query:object      The query object.
   * @param updt:object       The update object.
   * @param opts?:object      The update options.
   *
   * @overload Asynchronous connection
   * @param query:object      The query object.
   * @param upd:object        The update object.
   * @param opts:object       The update options.
   * @param callback:function The function to call: fn(error).
   */
  update(query, updt, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length == 2) {
      [opts, callback] = args;
    }

    //(2) update
    if (this.sync) return sync((done) => this._update(query, updt, opts, done));
    else this._update(query, updt, opts, callback);
  }

  /**
   * Update a document.
   *
   * @protected
   * @abstract
   *
   * @overload
   * @param query:object        The query object.
   * @param update:object       The update object.
   * @param opts:object         The update options.
   * @param callback?:function  The function to call: fn(error).
   */
  _update() {
    throw new Error("Abstract method.");
  }

  /**
   * Remove documents.
   *
   * @overload Synchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The remove options.
   *
   * @overload Asynchronous connection.
   * @param query:object      The query object.
   * @param opts?:object      The remove options.
   * @param callback:fuction  The function to call: fn(error).
   */
  remove(query, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) remove
    if (this.sync) return sync((done) => this._remove(query, opts, done));
    else this._remove(query, opts, callback);
  }

  /**
   * Remove a key.
   *
   * @protected
   * @abstract
   * @param query:object      The query object.
   * @param opts:object       The options: rev (string).
   * @param callback:function The function to call: fn(error).
   */
  _remove() {
    throw new Error("Abstract method.");
  }
}
