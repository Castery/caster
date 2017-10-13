# Caster
Caster API reference

```js
import { Caster } from '@castery/caster';
```

### Constructor
Initialize new Caster app

```js
new Caster([options]);
```

| Param   | Type   | Description                 |
|---------|--------|-----------------------------|
| options | Object | [Options bot](#options-bot) |

#### Options bot

| Option | Type   | Description      |
|--------|--------|------------------|
| name   | string | Name bot (maybe) |

### setOptions
Sets options

```js
caster.setOptions(options); // => Caster
```

| Param   | Type   | Description                 |
|---------|--------|-----------------------------|
| options | Object | [Options bot](#options-bot) |

### isStarted
Returns the launch status of the bot

```js
caster.isStarted(); // => boolean
```

### start
Running the bot

```js
caster.start(); // => Promise
```

### stop
Stops the bot

```js
caster.stop(); // => Promise
```

### use
Adds the functionality of caster

```js
caster.use(platform); // => this
```

| Param    | Type     | Description          |
|----------|----------|----------------------|
| platform | Platform | Integration platform |

```js
caster.use(Platform, options); // => this
```

| Param    | Type     | Description          |
|----------|----------|----------------------|
| Platform | Platform | Integration platform |
| options  | Object   | Options a platform   |

### hear
Hear convenience, read [hears.use](hears.md#use)

```js
caster.hear(conditions, handler); // => this
```

| Param      | Type     | Description        |
|------------|----------|--------------------|
| conditions | mixed    | Сonditions         |
| handler    | function | Middleware handler |

### addPlatform
Adds a platform

```js
caster.addPlatform(platform); // => void
```

| Param    | Type     | Description          |
|----------|----------|----------------------|
| platform | Platform | Integration platform |

### removePlatform
Removes a platform

```js
caster.removePlatform(platform); // => void
```

| Param    | Type     | Description          |
|----------|----------|----------------------|
| platform | Platform | Integration platform |

### dispatchIncoming
Dispatching incoming middleware

```js
caster.dispatchIncoming(context); // => Promise<Object>
```

| Param   | Type            | Description      |
|---------|-----------------|------------------|
| context | IncomingContext | Incoming context |

### dispatchOutcoming
Dispatching outcoming middleware

```js
caster.dispatchOutcoming(context); // => Promise<Object>
```

| Param   | Type            | Description      |
|---------|-----------------|------------------|
| context | IncomingContext | Incoming context |
