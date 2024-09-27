import { useEffect, useState } from "react";
import { mealInStorage } from "../api";
import {Card, Typography, Col, Button } from "antd"
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled, ReloadOutlined } from '@ant-design/icons';

export default function RandMeal({meal}){
    const {
        idMeal,
        strMealThumb,
        strMeal,
    } = meal;

    const [inStorage, setInStorage] = useState(false);

    const { Meta } = Card;
    const { Text } = Typography;

    const removeItem = (event, id) => {
        event.preventDefault();
        sessionStorage.removeItem(`meal_${id}`);
        setInStorage(false);
    }

    const setItem = (event, id) => {
        event.preventDefault();
        sessionStorage.setItem(`meal_${id}`, id);
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
                style={{border: "1px solid #1677ff"}}
                    className="random-meal-block"
                    hoverable
                    cover={<img className="random-meal-image" src={strMealThumb} alt={strMeal} />}
                >
                    <Meta title={
                        <span className="random-meal-meta-block">
                            <span className="random-meal-title-block">
                                {(inStorage)?<HeartFilled style={{color: "#1677ff"}} onClick={(event) => removeItem(event, idMeal)}/>:<HeartOutlined onClick={(event) => setItem(event, idMeal)}/>}
                                <Text className="ant-card-meta-title-text" title={strMeal}>{strMeal}</Text>
                            </span>
                            <Button type="primary" icon={<ReloadOutlined />} iconPosition={"end"} style={{ whiteSpace: 'nowrap', marginLeft: "10px" }}>
                                Get random
                            </Button>
                        </span>
                    }/>
                </Card>
            </Link>
        </Col>
    )
}