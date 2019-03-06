import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {getToken} from './helpers'
const host_url = process.env.REACT_APP_GATEWAY_URL + '/graphql';

const client = new ApolloClient({uri: host_url});

class Api {

  static async getFavoritesResources() {
    try {
      const token = await getToken();
      const res = await fetch(process.env.REACT_APP_GATEWAY_URL + '/favorites/resources', {
        headers: new Headers({Authorization: token})
      });

      return res.json();
    } catch (error) {
      throw error;
    }
  }

  static async getFavorites() {
    try {
      const token = await getToken();
      const res = await fetch(process.env.REACT_APP_GATEWAY_URL + '/favorites', {
        headers: new Headers({Authorization: token})
      });

      return res.json();
    } catch (error) {
      throw error;
    }
  }

  static async addFavorites(resourceId) {
    try {
      const token = await getToken();
      const res = await fetch(process.env.REACT_APP_GATEWAY_URL + '/favorite', {
        method: "post",
        headers: new Headers({Authorization: token}),
        body: JSON.stringify({resourceId})
      });
      
      return res.json();
    } catch (error) {
      throw error;
    }
  }

  static async deleteFavorite(resourceId) {
    try {
      const token = await getToken();
      const res = await fetch(process.env.REACT_APP_GATEWAY_URL + '/favorite/' + resourceId, {
        method: "delete",
        headers: new Headers({Authorization: token})
      });
      
      return res.json();
    } catch (error) {
      throw error;
    }
  }

  static resources(opt = {}) {
    const {
      page = 1,
      pageSize = 12,
      tags
    } = opt;
    return client.query({
      query: gql `
      query {
        resources(${tags
        ? `tags: "${tags}",`
        : ''} page: ${page}, pageSize: ${pageSize}) {
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
    })
  }

  static tags() {
    return client.query({query: gql `
      query {
        tags {
          _id
          title
          resources          
        }
      }
      `})
  }

  static searchResources(opt = {}) {
    const {
      term = '',
      page = 1,
      pageSize = 12
    } = opt;
    return client.query({query: gql `
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
      `})
  }
}

export default Api