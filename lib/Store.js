//imports
import DataStore from "./DataStore";

/**
 * An object store: a key/value store.
 */
export default class Store extends DataStore {
  /**
   * @override
   * @alias findOne
   */
  find(...args) {
    return this.findOne(...args);
  }
}
