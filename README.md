<p align="center">
<a href="https://travis-ci.org/castery/caster"><img src="https://img.shields.io/travis/castery/caster.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/@castery/caster"><img src="https://img.shields.io/npm/v/@castery/caster.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@castery/caster"><img src="https://img.shields.io/npm/dt/@castery/caster.svg?style=flat-square" alt="NPM downloads"></a>
</p>

🤖 Caster is a universal powerful [Node.js](https://nodejs.org/) module with open source code for creating multi platform bots!

| 📖 [Documentation](docs/) | 📦 [Modules](https://www.npmjs.com/search?q=caster-) | 🤖 [Examples](https://github.com/castery/caster-examples) |
|--------------------------|------------------------------------------------------|-------------------------------------------------------------|

## Features
- Object-oriented
- Using modern development tools

## Installation
**[Node.js](https://nodejs.org/) 8.0.0 or newer is required**  

### Yarn
Recommended, auto assembly
```shell
yarn add @castery/caster
```

### NPM
```shell
npm install @castery/caster --save
```

## Usage
```js
import { Caster } from '@castery/caster';

const caster = new Caster();

/* Add platforms integrations */

caster.start()
.then(() => {
	console.log('Caster started');
})
.catch(() => {
	console.error('Caster started fail');
});
```
