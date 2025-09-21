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
      query: `query event($eventId: ID!, $entrantName: String!) {
        event(id: $eventId) {
          id,
          entrants(query: {
            filter: {
              name: $entrantName
            }
          }){
            nodes {
              id
              name
            }
          }
        }
      }`,
      variables: {
        eventId: req.body.eventId,
        entrantName: req.body.entrantName
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