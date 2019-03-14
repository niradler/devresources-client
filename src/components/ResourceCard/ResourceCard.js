import React from "react";
import Image from "react-graceful-image";
import { Card, Icon } from "antd";
import { AppContext } from "../../data/AppContext";
import "./ResourceCard.css";
import { favoritesMap, handleError } from "../../services/helpers";
import Api from "../../services/Api";
import notification from "../../components/Notification";
const { Meta } = Card;

const ResourceCard = ({ _id, title, image_url, description, link, github }) => {
  const { state, dispatch } = React.useContext(AppContext);

  const toggleFav = async (resourceId, type) => {
    try {
      dispatch({ type: "loading", payload: true });
      if (type) {
        const res = await Api.deleteFavorite(resourceId);
        dispatch({
          type: "favorites",
          payload: favoritesMap(res.data.deleteFavorite)
        });
        notification("success", "Deleted!");
      } else {
        const res = await Api.addFavorite(resourceId);
        dispatch({
          type: "favorites",
          payload: favoritesMap(res.data.addFavorite)
        });
        notification("success", "Adeed!");
      }
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      dispatch({ type: "loading", payload: false });
      handleError(error);
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
  actions.push(
    <Icon
      type="heart"
      style={{ color: state.favorites[_id] ? "#ff4d4fe6" : "#9c9c9c" }}
      onClick={() => toggleFav(_id, state.favorites[_id])}
    />
  );

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
