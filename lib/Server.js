/**
 * A server object.
 *
 * @abstract
 * @readonly(#) connection:Connection The connection to use.
 */
export default class Server {
  /**
   * Constructor.
   *
   * @param(attr) connection
   */
  constructor(connection) {
    Object.defineProperty(this, "connection", {value: connection});
  }

  /**
   * The hostname.
   *
   * @abstract
   * @type String
   */
  get host() {
    throw new Error("Abstract property.");
  }

  /**
   * The port.
   *
   * @abstract
   * @type number
   */
  get port() {
    throw new Error("Abstract property.");
  }

  /**
   * The server version.
   *
   * @abstract
   * @type string
   */
  get version() {
    throw new Error("Abstract property.");
  }
}
