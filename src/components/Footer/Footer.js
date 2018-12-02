import React, { Component } from 'react';
import {Layout} from 'antd';
const { Footer} = Layout;
class MainFooter extends Component {
  render() {
    return <Footer style={{ textAlign: 'center' }}>
    Ant Design ©2018 Created by Ant UED
  </Footer>;
  }
}

export default MainFooter;
