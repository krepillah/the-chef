import { Col, Card, Button } from "antd"

export default function LoadingCard(){
    const {Meta} = Card;
    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
                <Card
                    loading = "true"
                    cover={
                    <div style={{height: "200px", width: "320px"}}></div>
                    }
                >
                    <Meta title={
                        <span className="random-meal-meta-block">
                            <span className="random-meal-title-block">
                                Title
                            </span>
                            <Button type="primary" iconPosition={"end"} style={{ whiteSpace: 'nowrap', marginLeft: "10px" }}>
                                Get random
                            </Button>
                        </span>
                    }/>
                </Card>
        </Col>
    )
}