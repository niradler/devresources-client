import { notification } from 'antd';

const openNotificationWithIcon = (type="success",message="",description="") => {
  notification[type]({
    message: message,
    description: description,
    duration:2,
    placement:"bottomRight"
  });
};

export default openNotificationWithIcon;