const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    https: true,
    useProxy: true,
    env: 'stage-stable',
    appUrl: [ '/insights/drift' ]
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../'),
        exposes: {
            './RootApp': resolve(__dirname, '../src/DevEntry')
        },
        exclude: [ 'react-router-dom' ],
        shared: [
            {
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: '*'
                }
            }
        ]
    })
);

module.exports = {
    ...webpackConfig,
    plugins
};
