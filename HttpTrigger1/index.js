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
      query: `query PoolSeeds($phaseGroupId: ID!, $eventSlug: String!) {
          phaseGroup(id: $phaseGroupId) {
            id
            phase {
              id
              event {
                id
                slug
                tournament {
                  id
                  events(filter: {
                    slug: $eventSlug
                  }) {
                    phases {
                      id
                      phaseGroups{
                        nodes {
                          id
                          standings {
                            pageInfo {
                              total
                            }
                          }
                        }
                      }
                      name
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
            }`,
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