import { Col, Card } from "antd";
import { Link } from "react-router-dom";

export default function Meal(props){
    const {
        idMeal, 
        strMeal, 
        strMealThumb
    } = props;

    const { Meta } = Card;

    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
            <Link to={`/meal/${strMeal}`}>
                <Card
                    hoverable
                    cover={<img src={strMealThumb} alt={strMeal} />}
                >
                    <Meta title={strMeal}/>
                </Card>
            </Link>
        </Col>
    );

}