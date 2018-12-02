import React, {Component} from 'react';
import {Layout} from 'antd';
import TopNav from '../TopNav';
import SideNav from '../SideNav';
import Footer from '../Footer';
import './Layout.css'
const { Content} = Layout;

class MainLayout extends Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideNav />
        <Layout>
          <TopNav />
          <Content className="content">
            {this.props.children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
