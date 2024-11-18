import { Row, Col } from "antd";

export default function Title(props) {
    const { title, highlighted, description } = props;

    return (
        <Row justify="center">
            <Col xs={24} xl={16} xxl={12} className="title-text-block">
                <h1>
                    {title} <i className="accent-color w-600">{highlighted}</i>
                </h1>
                <h3>{description}</h3>
            </Col>
        </Row>
    );
}
