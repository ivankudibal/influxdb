// TBD - leverage influxdbv2 REST API
const axios = require('axios');

const active_config = require(__basedir + '/bonitoo.conf.json').active;
const config = require(__basedir + '/bonitoo.conf.json')[active_config];
const defaultUser = require(__basedir + '/bonitoo.conf.json').default_user;

axios.defaults.baseURL = `${config.protocol}://${config.host}:${config.port}`;

/* Uncomment to debug
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})
*/

const flush = async () => {
    // console.log('calling flush')
    await axios.get('/debug/flush');
};

/* inspirace
export const setupUser = (): Cypress.Chainable<Cypress.Response> => {
    return cy.fixture('user').then(({username, password, org, bucket}) => {
        return cy.request({
            method: 'POST',
            url: '/api/v2/setup',
            body: {username, password, org, bucket},
        })
    })
}
*/

// user { username: 'name', password: 'password', org; 'orgname', bucket: 'bucketname' }
const setupUser = async(user) => {
    await axios.post('/api/v2/setup', user);
};

module.exports = { flush, config, defaultUser, setupUser };

//flush()
