import { Col, Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { mealInStorage } from "../api";
import { useEffect, useState } from "react";

export default function Meal(props){
    const {
        idMeal, 
        strMeal, 
        strMealThumb,
    } = props;

    const [inStorage, setInStorage] = useState(false);

    const { Meta } = Card;

    const removeItem = (event, id) => {
        event.preventDefault();
        sessionStorage.removeItem(id);
        setInStorage(false);
    }

    const setItem = (event, id) => {
        event.preventDefault();
        sessionStorage.setItem(id, id);
        setInStorage(true);
    }

    useEffect(() => {
        if(mealInStorage(idMeal)){
            setInStorage(true);
        }
    },[idMeal])

    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
            <Link to={`/meal/${idMeal}`}>
                <Card
                    hoverable
                    cover={<img src={strMealThumb} alt={strMeal} />}
                >
                    <Meta title={strMeal} avatar={(inStorage)?<HeartFilled style={{color: "#1677ff"}} onClick={(event) => removeItem(event, idMeal)}/>:<HeartOutlined onClick={(event) => setItem(event, idMeal)}/>}/>
                </Card>
            </Link>
        </Col>
    );

}