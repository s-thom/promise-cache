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
