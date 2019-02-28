import React, { Component } from 'react';
import {Layout} from 'antd';
const { Footer} = Layout;
class MainFooter extends Component {
  render() {
    return <Footer style={{ textAlign: 'center' }}>
     © DevResources By <strong>Nir Adler</strong>
  </Footer>;
  }
}

export default MainFooter;
