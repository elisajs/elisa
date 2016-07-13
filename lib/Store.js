//imports
import sync from "./sync";
import DataStore from "./DataStore";

/**
 * An object store: a key/value store.
 */
export default class Store extends DataStore {
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
   * @alias findOne
   */
  find(...args) {
    return this.findOne(...args);
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

    if (!opts) opts = {};
    if (!query.id) throw new Error("Id field expected.");

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
   * @override
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

    if (!opts) opts = {};

    //(2) inject if needed
    if (docs instanceof Array) {
      for (let i = 0; i < docs.length; ++i) {
        let doc = docs[i];

        if (!doc.id) throw new Error("Id field expected.");
        if (this.hasInjection()) docs[i] = this.injectInto(doc);
      }
    } else {
      if (!docs.id) throw new Error("Id field expected.");
      if (this.hasInjection()) docs = this.injectInto(docs);
    }

    //(3) insert
    if (this.sync) sync((done) => this._insert(docs, opts, done));
    else this._insert(docs, opts, callback || function() {});
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
   * @override
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

    if (!opts) opts = {};
    if (!query.id) throw new Error("Id field expected.");

    //(2) update
    if (this.sync) return sync((done) => this._update(query, updt, opts, done));
    else this._update(query, updt, opts, callback || function() {});
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
   * @override
   */
  remove(query, ...args) {
    var opts, callback, nop;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    if (!opts) opts = {};
    if (!query.id) throw new Error("Id field expected.");

    nop = (Object.keys(query).length === 0);

    //(2) remove
    if (this.sync) {
      if (nop) return;
      else return sync((done) => this._remove(query, opts, done));
    } else {
      if (nop) process.nextTick(function() { if (callback) callback(); });
      else this._remove(query, opts, callback || function() {});
    }
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
