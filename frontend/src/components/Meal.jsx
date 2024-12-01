import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Col, Card } from "antd";
import { HeartOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { mealInStorage } from "../api";


export default function Meal(props) {
    const {
        idMeal,
        strMeal,
        strMealThumb,
        handleMealRemoval = Function.prototype,
        authorized,
        setAuthorized,
        editable
    } = props;
    const { Meta } = Card;
    const navigate = useNavigate();

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

    const deleteMeal = (event, id) => {
        event.preventDefault();
        let val = window.confirm("Are you sure to delete the meal?");
        if(val){
            const token = sessionStorage.getItem("token");
            fetch(`${process.env.REACT_APP_SERVER_URL}/meal/${id}/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                if (!response.ok) {
                    if(response.status === 401){
                        setAuthorized(false);
                        if(token){
                            navigate("/admin");
                        }
                    }
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('Meal deleted successfully');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting meal:', error);
                
            })
        }
    }

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
                    title={authorized && editable ? "Delete meal" : null}
                    extra={authorized && editable ? 
                        <DeleteOutlined onClick={(event) => deleteMeal(event, idMeal)}/> 
                    : null}
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
