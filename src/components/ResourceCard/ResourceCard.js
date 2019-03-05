import React from "react";
import Image from "react-graceful-image";
import { Card, Icon } from "antd";
import { AppContext } from "../../data/AppContext";
import "./ResourceCard.css";
import {favoritesMap} from '../../services/helpers'
import Api from "../../services/Api";
const { Meta } = Card;

const ResourceCard = ({ _id, title, image_url, description, link, github }) => {
  const { state,dispatch } = React.useContext(AppContext);

  const addToFav = async resourceId => {
    try {     
      const res = await Api.addFavorites(resourceId)
      dispatch({ type: "favorites", payload: favoritesMap(res.favorites) });
      alert(res.message);     
    } catch (error) {
      dispatch({ type: "authModal", payload: true });
    }
  };

  const actions = [];
  if (github) {
    if (github.stargazers_count)
      actions.push(
        <span>
          {github.stargazers_count} <Icon type="star" />
        </span>
      );
    if (github.forks)
      actions.push(
        <span>
          {github.forks} <Icon type="fork" />
        </span>
      );
  }
  actions.push(<Icon type="heart" style={{color:state.favorites[_id] ? '#ff4d4fe6' : '#9c9c9c'}} onClick={() => addToFav(_id)} />);

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
};
export default ResourceCard;
