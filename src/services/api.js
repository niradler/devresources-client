import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
const host_url = "https://func.devresources.site/resources/";

const client = new ApolloClient({
  uri: 'https://func.devresources.site/resources/graphql'
});

class Api {
  static search(term = '') {
    return fetch(`${host_url}search?q=${term}`)
      .then(res => res.json())
      .catch(e => console.log(e));
  }

  static resources(page=1,pageSize=12){
    return client.query({
      query: gql`
      query {
        resources(page: ${page}, pageSize: ${pageSize}) {
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