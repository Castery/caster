# Incoming Middleware
Incoming Middleware API reference

### getSchemaUse

```js
caster.incoming.getSchemaUse(); // => JoiSchemaObject
```

### use
Adds middleware

```js
caster.incoming.use(middleware);
```

| Param      | Type   | Description           |
|------------|--------|-----------------------|
| middleware | object | Middleware parameters |

Middleware parameters

| options     | Type     | Description                             |
|-------------|----------|-----------------------------------------|
| name        | string   | Name middleware (required)              |
| handler     | function | Handler middleware (required)           |
| order       | number   | Ranking position among other middleware |
| enabled     | boolean  | Is enable middleware                    |
| description | string   | Description middleware                  |

### dispatch
Run middleware chain

```js
caster.incoming.dispatch(context); // => Promise
```

| Param   | Type            | Description               |
|---------|-----------------|---------------------------|
| context | IncomingContext | Incoming context instance |

### forEach
Executes a provided function once for each middleware

```js
caster.incoming.forEach(fn); // => this
```

| Param | Type     | Description |
|-------|----------|-------------|
| fn    | function | Callback    |

### filter
Сreates a new array with all elements middleware that pass the test

```js
caster.incoming.filter(fn); // => this
```

| Param | Type     | Description |
|-------|----------|-------------|
| fn    | function | Callback    |

### sort
Sorts the elements middleware in place

```js
caster.incoming.sort(fn); // => this
```

| Param | Type     | Description |
|-------|----------|-------------|
| fn    | function | Callback    |

### find
Returns the value of the first middleware that satisfies the provided testing function. Otherwise null is returned

```js
caster.incoming.find(fn); // => ?Object
```

| Param | Type     | Description |
|-------|----------|-------------|
| fn    | function | Callback    |

### reload
Reboot middleware

```js
caster.incoming.reload(); // => this
```
