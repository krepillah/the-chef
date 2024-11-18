import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { FloatButton } from "antd";
import { getFilteredCategory } from "../api";
import Preloader from "../components/Preloader";
import MealsList from "../components/MealsList";
import BackButton from "../components/BackButton";
import Search from "../components/Search";
import Title from "../components/Title";

export default function Category(props) {
    const { catalog } = props;
    const { name } = useParams();
    const { pathname, search } = useLocation();
    const { BackTop } = FloatButton;
    const navigate = useNavigate();

    const [meals, setMeals] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const handleSearch = (str) => {
        if (str === "") {
            setFiltered(meals);
            navigate(`${pathname}`);
        } else {
            setFiltered(
                meals.filter((item) =>
                    item.strMeal.toLowerCase().includes(str.toLowerCase())
                )
            );
            navigate(`${pathname}?search_meal=${str}`);
        }
    };

    useEffect(() => {
        setFiltered(
            search
                ? meals.filter((item) =>
                      item.strMeal
                          .toLowerCase()
                          .includes(search.split("=")[1].toLowerCase())
                  )
                : meals
        );
    }, [meals, search]);

    useEffect(() => {
        getFilteredCategory(name).then((data) => setMeals(data.meals));
    }, [name]);

    let description = "";
    if (catalog.length) {
        description =
            "\t" +
            catalog
                .filter((item) => item.strCategory === name)[0]
                .strCategoryDescription.replace(/\[\d*\]/g, "");
    }

    return (
        <div className="category-page-block">
            <Title highlighted={name} description={description} />
            <Search cb={handleSearch} name="search meal..." />
            {!meals.length ? <Preloader /> : <MealsList meals={filtered} />}
            <BackButton name="Back to categories" />
            <BackTop className="backtop" />
        </div>
    );
}
