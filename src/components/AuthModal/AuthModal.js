import React from "react";
import { AppContext } from "../../data/AppContext";
import { Button, Modal, Input, Row, Col,Icon } from "antd";
import Amplify, { Auth } from "aws-amplify";
Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  }
});
const AuthModal = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

 const close = () => {
  dispatch({ type: "authModal", payload: false });
  }

  const signin = async () => {
    try {
    const auth = await Auth.signIn(email, password);
    dispatch({ type: "isAuth", payload: {email,isAuth:true,auth} });
    close();
  } catch (error) {
    console.error(error)
  }
  }

  const signup = async () => {
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      await Auth.confirmSignUp(email, newUser.confirmationCode);
      await signin();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Modal
        title="User"
        visible={state.authModal}
        onOk={e => console.log(e)}
        onCancel={e => close()}
        footer={[
          <Button key="back" onClick={e => close()}>
            Cancel
          </Button>,
          <Button
            key="Signup"
            type="ghost"
            loading={false}
            onClick={e => signup(e)}
          >
            Signup
          </Button>,
          <Button
            key="Signin"
            type="primary"
            loading={false}
            onClick={e => signin(e)}
          >
            Signin
          </Button>
        ]}
      >
        <Row gutter={16} style={{marginBottom: '7px'}}>
          <Col span={24}>
            <Input prefix={<Icon type="mail"  />} value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Input prefix={<Icon type="lock"  />} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default AuthModal;
