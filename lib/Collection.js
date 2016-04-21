//imports
import sync from "./sync";
import DataStore from "./DataStore";

/**
 * A collection.
 *
 * @readonly(#) inject:object The fields to inject.
 */
export default class Collection extends DataStore {
  /**
   * Return a query object.
   *
   * @return CollectionQuery
   */
  query() {
    throw new Error("Abstract method.");
  }

  /**
   * @alias query
   */
  q(...args) {
    return this.query(...args);
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
  find(...args) {
    return this.q().find(...args);
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
  findOne(...args) {
    return this.q().findOne(...args);
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
        if (this.hasInjection()) docs[i] = this.injectInto(doc);
      }
    } else {
      if (this.hasInjection()) docs = this.injectInto(docs);
    }

    //(3) insert
    if (this.sync) return sync((done) => this._insert(docs, opts, done));
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

    //(2) inject if needed
    if (this.hasInjection()) query = this.injectInto(query);

    //(3) update
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
    if (!query) throw new Error("Query expected.");

    //(2) inject if needed
    if (this.hasInjection()) query = this.injectInto(query);

    //(3) remove
    nop = (Object.keys(query).length === 0);

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
}
