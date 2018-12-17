# [@sthom/promise-cache](https://www.npmjs.com/package/@sthom/promise-cache)

A simple cache for Promises with a Map-like interface

## Usage

```sh
npm install --save @sthom/promise-cache
```

```js
import PromiseCache from '@sthom/promise-cache';

const myCache = new PromiseCache((key) => fetch(`https://example.com/${key}`));

// ...

// No entry in the cache, so a new one is created (inluding a new Reqeust)
const promiseA = myCache.get('foo');

// Reuses the existing entry, so no new request is made
const promiseB = myCache.get('foo');
console.log(promise1 === promise2); // true

// ...

// Delete a single entry
myCache.delete('foo');

// Clear all values
myCache.clear();
```

### Why is there no `cache.set()`?

It doesn't make sense for this library. The function used to create the Promises is part of the PromiseCache. If you need to put something into the cache, you just need to `.get()` it, the two operations end up being the same.

## Differences to some other Promise cache packages

You know, I really should have looked around before deciding to write this. However, I don't think I would've done much differently. Most of the libraries I found were actual full-on caches, while this is more a way to store and re-use results. I know the two sound the same, but there are differences to the uses.

### [node-cache-promise](https://www.npmjs.com/package/node-cache-promise)

A Promise wrapper around [node-cache](https://www.npmjs.com/package/node-cache), which is meant to be used as a generic cache for anything, and has a completely different use-case this this library.

It's also beholden to node-cache's limitations, such as keys only being strings (and technically numbers, which are then asserted to strings).

### [promise-caching](https://www.npmjs.com/package/promise-caching)

This one is pretty similar, but with two differences.

1. promise-caching supports a timeout, which this library (currently) does not.
2. In promise-caching you pass a function to each call of `cache.get()`. In this one, you pass it to the constructor, where it is re-used when necessary.

I think #2 is the major difference here. This library has you specify the function at the beginning, then re-uses it. This means that if you're using the cache in multiple places in your code, then you don't need to also pass around your Promise-returning function with it. However, this leads to lower flexibility, as you can't change the function for a single item, instead creating a new cache using that new function.

In the end, use whatever's better for your use-case. That's why having different packages is helpful.

### [request-promise-cache](https://www.npmjs.com/package/request-promise-cache)

request-promise-cache is a wrapper around [request](https://www.npmjs.com/package/request), and is only for requests. This library allows you to use other Promises, not just network-related ones.
