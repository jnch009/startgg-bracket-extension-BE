const axios = require('axios')
const { retrieveAccessToken } = require("../utils.js");

module.exports = async function (context, req) {
    const resp = await axios({
        method: 'post',
        url: "https://api.start.gg/gql/alpha",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await retrieveAccessToken()}`
        },
        data: {
            query: `query HelloWorld {
  tournament(slug: "evo2018") {
    name
  }
}`
        }
    });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: resp.data
    };
}