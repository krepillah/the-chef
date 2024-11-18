import { useState } from "react";
import { Link } from "react-router-dom";

import { Card, Typography, Col, Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export default function RandMeal({ meal, fetchRandomMeal }) {
    const { idMeal, strMealThumb, strMeal } = meal;
    const { Meta } = Card;
    const { Text } = Typography;

    const [inStorage, setInStorage] = useState(false);

    const removeItem = (event, id) => {
        event.preventDefault();
        sessionStorage.removeItem(`meal_${id}`);
        setInStorage(false);
    };

    const setItem = (event, id) => {
        event.preventDefault();
        sessionStorage.setItem(`meal_${id}`, id);
        setInStorage(true);
    };

    return (
        <Col xs={24} sm={12} md={8} xl={6} xxl={4}>
            <Link to={`/meal/${idMeal}`}>
                <Card
                    style={{ border: "1px solid #1677ff" }}
                    className="random-meal-block"
                    hoverable
                    cover={
                        <img
                            className="random-meal-image"
                            src={strMealThumb}
                            alt={strMeal}
                        />
                    }
                >
                    <Meta
                        title={
                            <span className="random-meal-meta-block">
                                <span className="random-meal-title-block">
                                    {inStorage ? (
                                        <HeartFilled
                                            style={{ color: "#1677ff" }}
                                            onClick={(event) =>
                                                removeItem(event, idMeal)
                                            }
                                        />
                                    ) : (
                                        <HeartOutlined
                                            onClick={(event) =>
                                                setItem(event, idMeal)
                                            }
                                        />
                                    )}
                                    <Text
                                        className="ant-card-meta-title-text"
                                        title={strMeal}
                                    >
                                        {strMeal}
                                    </Text>
                                </span>
                                <Button
                                    type="primary"
                                    style={{
                                        whiteSpace: "nowrap",
                                        marginLeft: "10px",
                                    }}
                                    onClick={(event) => fetchRandomMeal(event, setInStorage)}
                                >
                                    Get random
                                </Button>
                            </span>
                        }
                    />
                </Card>
            </Link>
        </Col>
    );
}
