import { Col, Card, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { mealInStorage, getRandomMeal } from "../api";
import { useEffect, useState } from "react";
import RandMeal from "./RandMeal";
import LoadingCard from "./LoadingCard";

export default function RandomMealBlock(){
    const [meal, setMeal] = useState({});

    useEffect(()=> {
        getRandomMeal().then((data) => setMeal(data.meals[0]));
    }, [])

    return (
        <>
            {!meal.length ? <LoadingCard/> : <RandMeal meal={meal}/>}
        </>
    );

}