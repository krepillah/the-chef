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

export const checkToken = (setAuth) => {
    const token = sessionStorage.getItem('token');
    
    if (token) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/verify-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Token validation failed');
            }
            return response.json();
        })
        .then((data) => {
            setAuth(true); 
        })
        .catch((error) => {
            console.error('Token validation failed:', error);
            setAuth(false); 
            sessionStorage.removeItem('token');
        });
    }
}