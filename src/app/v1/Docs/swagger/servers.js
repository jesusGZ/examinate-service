const { SERVICE } = require('../../../../configs');

module.exports = { servers: [{ url: `http://localhost:${SERVICE.LOCAL_PORT}/`, description: 'Dev server' }] };
