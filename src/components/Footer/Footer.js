import React, { Component } from 'react';
import {Layout} from 'antd';
const { Footer} = Layout;
class MainFooter extends Component {
  render() {
    return <Footer style={{ textAlign: 'center' }}>
     © DevResources By <a href="https://niradler.com"><strong>Nir Adler</strong></a>
  </Footer>;
  }
}

export default MainFooter;
