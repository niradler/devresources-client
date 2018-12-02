import React, {Component} from 'react';
import {Layout} from 'antd';
import './TopNav.css'
const {Header} = Layout;

class TopNav extends Component {
  render() {
    return (
      <Header className="header">
        <a className="navbar-item header-logo" href="/" >
          Dev Resources
        </a>
      </Header>
    );
  }
}

export default TopNav;
