import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMealById } from "../api";
import { Tag, List, Divider, Row, Col, FloatButton } from "antd";
import BackButton from "../components/BackButton";
import Preloader from "../components/Preloader";
import FlagDisplay from "../components/FlagDisplay";

export default function Recipe() {
    const { id } = useParams();
    const { BackTop } = FloatButton;

    const [recipe, setRecipe] = useState({});

    const ingredientList = Object.entries(recipe)
        .filter(([key, value]) => key.startsWith("strIngredient") && value)
        .map(([, ingredient], index) => {
            const measureKey = `strMeasure${index + 1}`;
            const measure = recipe[measureKey];
            return (
                <span className="ingredient-item" key={index}>
                    <span className="ingredient-name">{ingredient}</span>
                    <span className="ingredient-measure accent-color">
                        {measure}
                    </span>
                </span>
            );
        });

    useEffect(() => {
        getMealById(id).then((data) => setRecipe(data.meal[0]));
    }, [id]);

    return (
        <div className="recipe-page-block">
            {!recipe.idMeal ? (
                <Preloader />
            ) : (
                <>
                    <div className="recipe-text-block">
                        <span className="recipe-title-block">
                            <h1 className="recipe-title">
                                <i className="accent-color w-600">
                                    {recipe.strMeal}
                                </i>
                            </h1>
                            <FlagDisplay countryName={recipe.strArea} />
                        </span>
                        <span className="recipe-tag-block">
                            {recipe.strTags &&
                                recipe.strTags.split(",").map((el, index) => (
                                    <Tag className="recipe-tag" key={index}>
                                        {el.trim()}
                                    </Tag>
                                ))}
                            {<Tag className="recipe-tag">{recipe.strArea}</Tag>}
                        </span>
                    </div>
                    <Row gutter={[24, 32]} justify={"center"}>
                        <Col xs={24} md={20} lg={10} xxl={8}>
                            <img
                                className="recipe-image"
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                            />
                        </Col>
                        <Col xs={24} md={20} lg={10} xxl={8}>
                            <List
                                size="small"
                                header={<div>Ingredients</div>}
                                bordered
                                dataSource={ingredientList}
                                renderItem={(item) => (
                                    <List.Item>{item}</List.Item>
                                )}
                            />
                        </Col>
                        <Col xs={24} md={20} lg={20} xxl={16}>
                            <div className="recipe-content-block">
                                <Divider
                                    className="custom-divider"
                                    style={{
                                        borderColor: "#1677ff",
                                    }}
                                >
                                    Cooking method
                                </Divider>
                                <ul className="recipe-algorithm-text">
                                    {recipe.strInstructions
                                        .split("\r\n\r\n")
                                        .map((el, index) => (
                                            <li key={index}>{el}</li>
                                        ))}
                                </ul>
                            </div>
                        </Col>
                        <Col xs={24} md={20} lg={20} xxl={16}>
                            <div className="iframe-block">
                                <iframe
                                    src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                                        -11
                                    )}`}
                                    title={recipe.strMeal}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
            <BackButton name="Back" />
            <BackTop className="backtop" />
        </div>
    );
}
