# Incoming Context
IncomingContext API reference

```js
import { IncomingContext } from '@castery/caster';
```

### Constructor
Initialize new Incoming Context extends Context

```js
new IncomingContext(caster);
```

| Param  | Type   | Description     |
|--------|--------|-----------------|
| caster | Caster | Instance Caster |

### getType
Returns context type

```js
context.getType(); // => string
```

### getPlatformId
Returns platform id

```js
context.getPlatformId(); // => mixed
```

### getPlatformName
Returns platform name

```js
context.getPlatformId(); // => string
```

### getRaw
Returns raw original event

```js
context.getRaw(); // => ?Object
```

## Variables default
The default define variables

| Option   | Type   | Value      | Description            |
|----------|--------|------------|------------------------|
| caster   | Caster | Caster     | Instance Caster        |
| platform | Object | {id, name} | Name platform incoming |
| type     | string | incoming   | Type event             |
| raw      | Object | null       | Original event         |

## Creating your own context
Simple context
```js
class MyIncomingContext extends IncomingContext {
	constructor (caster, raw) {
		super(caster);

		this.platform = {
			id: <id>,
			name: 'my-platform'
		};
		this.type = 'my-type';
		this.raw = raw;
	}
}
```
