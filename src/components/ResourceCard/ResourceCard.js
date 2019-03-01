import React from "react";
import Image from "react-graceful-image";
import { Card, Icon } from "antd";
import "./ResourceCard.css";
const { Meta } = Card;
const ResourceCard = ({ title, image_url, description, link, github }) => (
  <Card
    className="ResourceCard"
    hoverable
    actions={
      github
        ? [
            <span>
              {" "}
              <Icon type="star" />
              {github.stargazers_count}
            </span>,
            <span>
              {" "}
              <Icon type="fork" />
              {github.forks}             
            </span>,
            <Icon type="heart" />
          ]
        : [<Icon type="heart" />]
    }
    style={{
      width: "100%",
      height: "260px"
    }}
  >
    <a href={link}>
      <Meta
        avatar={<Image src={image_url} width="90" height="90" alt={title} />}
        title={title}
        description={description}
      />
    </a>
  </Card>
);

export default ResourceCard;
