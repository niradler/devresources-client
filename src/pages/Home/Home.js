import React from "react";
import Layout from "../../components/Layout";
import { Row, Col,Button } from "antd";
import ResourceCard from "../../components/ResourceCard";
import Api from "../../services/Api";
import { AppContext } from "../../data/AppContext";
import './Home.css';

function Home() {
  const { state, dispatch } = React.useContext(AppContext);
  const [page, setPage] = React.useState(1);

  const getResources = async () => {
    try {
      const res = await Api.resources({page});
      dispatch({ type: "resources", payload: res.data.resources });
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    setPage(page+1);
    getResources();
  };

  const init = () => {
    getResources();
  };

  React.useEffect(
    () =>{ 
        init()
    },
    []
  );

  return (
    <div className="Home">
      <Layout>
        <Row key="resources-list" gutter={16} className="box-space">
          {state.resources.map((resource, k2) => (
            <Col
              key={k2}
              span={6}
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <ResourceCard {...resource} />
            </Col>
          ))}
        </Row>
        <Row key="resources-list" gutter={16} className="box-space">
          {state.resources.length > 0 && <div className="pagination">
          <Button >Previous</Button>
          <Button onClick={nextPage}>Next</Button>
          </div>}
        </Row> 
      </Layout>
    </div>
  );
}

export default Home;
