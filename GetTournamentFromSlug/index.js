const axios = require('axios')
const { retrieveAccessToken } = require("../utils.js");

module.exports = async function (context, req) {
    const responseMessage = await axios({
        method: 'post',
        url: "https://api.start.gg/gql/alpha",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await retrieveAccessToken()}`
        },
        data: {
            query: `query getTournamentEvent($tSlug: String!) {
                tournament(slug: $tSlug) {
                    events {
                        id
                        name 
                    }
                }
            }
        `,
            variables: {
                tSlug: req.body.tSlug
            }
        }
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            data: responseMessage.data.data
        }
    };
}