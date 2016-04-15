//imports
import sync from "./sync";

/**
 * A collection query.
 *
 * @readonly source:Collection  The source collection.
 */
export default class CollectionQuery {
  /**
   * Constructor.
   *
   * @param(attr) soource
   */
  constructor(source) {
    Object.defineProperty(this, "source", {value: source, enumerable: true});
    Object.defineProperty(this, "sync", {value: source.sync});
    Object.defineProperty(this, "async", {value: source.async});
    Object.defineProperty(this, "fields", {value: {}, enumerable: true});
  }

  /**
   * Project the specified fields.
   *
   * @overload
   * @param field:string
   * @return CollectionQuery
   *
   * @overload
   * @param ...fields:string[]
   * @return CollectionQuery
   *
   * @overload
   * @param fields:object
   * @return CollectionQuery
   */
  project(...args) {
    //(1) set projections
    if (args.length === 1) {
      if (typeof(args[0]) == "string") this.fields[args[0]] = args[0];
      else for (let field in args[0]) this.fields[field] = args[0][field];
    } else if (args.length > 1) {
      for (let field of args) this.fields[field] = field;
    }

    //(2) return
    return this;
  }

  /**
   * Set the filter.
   *
   * @param cond:object The condition.
   * @return QueryCollection
   */
  filter(cond) {
    delete this.condition;
    Object.defineProperty(this, "condition", {value: cond, configurable: true});
    return this;
  }

  /**
  * Set the number maximum of documents.
  *
  * @param count:number  The number.
  * @return QueryCollection
  *
  */
  limit(count) {
    if (typeof(count) == "number") Object.defineProperty(this, "maxLimit", {value: count, configurable: true});
    return this;
  }

  /**
   * Set the number of documents to skip at the start of the result.
   *
   * @param count:number  The number.
   * @return QueryCollection
   */
  offset(count) {
    if (typeof(count) == "number") Object.defineProperty(this, "skip", {value: count, configurable: true});
    return this;
  }

  /**
   * Order the result.
   *
   * @overload
   * @param field:string        The field name.
   *
   * @overload
   * @param ...fields:string[]  The field names.
   *
   * @overload
   * @param fields:object       The fields object.
   */
  sort(...fields) {
    //(1) arguments
    if (fields.length == 1) {
      if (typeof(fields[0]) == "string") fields = {[fields[0]]: "ASC"};
      else fields = fields[0];
    } else if (fields.length >= 2) {
      let ff = {};
      for (let fld of fields) ff[fld] = "ASC";
      fields = ff;
    }

    //(2) set order clause
    Object.defineProperty(this, "order", {value: fields, configurable: true});

    //(3) return
    return this;
  }

  /**
   * Run the query, being able to set the filter.
   *
   * @overload Synchronous connection.
   * @param query?:object     The query object.
   * @param opts?:object      The query options.
   * @return Result
   *
   * @overload Asynchronous connection.
   * @param query?:object     The query object.
   * @param opts?:object      The query options.
   * @param callback:function The function to call: fn(error, result).
   */
  find(...args) {
    var query, opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else query = args[0];
    } else if (args.length == 2) {
      if (args[1] instanceof Function) [query, callback] = args;
      else [query, opts] = args;
    } else if (args.length >= 3) {
      [query, opts, callback] = args;
    }

    //(2) set filter
    if (query) this.filter(query);

    //(3) find
    return this.run(opts, callback);
  }

  /**
   * Run the query, being able to set the filter.
   *
   * @overload Synchronous connection.
   * @param query?:object     The query object.
   * @param opts?:object      The query options.
   * @return object
   *
   * @overload Asynchronous connection.
   * @param query?:object     The query object.
   * @param opts?:object      The query options.
   * @param callback:function The function to call: fn(error, object).
   */
  findOne(...args) {
    var query, opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else query = args[0];
    } else if (args.length == 2) {
      if (args[1] instanceof Function) [query, callback] = args;
      else [query, opts] = args;
    } else if (args.length >= 3) {
      [query, opts, callback] = args;
    }

    //(2) set filter
    if (query) this.filter(query);

    //(3) find
    if (this.sync) {
      return this.run(opts).docs[0];
    } else if (this.async) {
      this.run(opts, (error, result) => {
        if (error) callback(error);
        else callback(undefined, result.docs[0]);
      });
    }
  }

  /**
   * Run the query.
   *
   * @overload Synchronous connection.
   * @param opts?:object      The query options.
   * @return Result
   *
   * @overload Asynchronous connection.
   * @param opts?:object      The query options.
   * @param callback:function The function to call: fn(error, result).
   */
  run(...args) {
    var opts, callback;

    //(1) arguments
    if (args.length == 1) {
      if (args[0] instanceof Function) callback = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [opts, callback] = args;
    }

    if (!opts) opts = {};

    //(2) run
    if (this.sync) return sync((done) => this._run(opts, done));
    else this._run(opts, callback);
  }

  /**
   * Run the query.
   *
   * @protected
   * @abstract
   * @param opts:object       The run options.
   * @param callback:function The function to call.
   */
  _run() {
    throw new Error("Abstract method.");
  }
}
