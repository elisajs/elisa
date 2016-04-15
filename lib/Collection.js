//imports
import DataStore from "./DataStore";

/**
 * A collection.
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
   * @override
   */
  _findAll(opts, callback) {
    this.q().filter({})._run(opts, callback);
  }

  /**
   * @override
   */
  _find(query, opts, callback) {
    this.q().filter(query)._run(opts, callback);
  }

  /**
   * @override
   */
  _findOne(query, opts, callback) {
    this.q().filter(query)._run(opts, function(error, res) {
      if (error) callback(error);
      else callback(undefined, res.docs[0]);
    });
  }
}
