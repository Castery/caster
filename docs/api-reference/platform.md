# Platform
Platform API reference, based on all platform

Inherit [EventEmitter](https://nodejs.org/docs/latest/api/events.html)

```js
import { Platform } from '@castery/caster';
```

## Variables default
The default define variables

| Option     | Type    | Value | Description                   |
|------------|---------|-------|-------------------------------|
| options    | Object  | {}    | Options platform              |
| _isStarted | boolean | false | Launch status of the platform |

### setOptions
Sets options

```js
platform.setOptions(options); // => Caster
```

| Param   | Type   | Description      |
|---------|--------|------------------|
| options | Object | Options platform |

### getOptions
Returns options

```js
platform.getOptions(); // => Object
```

### getOptionsSchema
Returns the [joi](https://github.com/hapijs/joi) schema for option validation

```js
platform.getOptionsSchema(); // => JoiSchemaObject
```

### isStarted
Returns the launch status of the platform

```js
platform.isStarted(); // => boolean
```

### start
Running the platform

```js
platform.start(); // => Promise
```

### stop
Stops the platform

```js
platform.stop(); // => Promise
```

### subscribe
Subscribe caster for platform events

```js
platform.subscribe(caster); // => Promise
```

### unsubscribe
Unsubscribe caster for platform events

```js
platform.unsubscribe(caster); // => Promise
```

### getAdapter
Returns used platform adapter

```js
platform.getAdapter(); // => Object
```

## Usage
```js
class MySimplePlatform extends Platform {
	constructor () {
		super();

		// My constructor
	}

	setOptions (options) {
		super(options);

		// Set options

		return this;
	}

	async start () {
		this._isStarted = true;

		// Start
	}

	async stop () {
		// Stop

		this._isStarted = false;
	}

	async subscribe (caster) {
		// Adds caster subscribe
	}

	async unsubscribe (caster) {
		// Removes caster subscribe
	}
}
```
