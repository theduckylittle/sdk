# Boundless SDK

## Using SDK from Source

Using SDK from source requires running `npm run dist` to create a `dist/` subdirectory
which produces the structure used for the npm package.

```
# Clone the repository
git clone https://github.com/boundlessgeo/sdk.git
# Enter the repo
cd sdk
# install dependencies
npm install
# create the package
npm run dist
# enter the package directory
cd dist/
# link to SDK
npm link
```

## Testing and the canvas module

The test suite uses the NPM `canvas` module to test certain interactions
with OpenLayers.  This requires `node-gyp` and the following dependencies:

**Debian/Ubuntu**

```bash
sudo apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev g++
```

It is possible to run the tests without the `canvas` module. In this case a number
of tests will be skipped.


## Ejecting Create React App


1. `yarn eject`
2. `yarn add webpack-cli`
3. Modify `config/webpack.config.prod.js`, change 149 from:
    ```
    include: paths.appSrc,
    ```
    To:
    ```
    include: [paths.appSrc, '../node_modules'],
    ```
4. Modify `config/webpack.config.dev.js`, comment out line 46,
   hot reloading will not work inside of a served environment.

5. Modify `package.json` by ading the following line after `"scripts": {`:
    ```
    "watch": "NODE_ENV=development webpack --watch --config ./config/webpack.config.dev.js",
    ```
6. Serving content.

    After the watch task has been setup the `build/` directory will need to be
    served using a HTTP server.
 
