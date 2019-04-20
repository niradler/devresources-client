import React from "react";
import { AppContext } from "../../data/AppContext";
import { Button, Modal, Input, Row, Col } from "antd";
import notification from "../Notification";
import Api from "../../services/Api";
const { TextArea } = Input;

const AddModal = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const close = () => {
    setLoading(false);
    dispatch({ type: "addModal", payload: false });
  };

  const add = async () => {
    try {
      setLoading(true);
      const resource = {
        title,
        link,
        description,
        imageUrl
      };
      await Api.addResource(resource);
      notification("success", "Resource added, please wait for auditing.");
      close();
    } catch (error) {
      setLoading(false);
      notification("error", "Resource creation has failed.");
    }
  };

  const checkIsValid = () => {
    if (title && link && description && imageUrl) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  React.useEffect(() => {
    checkIsValid();
  }, [title, link, description]);

  const footer = [
    <Button key="back" onClick={e => close()} loading={loading}>
      Cancel
    </Button>,
    <Button
      key="Add"
      type="primary"
      loading={loading}
      onClick={add}
      disabled={!isValid}
    >
      Add Resource
    </Button>
  ];

  return (
    <div>
      <Modal
        title="New Resource"
        visible={state.addModal}
        onOk={e => add(e)}
        onCancel={e => close()}
        footer={footer}
      >
        <div>
          <Row gutter={16} style={{ marginBottom: "7px" }} key="t-r-1">
            <Col span={24}>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "7px" }} key="l-r-2">
            <Col span={24}>
              <Input
                value={link}
                type="url"
                onChange={e => setLink(e.target.value)}
                placeholder="Link"
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "7px" }} key="l-r-3">
            <Col span={24}>
              <Input
                value={imageUrl}
                type="url"
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Image url"
              />
            </Col>
          </Row>
          <Row gutter={16} key="d-r-4">
            <Col span={24}>
              <TextArea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};
export default AddModal;
