# Message Incoming Context
MessageContext API reference

```js
import { MessageContext } from '@castery/caster';
```

### Constructor
Initialize new Incoming Message Context extends IncomingContext

```js
new MessageContext(caster);
```

| Param  | Type   | Description     |
|--------|--------|-----------------|
| caster | Caster | Instance Caster |

### getText
Returns text

```js
context.getText(); // => ?string
```

## Variables default
The default define variables

| Option      | Type   | Value      | Description     |
|-------------|--------|------------|-----------------|
| caster      | Caster | Caster     | Instance Caster |
| from        | Object | {id, type} | Inbox from      |
| to          | Object | {id, type} | Outbox to       |
| type        | string | message    | Type event      |
| text        | string | null       | Text message    |
| attachments | Array  | null       | Text message    |

## Creating your own context
Simple context
```js
class MyMessageContext extends MessageContext {
	constructor (caster, raw) {
		super(caster);

		this.platform = {
			id: <id>,
			name: 'my-platform'
		};
		this.text = raw.text;
		this.raw = raw;
	}
}
```
