import { Row, Col, Switch, Typography } from "antd";
import {  CheckOutlined, CloseOutlined  } from '@ant-design/icons';
import EditCategoryForm from "./EditCategoryForm";

export default function Title(props) {
  const { title, highlighted, description, authorized, setAuthorized, editable, setEditable } = props;
  const {Text} = Typography;

  return (
    <Row justify="center">
      <Col xs={24} xl={16} xxl={12} className="title-text-block">
        {authorized?(
            <>
                <Text strong style = {{marginRight: "10px"}}>Edit</Text>
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    value={editable}
                    onChange={setEditable}
                />
            </>
        ):("")}
        {!authorized || !editable ? (
          <>
            <h1>
              {title} <i className="accent-color w-600">{highlighted}</i>
            </h1>
            <h3>{description}</h3>
          </>
        ) : (
            <EditCategoryForm highlighted={highlighted} description={description} setAuthorized={setAuthorized}/>
        )}
      </Col>
    </Row>
  );
}