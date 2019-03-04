import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
const host_url = process.env.REACT_APP_GATEWAY_URL + '/graphql';

const client = new ApolloClient({
  uri: host_url
});

class Api {

  static resources(opt={}){
    const {page=1,pageSize=12,tags} = opt;
    return client.query({
      query: gql`
      query {
        resources(${tags ? `tags: "${tags}",` : ''} page: ${page}, pageSize: ${pageSize}) {
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

  static tags(){
    return client.query({
      query: gql`
      query {
        tags {
          _id
          title
          resources          
        }
      }
      `,
    })
  }

  static searchResources(opt={}){
    const {term='',page=1,pageSize=12} = opt;
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