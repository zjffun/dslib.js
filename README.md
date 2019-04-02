dslib.js is a JavaScript data structure library.

English | [简体中文](./README-zh_CN.md) 

# Features

- Written in TypeScript with predictable static types.

# Environment Support

Every environment support [ECMAScript 2015](https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects).

# Install

```bash
npm install 1010543618/dslib.js
```

```bash
yarn add 1010543618/dslib.js
```

# Usage

CommonJS

```js
const List = require("dslib.js").List;

let list = new List(...[10, 105, 4, 3, 6, 1, 8]);
console.log(...list.sort((a, b) => a - b));
```

ES6 Modules

```js
import { List } from "dslib.js";

let list = new List(...[10, 105, 4, 3, 6, 1, 8]);
console.log(...list.sort((a, b) => a - b));
```

# Documention
https://1010543618.github.io/dslib.js/docs/
