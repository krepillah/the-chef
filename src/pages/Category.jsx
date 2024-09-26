import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getFilteredCategory } from "../api";
import Preloader from "../components/Preloader";
import MealsList from "../components/MealsList";
import BackButton from "../components/BackButton";

export default function Category(props){
    const {catalog} = props;
    const {name} = useParams();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getFilteredCategory(name).then((data) => setMeals(data.meals));
    }, [name])

    let description = "";
    if(catalog.length){
        description = "\t"+catalog.filter((item) =>
            item.strCategory === name
        )[0].strCategoryDescription.replace(/\[\d*\]/g, '');
    }

    return (
        <>
            <span className="category-text-block">
                <h1 className="category-text"><i className="accent-color w-600">{name}</i></h1>
                <h3 className="category-subtext">{description}</h3>
            </span>
            {!meals.length ? <Preloader/> : <MealsList meals={meals}/>}
            <BackButton name="Back to categories"/>
        </>
    )
}