import Middleware from 'middleware-io';

import Caster from './caster';
import Context from './context';
import Platform from './platform';
import Hears from './middlewares/hears';
import Collection from './util/collection';
import MessageContext from './contexts/message';
import IncomingContext from './contexts/incoming';

export {
	Hears,
	Caster,
	Context,
	Platform,
	Collection,
	Middleware,
	MessageContext,
	IncomingContext
};

export * from './errors';
export { MIDDLEWARE_PRIORITY, CONTEXT_PROPS } from './util/constants';

export default Caster;
