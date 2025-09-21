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
      query: `query streamQueue($tournamentID: ID!) {
          streamQueue(
            tournamentId: $tournamentID,
            includePlayerStreams: true
          ) {
            sets {
              id
              fullRoundText
              identifier
              round
              state
              slots {
                entrant {
                  name
                  id
                }
              }
              stream {
                id
                streamName
              }
              phaseGroup {
                id
                displayIdentifier
              }
              event {
                id
                videogame {
                  name
                }
              }
            }
          }
        }`,
      variables: {
        tournamentID: req.body.tournamentID,
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