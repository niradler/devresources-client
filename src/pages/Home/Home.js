import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Button } from "antd";
import ResourceCard from "../../components/ResourceCard";
import Api from "../../services/Api";
import { AppContext } from "../../data/AppContext";
import {isMobile} from "react-device-detect";
import "./Home.css";

function Home() {
  const { state, dispatch } = React.useContext(AppContext);

  const getResources = async () => {
    try {
      dispatch({ type: "loading", payload: true });
      const opt = { page:state.page };
      if (state.tags) opt.tags = state.tags;
      if (state.term) opt.term = state.term;
      if (opt.term) {
        const res = await Api.searchResources(opt);
        dispatch({ type: "resources", payload: res.data.searchResources });
      }else{
        const res = await Api.resources(opt);
        dispatch({ type: "resources", payload: res.data.resources });
      }
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    dispatch({ type: "page", payload: state.page +1 });
    getResources();
  };

  const previousPage = async () => {
    dispatch({ type: "page", payload: state.page -1 });
    getResources();
  };

  const init = () => {
    getResources();
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="Home">
      <Layout>
        <Row  key="resources-list" gutter={16} className="box-space">
          {state.resources.map((resource, i) => (
            <Col
              key={`${resource.title}-${i}`}
              span={isMobile ? 24 : 6}
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <ResourceCard
               {...resource} />
            </Col>
          ))}
        </Row>
        <Row key="pagination" gutter={16} className="box-space">
          {(state.resources.length > 0 || state.page > 1) && !state.loading && (
            <div className="pagination">
              <Button disabled={state.page === 1} onClick={previousPage}>
                Previous
              </Button>
              <Button disabled={state.resources.length < 12} onClick={nextPage}>
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
