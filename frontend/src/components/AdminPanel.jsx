import {Row, Col, Collapse} from "antd"
import AddCategoryForm from "./AddCategoryForm"
import AddMealForm from "./AddMealForm"

export default function AdminPanel({setAuthorized, catalog}) {

    return (
        <Row gutter={[24, 32]} justify={"center"}>
            <Col xs={24} md={20} lg={10} xxl={8}>
                <Collapse 
                    items={[{
                        key: '1',
                        label: 'Add category',
                        children: <AddCategoryForm setAuthorized={setAuthorized}/>,
                    }]} 
                    bordered={false} 
                />
            </Col>
            <Col xs={24} md={20} lg={10} xxl={8}>
                <Collapse 
                    items={[{
                        key: '2',
                        label: 'Add meal',
                        children: <AddMealForm setAuthorized={setAuthorized} catalog={catalog}/>,
                    }]} 
                    bordered={false} 
                />
            </Col>
        </Row>
    )
}