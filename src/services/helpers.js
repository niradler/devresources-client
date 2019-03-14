import notification from "../components/Notification";
import Amplify from "./Amplify";
const { Auth } = Amplify;

const getCurrentUser = () => Auth.currentAuthenticatedUser();

const handleError = error => {
  console.error(error);
  notification(
    "error",
    error.message ||
      (error.errors && error.errors[0].message) ||
      "Please SignIn."
  );
};

const getToken = async () => {
  const session = await Auth.currentSession().catch(e => {
    throw e;
  });
  const token = session.getIdToken().getJwtToken();
  return token;
};

const favoritesMap = favs =>
  favs.reduce((favs, fav) => {
    favs = { ...favs, [fav.resourceId]: true };
    return favs;
  }, {});

export { handleError, getToken, favoritesMap, getCurrentUser };
