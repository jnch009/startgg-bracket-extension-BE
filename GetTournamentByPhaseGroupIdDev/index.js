const axios = require('axios')
const { retrieveAccessToken } = require("../utils.js");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.log(req.body);
  const resp = await axios({
    method: 'post',
    url: "https://api.start.gg/gql/alpha",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await retrieveAccessToken()}`
    },
    data: {
      query: `query PoolSeeds($phaseGroupId: ID!, $eventSlug: String!) {
  phaseGroup(id: $phaseGroupId) {
    phase {
      event {
        tournament {
          events(filter: {slug: $eventSlug}) {
            id
            phases {
              phaseGroups {
                nodes {
                  id
                  standings {
                    pageInfo {
                      total
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    standings {
      pageInfo {
        total
      }
    }
  }
}
`,
      variables: {
        phaseGroupId: req.body.phaseGroupId,
        eventSlug: req.body.eventSlug
      }
    }
  })

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      data: resp.data.data
    }
  };
}