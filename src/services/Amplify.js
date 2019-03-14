import Amplify from "aws-amplify";

const config = {
  Auth: {
    mandatorySignIn: false,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  },
  API: {
    graphql_endpoint: process.env.REACT_APP_GATEWAY_URL + "/graphql",
    graphql_endpoint_iam_region: process.env.REACT_APP_GATEWAY_REGION
  }
};

const noAuthAmplify = () => {
  Amplify.configure(config);
  return Amplify;
};

const withAuthAmplify = () => {
  config.API.graphql_endpoint =
    process.env.REACT_APP_GATEWAY_URL + "/private/graphql";
  config.API.graphql_headers = async () => {
    const { Auth } = Amplify;
    const session = await Auth.currentSession().catch(e => {
      throw e;
    });
    const token = session.getIdToken().getJwtToken();
    return {
      Authorization: token
    };
  };
  Amplify.configure(config);
  return Amplify;
};

noAuthAmplify();

export { withAuthAmplify, noAuthAmplify };

export default Amplify;
