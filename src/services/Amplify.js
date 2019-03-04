import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  },
  API: {
    graphql_endpoint: process.env.REACT_APP_GATEWAY_URL + '/graphql',
    graphql_endpoint_iam_region: process.env.REACT_APP_GATEWAY_REGION,
    endpoints: [
      {
        name: "favorite",
        endpoint: process.env.REACT_APP_GATEWAY_URL,
        region: process.env.REACT_APP_GATEWAY_REGION
      },
    ]
  }
});

export default Amplify;