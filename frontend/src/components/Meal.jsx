import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Col, Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { mealInStorage } from "../api";


export default function Meal(props) {
    const {
        idMeal,
        strMeal,
        strMealThumb,
        handleMealRemoval = Function.prototype,
    } = props;
    const { Meta } = Card;

    const [inStorage, setInStorage] = useState(false);

    const removeItem = (event, id) => {
        event.preventDefault();
        sessionStorage.removeItem(`meal_${id}`);
        setInStorage(false);
        handleMealRemoval(id);
    };

    const setItem = (event, id) => {
        event.preventDefault();
        sessionStorage.setItem(`meal_${id}`, id);
        setInStorage(true);
    };

    useEffect(() => {
        if (mealInStorage(idMeal)) {
            setInStorage(true);
        }
    }, [idMeal]);

    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
            <Link to={`/meal/${idMeal}`}>
                <Card
                    hoverable
                    cover={<img src={strMealThumb} alt={strMeal} />}
                >
                    <Meta
                        title={strMeal}
                        avatar={
                            inStorage ? (
                                <HeartFilled
                                    style={{ color: "#1677ff" }}
                                    onClick={(event) =>
                                        removeItem(event, idMeal)
                                    }
                                />
                            ) : (
                                <HeartOutlined
                                    onClick={(event) => setItem(event, idMeal)}
                                />
                            )
                        }
                    />
                </Card>
            </Link>
        </Col>
    );
}
