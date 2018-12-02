import React, {Component} from 'react';
import './App.css';
import Layout from '../Layout';
import {Row, Col} from 'antd';
import ResourceCard from '../ResourceCard';
import api from '../../services/api'
class App extends Component {
  state = {
    resources: []
  }
  async componentDidMount() {
    const resources = await api.search();
    if (resources) 
      this.setState({resources});
  }
  render() {
    const {resources} = this.state;

    return (
      <div className="App">
        <Layout>
          <Row key="d" gutter={16} className="box-space">
            {resources.map((resource, k2) => (
              <Col key={k2} span={6} style={{marginBottom:'5px',marginTop:'5px'}}>
                <ResourceCard {...resource}/>
              </Col>
            ))}
          </Row>
        </Layout>
      </div>
    );
  }
}

export default App;
