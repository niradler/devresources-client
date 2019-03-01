import React from "react";
import Layout from "../../components/Layout";
import { Row, Col } from "antd";
import ResourceCard from "../../components/ResourceCard";
import Api from "../../services/Api";
import { AppContext } from "../../data/AppContext";

function Home() {
  const { state, dispatch } = React.useContext(AppContext);

  const init = async () => {
    try {
      const res = await Api.resources();
      dispatch({ type: "resources", payload: res.data.resources });
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
