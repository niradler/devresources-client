import React from "react";
import { Layout, Input,Icon } from "antd";
import "./TopNav.css";
import { AppContext } from "../../data/AppContext";
import Api from "../../services/Api";
import {isMobile} from "react-device-detect";
import notification from '../../components/Notification'
// import debounce from 'lodash/debounce'

const { Header } = Layout;
const Search = Input.Search;


function TopNav (){
  const { state,dispatch } = React.useContext(AppContext);

  const search = async (e) => {
    try {
      const term = e.target.value;
      dispatch({ type: "loading", payload: true });
      const res = await Api.searchResources({term:term});
      dispatch({ type: "term", payload: term });
      dispatch({ type: "resources", payload: res.data.searchResources });
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      notification('error',error.message);
    }
  };

  const openAuthModal = () =>{
    if(state.isAuth === false){
      dispatch({ type: "authModal", payload: true });
    }else{
      notification('info',"Already sign in.");
    }   
  }
    return (
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "15px",
          paddingRight: "15px"
        }}
      >
        <a className="navbar-item header-logo" style={{ fontSize: isMobile ? '17px' : '34px'}} href="/">
          Dev Resources
        </a>
        <div>       
          <Search
            onChange={(e)=>search(e)}
            placeholder="Search"
            style={{ width: 200 }}
          />
          <Icon style={{ marginLeft: '6px'}} type={state.loading ? "loading":"user" } onClick={openAuthModal} />
        </div>
      </Header>
    );
}

export default TopNav;
