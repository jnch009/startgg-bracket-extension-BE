const axios = require('axios');
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
      query: `query GetSetsInPhaseGroupByRound(
        $phaseGroup: ID!
        $currentRound: Int!
        $nextRound: Int!
      ) {
        phaseGroup(id: $phaseGroup) {
          phase {
            id
          }
          currentRound: sets(
            perPage: 256
            sortType: ROUND
            filters: { roundNumber: $currentRound }
          ) {
            nodes {
              id
              slots {
                entrant {
                  name
                }
              }
              completedAt
              fullRoundText
            }
          }
          nextRound: sets(
            perPage: 256
            sortType: ROUND
            filters: { roundNumber: $nextRound }
          ) {
            nodes {
              id
              slots {
                entrant {
                  name
                }
              }
              fullRoundText
            }
          }
        }
      }`,
      variables: {
        phaseGroup: req.body.phaseGroup,
        currentRound: req.body.currentRound,
        nextRound: req.body.nextRound
      }
    }
  })

  responseMessage.data.data.phaseGroup.currentRound.nodes.sort((a, b) => a.id - b.id);
  responseMessage.data.data.phaseGroup.nextRound.nodes.sort((a, b) => a.id - b.id);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      data: responseMessage.data.data
    }
  };
}