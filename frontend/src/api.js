import { API_URL } from "./config";

export const getMealById = async (mealId) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/meal/${mealId}`);
    return await response.json();
}

export const getAllCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/categories`);
    return await response.json();
}

export const getFilteredCategory = async (categoryName) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/categories/${categoryName}`);
    return await response.json();
}

export const getRandomMeal = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/meal/random`);
    return await response.json();
}

export const mealInStorage = (mealId) => {
    return sessionStorage.getItem(`meal_${mealId}`) !== null;
}