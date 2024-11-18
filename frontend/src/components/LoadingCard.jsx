import { Col, Card, Skeleton } from "antd";

export default function LoadingCard() {
    const { Meta } = Card;
    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
            <Card
                className="random-meal-block"
                cover={
                    <Skeleton.Image
                        className="random-meal-image"
                        style={{ width: "100%", height: "100%" }}
                    />
                }
            >
                <Meta
                    title={
                        <span className="random-meal-meta-block">
                            <span className="random-meal-title-block">
                                <Skeleton.Avatar
                                    active
                                    shape="circle"
                                    style={{ marginRight: "16px" }}
                                />
                                <Skeleton.Input active />
                            </span>
                            <Skeleton.Button
                                active
                                style={{ width: "100px", marginLeft: "10px" }}
                            />
                        </span>
                    }
                />
            </Card>
        </Col>
    );
}
