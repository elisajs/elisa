//imports
import Namespace from "./Namespace";
import sync from "./sync";

/**
 * A data store.
 *
 * @abstract
 * @protected
 *
 * @readonly namespace:Namespace  The namespace.
 * @readonly name:string          The data store name.
 */
export default class DataStore {
  /**
   * Constructor.
   *
   * @param base:object The namespace or database object.
   * @param(attr) name
   * @param opts:object The data store options: inject (object).
   */
  constructor(base, name, opts) {
    if (base instanceof Namespace) {
      Object.defineProperty(this, "database", {value: base.db, enumerable: true});
      Object.defineProperty(this, "namespace", {value: base, enumerable: true});
    } else {
      Object.defineProperty(this, "database", {value: base, enumerable: true});
      Object.defineProperty(this, "namespace", {value: undefined, enumerable: true});
    }

    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "sync", {value: base.sync});
    Object.defineProperty(this, "async", {value: base.async});

    if (!opts) opts = {};
    Object.defineProperty(this, "inject", {value: opts.inject});
  }

  /**
   * @alias namespace
   */
  get ns() {
    return this.namespace;
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
   * Check whether an injection has been set.
   *
   * @return boolean
   */
  hasInjection() {
    return !!this.inject;
  }

  /**
   * Injects the default fields into a query.
   * Return the query with the injected fields.
   *
   * @protected
   * @param query:object  The query.
   * @param opts:object   The inject options: overwrite (boolean) the query parameter.
   * @return object
   */
  injectInto(query, opts = {overwrite: false}) {
    var q;

    //(1) arguments
    if (!query) query = {};

    //(2) inject
    if (this.inject) {
      if (opts.overwrite) q = query;
      else q = Object.assign({}, query);
      for (let field in this.inject) q[field] = this.inject[field];
    } else {
      q = query;
    }

    //(3) return
    return q;
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
    return (this.ns ? this.ns.qn + "." : "") + this.name;
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
    return (this.ns ? this.ns.fqn : this.db.name) + "." + this.name;
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
   * Return the number of documents that has.
   *
   * @param opts:object       The query options.
   * @param callback:function The function to call: fn(error, count).
   */
  _count() {
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

    if (!opts) opts = {};

    //(2) find
    if (this.sync) {
      return sync((done) => this._findAll(opts, done));
    } else if (this.async) {
      if (!callback) throw new Error("Callback expected.");
      this._findAll(opts, callback);
    }
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
   * Insert documents.
   *
   * @abstract
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
    throw new Error("Abstract method.");
  }

  /**
   * Update documents.
   *
   * @abstract
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
  update() {
    throw new Error("Abstract method.");
  }

  /**
   * Save a document.
   *
   * @abstract
   *
   * @overload Synchronous/asynchronous connection.
   * @param doc:object    The document to save.
   * @param opts?:object  The save options.
   *
   * @overload Asynchronous connection.
   * @param doc:object        The document to save.
   * @param callback:function The function to call: fn(error).
   *
   * @overload Asychronous connection.
   * @param doc:object        The document to save.
   * @param opts:object       The save options.
   * @param callback:function The function to call: fn(error).
   *
   */
  save(doc, ...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (typeof(args[0]) == "object") opts = args[0];
      else callback = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    if (!opts) opts = {};

    //(2) inject if needed
    if (this.hasInjection()) query = this.injectInto(query);

    //(3) check whether id existing
    if (!doc.hasOwnProperty("id")) throw new Error("id field must be indicated.");

    //(4) save
    if (this.sync) return sync((done) => this._save(doc, opts, done));
    else this._update(doc, opts, callback || function() {});
  }

  /**
   * Save a document.
   *
   * @abstract
   * @protected
   *
   * @param doc:object        The document to save.
   * @param opts:object       The save options.
   * @param callback:function The function to call: fn(error).
   */
  _save() {
    throw new Error("Abstract method.");
  }

  /**
   * Remove documents.
   * If query is {}, nothing is removed. To empty the data store,
   * use truncate().
   *
   * @abstract
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
  remove() {
    throw new Error("Abstract method.");
  }

  /**
   * Empty the data store.
   *
   * @overload Synchronous connection.
   * @param opts?:object        The truncate options.
   *
   * @overload Asynchronous connection.
   * @param opts?:object        The truncate options.
   * @param callback?:function  The function to call: fn(error).
   */
  truncate(...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    //(2) truncate
    if (this.sync) return sync((done) => this._truncate(opts, done));
    else this._truncate(opts, callback || function() {});
  }

  /**
   * Empty the data store.
   *
   * @protected
   * @abstract
   * @param opts:object       The truncate options.
   * @param callback:function The function to call: fn(error).
   */
  _truncate(opts, callback) {
    throw new Error("Abstract method.");
  }
}
