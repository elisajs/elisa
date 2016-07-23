/**
 * A find() result.
 */
export default class Result {
  /**
   * Constructor.
   *
   * @param(attr) docs
   */
  constructor(docs) {
    Object.defineProperty(this, "docs", {value: docs || [], enumerable: true});
  }

  /**
   * @alias docs
   */
  get rows() {
    return this.docs;
  }

  /**
   * The docs/rows count.
   *
   * @type number
   */
  get length() {
    return this.docs.length;
  }

  /**
   * @alias length
   */
  get size() {
    return this.length;
  }

  /**
   * Add a new document/row.
   */
  add(doc) {
    this.docs.push(doc);
  }

  /**
   * Return a random document.
   *
   * @type object
   */
  random() {
    return this.docs[Math.floor(Math.random() * this.length)];
  }
}
