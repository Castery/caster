# Hears
Hears API reference

```js
import { Hears } from '@castery/caster';
```

### Constructor
Initialize new Hears

```js
new Hears;
```

### use
Register listen condition

```js
hears.use(condition, handler); // => this
```

| Param     | Type                   | Description         |
|-----------|------------------------|---------------------|
| condition | string | Array<string> | Condition triggered |
| handler   | function               | Middleware handler  |

```js
hears.use(conditions, handler); // => this
```

| Param      | Type     | Description          |
|------------|----------|----------------------|
| conditions | Object   | Conditions triggered |
| handler    | function | Middleware handler   |

The condition can be a string, a regex or an object. In case of an object, all conditions must match for the handler to be called.

### getMiddleware
Returns the handler for middleware

```js
hears.getMiddleware(); // => function
```
