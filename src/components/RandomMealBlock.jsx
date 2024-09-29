import { useEffect, useState } from "react";

import { getRandomMeal, mealInStorage } from "../api";
import RandMeal from "./RandMeal";
import LoadingCard from "./LoadingCard";

export default function RandomMealBlock() {
    const [meal, setMeal] = useState({});

    const fetchRandomMeal = async (event, cb = Function.prototype) => {
        event && event.preventDefault();
        const data = await getRandomMeal();
        const newMeal = data.meals[0];
        setMeal(newMeal);

        if (mealInStorage(newMeal.idMeal)) {
            cb(true);
        } else {
            cb(false);
        }
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
