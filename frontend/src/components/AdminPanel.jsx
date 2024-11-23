import {Row, Col, Collapse} from "antd"

export default function AdminPanel() {

    return (
        <Row gutter={[24, 32]} justify={"center"}>
            <Col xs={24} md={20} lg={10} xxl={8}>
                <Collapse 
                    items={[{
                        key: '1',
                        label: 'Add category',
                        children: <div></div>,
                    }]} 
                    bordered={false} 
                    defaultActiveKey={['1']} 
                />
            </Col>
            <Col xs={24} md={20} lg={10} xxl={8}>
                <Collapse 
                    items={[{
                        key: '2',
                        label: 'Add meal',
                        children: <div></div>,
                    }]} 
                    bordered={false} 
                    defaultActiveKey={['1']} 
                />
            </Col>
        </Row>
    )
}