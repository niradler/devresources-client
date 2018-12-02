import React from 'react';
import Image from "react-graceful-image";
import {Card} from 'antd';
const {Meta} = Card;
const ResourceCard = ({title, image_url, description, link}) => (
  <Card hoverable style={{
    width: '100%',
    height: "260px"
  }}>
    <a href={link}>
      <Meta
        avatar={< Image src = {
        image_url
      }
      width = "90" height = "90" alt = {
        title
      } />}
        title={title}
        description={description}/>
    </a>
  </Card>
)

export default ResourceCard;
