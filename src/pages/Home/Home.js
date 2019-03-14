import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Button } from "antd";
import ResourceCard from "../../components/ResourceCard";
import Api from "../../services/Api";
import { AppContext } from "../../data/AppContext";
import { isMobile } from "react-device-detect";
import "./Home.css";
import { favoritesMap, handleError } from "../../services/helpers";

function Home() {
  const { state, dispatch } = React.useContext(AppContext);
  const getResources = async page => {
    try {
      dispatch({ type: "loading", payload: true });
      const opt = { page: page || state.page };
      if (state.tags) opt.tags = state.tags;
      if (state.term) opt.term = state.term;
      if (opt.term) {
        const res = await Api.searchResources(opt);
        dispatch({ type: "resources", payload: res.data.searchResources });
      } else {
        const res = await Api.resources(opt);
        dispatch({ type: "resources", payload: res.data.resources });
      }
      dispatch({ type: "loading", payload: false });
      if (page) dispatch({ type: "page", payload: page });
    } catch (error) {
      dispatch({ type: "loading", payload: false });
      handleError(error);
    }
  };

  const nextPage = async () => {
    getResources(state.page + 1);
  };

  const previousPage = async () => {
    getResources(state.page - 1);
  };

  const restore = async () => {
    try {
      const res = await Api.getFavorites();
      dispatch({
        type: "favorites",
        payload: favoritesMap(res.data.favorites)
      });
      dispatch({ type: "isAuth", payload: true });
    } catch (error) {
      console.log(error);
    }
  };

  const init = () => {
    getResources();
    restore();
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="Home">
      <Layout>
        <Row key="resources-list" gutter={16} className="box-space">
          {state.resources.map((resource, i) => (
            <Col
              key={`${resource.title}-${i}`}
              span={isMobile ? 24 : 6}
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <ResourceCard {...resource} />
            </Col>
          ))}
        </Row>
        <Row key="pagination" gutter={16} className="box-space">
          {(state.resources.length > 0 || state.page > 1) && (
            <div className="pagination">
              <Button
                disabled={state.page === 1}
                onClick={previousPage}
                loading={state.loading}
              >
                Previous
              </Button>
              <Button
                disabled={state.resources.length < 12}
                onClick={nextPage}
                loading={state.loading}
              >
                Next
              </Button>
            </div>
          )}
        </Row>
      </Layout>
    </div>
  );
}

export default Home;
