2019Oct03 IWP6 Create React App Experimentation

## Getting Started

https://github.com/facebook/create-react-app

https://create-react-app.dev/docs/getting-started

npx create-react-app my-app
cd my-app
npm start

## Testing Harness

npx -p @storybook/cli sb init

npm run storybook

## Learning

Stateless functional components

https://dev.to/iam_timsmith/class-components-vs-stateless-functional-components-51he

...props expansion

https://reactjs.org/docs/components-and-props.html

Whether you declare a component as a function or a class, it must never modify its own props

```
import React from 'react';
import { Card, CardHeader, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
```

https://github.com/FortAwesome/react-fontawesome

```
// This binding is necessary to make `this` work in the callback
        this.evaluate = this.evaluate.bind(this);
```


0951> About to bring in the math.js library

npm install mathjs

1013> Handling math changes, time to do some styling!

https://reactjs.org/docs/faq-styling.html

https://github.com/chenglou/react-motion

1032> Adding my first community react component


https://casesandberg.github.io/react-color/

npm install react-color --save


https://reactstrap.github.io/


npm install --save bootstrap
npm install --save reactstrap react react-dom



## Development Log

= Create a text editor field that's connected to math.js library parsing.

= Bring math.js, redner sbould calculate

= Color Picker

= Layout Reactstrap

~ Dynamic content rendering base don in coming Json 1103

2019Oct08 Reactivating

~ Add / Delete Input

- Delete INput

- Drag to mov Input

- INputs in React Cards



- Want to get to a solid editor


NOTE the Hotel biz center has an AWESOME cannon printer. Can I do my print work here in teh AM? for free?!






## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
