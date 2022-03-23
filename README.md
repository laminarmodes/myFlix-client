# MyFlix

The MyFlix Client is the User Interface that obtains information about movies through the movies API and database.

## Installation

Confirm that Node and npm are already installed and try to use the Chrome browser.

Ensure parecel 2.*... is installed, if not install for all projects

```bash
npm install -g parcel@next
```

Inside my-flix-client foldder, make sure to install packages and dependencies needed for React development

```bash
npm install --save react react-dom
```

Axios

```bash
npm install axios --save
```

propTypes

```bash
npm install --save prop-types
```

React Bootstrap

```bash
npm install --save react-bootstrap
```

React Router

```bash
yarn add react-router-dom
```

Redux

```bash
npm install redux --save
```

React Redux

```bash
npm install react-redux --save
```

Redux Devtools

```bash
npm install --save redux-devtools-extension
```

## Rnnning locally

To build using parcel

```bash
npx parcel src/index.html
```

For any issues delete the mode modules and package.json and reinstall

```bash
rm -rf node_modules package-lock.json && npm i
```

Running app locally http://localhost:1234/

## Usage

The MyFlix Client is the basic UI for the MyFlix App written in React

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
