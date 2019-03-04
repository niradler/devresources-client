import Amplify from './Amplify';
const {Auth} = Amplify;

const signOut = () => Auth.signOut();
const currentAuthenticatedUser = async() => Auth.currentAuthenticatedUser();
const currentSession = async() => Auth.currentSession();
