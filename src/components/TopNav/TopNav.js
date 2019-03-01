import React from "react";
import { Layout, Input } from "antd";
import "./TopNav.css";
import { AppContext } from "../../data/AppContext";
import Api from "../../services/Api";

const { Header } = Layout;
const Search = Input.Search;


function TopNav (){
  const { dispatch } = React.useContext(AppContext);

  const search = async (e) => {
    try {
      const res = await Api.searchResources({term:e.target.value});
      dispatch({ type: "resources", payload: res.data.searchResources });
    } catch (error) {
      console.log(error);
    }
  };

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
        <a className="navbar-item header-logo" href="/">
          Dev Resources
        </a>
        <div>
          <Search
            onChange={(e)=>search(e)}
            placeholder="Search"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
      </Header>
    );
}

export default TopNav;
