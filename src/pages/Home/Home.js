import React from "react";
import Layout from "../../components/Layout";
import { Row, Col } from "antd";
import ResourceCard from "../../components/ResourceCard";
import api from "../../services/api";
import { AppContext } from "../../data/AppContext";

function Home() {
  const { state, dispatch } = React.useContext(AppContext);

  const init = async () => {
    try {
        console.log('init',state)
      const resources = await api.search();
      dispatch({ type: "resources", payload: resources });
    } catch (error) {
      console.log(error);
    }
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
      </Layout>
    </div>
  );
}

export default Home;
