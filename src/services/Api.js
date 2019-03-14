import { API, graphqlOperation } from "aws-amplify";
import { withAuthAmplify, noAuthAmplify } from "./Amplify";
import { getCurrentUser } from "./helpers";
const queryGraphQl = async ({ query, params = {}, auth }) => {
  if (auth) {
    await getCurrentUser();
    withAuthAmplify();
    const res = await API.graphql(graphqlOperation(query, params));
    return res;
  } else {
    noAuthAmplify();
    const res = await API.graphql(graphqlOperation(query, params));
    return res;
  }
};

class Api {
  static getFavoritesResources() {
    return queryGraphQl({
      query: `
        query {
          favoritesResources {
             _id
          title
          description
          link
          image_url
          github {
            forks
            stargazers_count
            language
          }
          }
        }
      `,
      auth: true
    });
  }

  static getFavorites() {
    return queryGraphQl({
      query: `
        query {
          favorites {
            resourceId
          }
        }
      `,
      auth: true
    });
  }

  static addFavorite(resourceId) {
    return queryGraphQl({
      params: { resourceId },
      query: `
      mutation {
        addFavorite(resourceId: "${resourceId}") {
      resourceId
      }
    }`,
      auth: true
    });
  }

  static deleteFavorite(resourceId) {
    return queryGraphQl({
      params: { resourceId },
      query: `
      mutation {
        deleteFavorite(resourceId: "${resourceId}") {
      resourceId
      }
    }`,
      auth: true
    });
  }

  static resources(opt = {}) {
    const { page = 1, pageSize = 12, tags } = opt;
    return queryGraphQl({
      query: `
      query {
        resources(${
          tags ? `tags: "${tags}",` : ""
        } page: ${page}, pageSize: ${pageSize}) {
          _id
          title
          description
          link
          image_url
          github {
            forks
            stargazers_count
            language
          }
        }
      }
      `
    });
  }

  static tags() {
    return queryGraphQl({
      query: `
        query {
          tags {
            _id
            title
            resources
          }
        }
      `
    });
  }

  static searchResources(opt = {}) {
    const { term = "", page = 1, pageSize = 12 } = opt;
    return queryGraphQl({
      query: `
      query {
        searchResources(page: ${page}, pageSize: ${pageSize}, term: "${term}") {
          _id
          title
          description
          link
          image_url
          github {
            forks
            stargazers_count
            language
          }
        }
      }
      `
    });
  }
}

export default Api;
