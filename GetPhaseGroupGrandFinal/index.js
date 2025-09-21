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
      query: `query GetSetsInPhaseGroupGrandFinal($grandFinalRound: Int!, $grandFinalRoundAlt: Int, $phaseGroup: ID!) {
        phaseGroup(id: $phaseGroup) {
          grandFinal: sets(filters: { roundNumber: $grandFinalRound }) {
            nodes {
              fullRoundText
              slots {
                entrant {
                  name
                }
              }
            }
          }
          grandFinalAlt: sets(filters: { roundNumber: $grandFinalRoundAlt }) {
            nodes {
              fullRoundText
              slots {
                entrant {
                  name
                }
              }
            }
          }
        }
      }`,
      variables: {
        grandFinalRound: req.body.grandFinalRound,
        grandFinalRoundAlt: req.body.grandFinalRoundAlt || -1,
        phaseGroup: req.body.phaseGroup
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