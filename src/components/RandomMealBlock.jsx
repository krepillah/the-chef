import { useEffect, useState } from "react";

import { getRandomMeal } from "../api";
import RandMeal from "./RandMeal";
import LoadingCard from "./LoadingCard";

export default function RandomMealBlock() {
    const [meal, setMeal] = useState({});

    const fetchRandomMeal = async (event) => {
        event && event.preventDefault();
        getRandomMeal().then((data) => setMeal(data.meals[0]));
    };

    useEffect(() => {
        fetchRandomMeal();
    }, []);

    return (
        <>
            {!meal.idMeal ? (
                <LoadingCard />
            ) : (
                <RandMeal meal={meal} fetchRandomMeal={fetchRandomMeal} />
            )}
        </>
    );
}
