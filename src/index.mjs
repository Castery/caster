import Middleware from 'middleware-io';

import Caster from './caster';
import Context from './context';
import Platform from './platform';
import Hears from './middlewares/hears';
import MessageContext from './contexts/message';
import IncomingContext from './contexts/incoming';

import IncomingMiddleware from './middlewares/incoming';
import OutcomingMiddleware from './middlewares/outcoming';

export {
	Hears,
	Caster,
	Context,
	Platform,
	Middleware,
	MessageContext,
	IncomingContext,
	IncomingMiddleware,
	OutcomingMiddleware
};

export * from './errors';
export { middlewarePriority, contextProps } from './util/constants';
export { generateWarningLog, generateRandomID } from './util/helpers';

export default Caster;
