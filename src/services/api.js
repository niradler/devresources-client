import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
const host_url = 'https://func.devresources.site/resources/graphql';

const client = new ApolloClient({
  uri: host_url
});

class Api {

  static resources(page=1,pageSize=12){
    return client.query({
      query: gql`
      query {
        resources(page: ${page}, pageSize: ${pageSize}) {
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
    })
  }

  static tags(page=1,pageSize=12){
    return client.query({
      query: gql`
      query {
        tags(page: ${page}, pageSize: ${pageSize}) {
          _id
          title
          resources          
        }
      }
      `,
    })
  }

  static searchResources(term='',page=1,pageSize=12){
    return client.query({
      query: gql`
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
      `,
    })
  }
}

export default Api