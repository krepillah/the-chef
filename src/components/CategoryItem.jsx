import { Link } from "react-router-dom";
import { Col, Card } from "antd";

export default function CategoryItem(props) {
    const {
        strCategory,
        strCategoryThumb,
    } = props;

    const { Meta } = Card;
    return (
        <>
            <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
                <Link to={`/category/${strCategory}`}>
                    <Card
                        hoverable
                        cover={<img src={strCategoryThumb} alt={strCategory} />}
                    >
                        <Meta title={strCategory} />
                    </Card>
                </Link>
            </Col>
        </>
    );
}
