import React from "react";
import { AppContext } from "../../data/AppContext";
import { Button, Modal, Input, Row, Col, Icon } from "antd";
import Amplify from '../../services/Amplify';
const { Auth } = Amplify;

const AuthModal = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);  

  const close = () => {
    setErrorMessage(null);
    dispatch({ type: "authModal", payload: false });
  };

  const signin = async () => {
    try {
       await Auth.signIn(email, password);
       dispatch({ type: "isAuth", payload: true });
      setErrorMessage(null);
      close();
    } catch (error) {
      setErrorMessage("Signin: " + error.message ? error.message : error);
      setLoading(false);
      console.error({ error });
    }
  };

  const signout = async () => {
    try {
      await Auth.signOut();
      dispatch({ type: "isAuth", payload: false });
      setErrorMessage(null);
      close();
    } catch (error) {
      setErrorMessage("signout: " + error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      await Auth.confirmSignUp(email, newUser.confirmationCode);
      await signin();
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Signup: " + error.message);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        title="User"
        visible={state.authModal && state.isAuth === false}
        onOk={e => console.log(e)}
        onCancel={e => close()}
        footer={[
          <Button key="back" onClick={e => close()}  loading={loading}>
            Cancel
          </Button>,
          <Button
            key="SignOut"
            type="ghost"
            loading={loading}
            onClick={e => signout(e)}
          >
            SignOut
          </Button>,
          <Button
            key="Signup"
            type="ghost"
            loading={loading}
            onClick={e => signup(e)}
            disabled={password.length < 6}
          >
          SignUp
          </Button>,
          <Button
            key="Signin"
            type="primary"
            loading={loading}
            onClick={e => signin(e)}
            disabled={password.length < 6}
          >
            SignIn
          </Button>
        ]}
      >
        <Row gutter={16} style={{ marginBottom: "7px" }} key="m-r-1">
          <Col span={24}>
            <Input
              prefix={<Icon type="mail" />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Col>
        </Row>
        <Row gutter={16} key="m-r-2">
          <Col span={24}>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}             
              placeholder="Password"
            />
          </Col>
        </Row>
        <Row gutter={16} key="m-r-3">
          <Col style={{color:'red'}} span={24}>
          {errorMessage}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default AuthModal;
