import React from "react";
import Image from "react-graceful-image";
import { Card, Icon } from "antd";
import "./ResourceCard.css";
const { Meta } = Card;
const ResourceCard = ({ title, image_url, description, link, github }) => {
  const actions = []
  if (github) {
    if(github.stargazers_count)actions.push(<span>{github.stargazers_count} <Icon type="star" /></span>)
    if(github.forks)actions.push(<span>{github.forks} <Icon type="fork" /></span>)
  }
  actions.push(<Icon type="heart" />)
  return (
  <Card
    className="ResourceCard"
    hoverable
    actions={actions}
    style={{
      width: "100%",
      height: "260px"
    }}
  >
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Meta
        avatar={<Image src={image_url} width="90" height="90" alt={title} />}
        title={title}
        description={description}
      />
    </a>
  </Card>
);
  }
export default ResourceCard;
