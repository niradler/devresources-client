import React from 'react';
import { Menu,Layout,Icon} from 'antd';
import './SideNav.css';
import Api from "../../services/Api";
import { AppContext } from "../../data/AppContext";
import MediaQuery from 'react-responsive';
const { Sider} = Layout;
const SubMenu = Menu.SubMenu;

function SideNav () {
  const { dispatch } = React.useContext(AppContext);
  const [collapsed, setCollapsed] = React.useState(false);
  const [tags, setTags] = React.useState([]);

  const init = async () => {
    try {
      const res = await Api.tags();
      setTags([{title:'all'},...res.data.tags]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByTag = async (title) => {
    try {
      if (title === 'all') {
        const res = await Api.resources(opt);
        const opt = { page:1 };
        dispatch({ type: "tags", payload: null });
        dispatch({ type: "resources", payload: res.data.resources });
      }else{
        const res = await Api.resources({tags:title});
        dispatch({ type: "tags", payload: title });
        dispatch({ type: "resources", payload: res.data.resources });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(
    () =>{ 
        init()
    },[])

    return (
       <MediaQuery query="(min-device-width: 1224px)">
       <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={()=>setCollapsed(!collapsed)}
        >
          <Menu theme="dark" mode="inline" defaultOpenKeys={['Categories']}  defaultSelectedKeys={['all']}>
            <SubMenu key="Categories" title={<span><Icon type="build" /><span>Categories</span></span>}>
            {tags.map(tag=>(
              <Menu.Item key={tag.title} onClick={()=>filterByTag(tag.title)} className="capital">
              {tag.title}
            </Menu.Item>
            ))}
            </SubMenu>
          </Menu>
        </Sider>
    </MediaQuery>
    );
}

export default SideNav;
