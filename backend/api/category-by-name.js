import { router, supabase } from "../router";

router.get('/categories/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
        // Получаем категорию по имени
        const { data: category, error: categoryError } = await supabase
            .from('categories')
            .select('idCategory')
            .eq('strCategory', name)
            .single();
  
        if (categoryError) {
            return res.status(400).json({ error: 'Category not found' });
        }
  
        // Получаем блюда, связанные с найденной категорией
        const { data: meals, error: mealsError } = await supabase
            .from('meals')
            .select('idMeal, strMeal, strMealThumb')
            .eq('idCategory', category.idCategory);
  
        if (mealsError) {
            return res.status(500).json({ error: 'Error fetching meals' });
        }
  
        // Форматируем ответ
        const formattedMeals = meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
        }));
  
        // Возвращаем ответ в нужном формате
        res.json({ meals: formattedMeals });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});