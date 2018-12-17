/**
 * A Promise Cache
 *
 * @template KeyType,ResolutionType
 */
export default class PromiseCache {
  /**
   * Creates an instance of PromiseCache.
   *
   * @param {(key: KeyType) => Promise<ResolutionType>} fn
   * @memberof PromiseCache
   */
  constructor(fn) {
    /**
     * @type {Map<KeyType, Promise<ResolutionType>>}
     */
    this.map = new Map();

    this.fn = fn;
  }

  /**
   * Gets a Promise from the cache.
   *
   * If no entry is present, then a new entry will be created using the function passed in the constructor
   *
   * @param {KeyType} key
   * @returns {Promise<ResolutionType>}
   * @memberof PromiseCache
   */
  get(key) {
    if (this.map.has(key)) {
      return this.map.get(key);
    } else {
      const promise = this.fn(key);
      this.map.set(key, promise);
      return promise;
    }
  }

  /**
   * Whether the cache has a Promise cached for this key
   *
   * @param {KeyType} key
   * @returns {boolean}
   * @memberof PromiseCache
   */
  has(key) {
    return this.map.has(key);
  }

  /**
   * Deletes a key (and Promise) from the cache
   *
   * @param {KeyType} key
   * @memberof PromiseCache
   */
  delete(key) {
    this.map.delete(key);
  }

  /**
   * Clears all values from the cache
   *
   * @memberof PromiseCache
   */
  clear() {
    this.map.clear();
  }
}
