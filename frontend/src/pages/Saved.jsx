import { useEffect, useState } from "react";

import MealsList from "../components/MealsList";
import Preloader from "../components/Preloader";
import { getMealById } from "../api";

export default function Saved() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleMealRemoval = (id) => {
        setMeals((prevMeals) => prevMeals.filter((meal) => meal.idMeal !== id));
    };

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            const allItems = [];
            const promises = [];

            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key.includes("meal_")) {
                    const value = sessionStorage.getItem(key);
                    promises.push(
                        getMealById(value).then((data) => {
                            allItems.push({
                                idMeal: data.meal[0].idMeal,
                                strMeal: data.meal[0].strMeal,
                                strMealThumb: data.meal[0].strMealThumb,
                            });
                        })
                    );
                }
            }

            await Promise.all(promises);
            setMeals(allItems);
        };
        if (sessionStorage.length > 0) {
            fetchMeals();
            setLoading(false);
        }
    }, []);

    return (
        <>
            {!meals.length ? (
                loading ? (
                    <Preloader />
                ) : (
                    <div className="saved-text-block">
                        <span className="saved-title-block">
                            <h1 className="saved-title">
                                There's nothing here yet...
                            </h1>
                            <h3 className="saved-subtext">
                                When you like your favorite recipes, they will
                                be displayed here
                            </h3>
                        </span>
                    </div>
                )
            ) : (
                <MealsList
                    meals={meals}
                    handleMealRemoval={handleMealRemoval}
                />
            )}
        </>
    );
}
