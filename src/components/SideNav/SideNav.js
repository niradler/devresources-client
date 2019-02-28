import React, { Component } from 'react';
import { Menu,Layout,Icon} from 'antd';
import './SideNav.css';
const { Sider} = Layout;
const SubMenu = Menu.SubMenu;

class SideNav extends Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={()=>this.setState({collapsed:!this.state.collapsed})}
        >
          <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} >
            <SubMenu key="sub1" title={<span><Icon type="book" /><span>Categories</span></span>}>
            <Menu.Item key="1">
              Nodejs
            </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
    );
  }
}

export default SideNav;
