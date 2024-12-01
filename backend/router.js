import Router from "express"
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API);

const router = new Router();

router.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error){
      return res.status(400).json({meassge: "Login failed", error: error.meassge})
    }

    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session, 
    });
  } catch (error) {
    console.error("'Error logging in:", error.message);
    res.status(500).json({meassge: "Server error", error: error.meassge})
  }
})

router.post('/verify-token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data) {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
    }

    return res.status(200).json({ message: 'Token is valid', user: data.user });
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    const categories = data.map((category) => ({
      ...category,
      idCategory: category.idCategory.toString(),
    }));

    res.status(200).json({ categories: categories });
  } catch (error) {
    console.error('Ошибка при получении категорий:', error.message);
    res.status(500).json({ error: 'Ошибка сервера при получении категорий' });
  }
});

router.post('/categories/new', async (req, res) => {
  const { strCategory, strCategoryThumb, strCategoryDescription } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const { data: user, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token', error: authError.message });
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          strCategory,
          strCategoryThumb,
          strCategoryDescription,
        },
    ])
    .select();

    if (error) {
      return res.status(400).json({ message: 'Error adding category', error: error.message });
      
    }

    return res.status(200).json({
      message: 'Category added successfully',
      category: data[0],
    });
  } catch (error) {
    console.error('Error adding category:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/categories/:name/edit', async (req, res) => {
  const { name } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const { data: user, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token', error: authError.message });
    }

    const {data, error } = await supabase 
      .from('categories')
      .update(req.body)
      .eq('strCategory', name)
      .select();

    if (error) {
      return res.status(400).json({ message: 'Error updating category', error: error.message });
      
    }

    return res.status(200).json({
      message: 'Category updated successfully',
      category: data[0],
    });
  } catch (error) {
    console.error('Error updating category:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

router.get('/categories/:name', async (req, res) => {
  const { name } = req.params;

  try {
      const { data: category, error: categoryError } = await supabase
          .from('categories')
          .select('idCategory')
          .eq('strCategory', name)
          .single();

      if (categoryError) {
          return res.status(400).json({ error: 'Category not found' });
      }

      const { data: meals, error: mealsError } = await supabase
          .from('meals')
          .select('idMeal, strMeal, strMealThumb')
          .eq('idCategory', category.idCategory);

      if (mealsError) {
          return res.status(500).json({ error: 'Error fetching meals' });
      }

      const formattedMeals = meals.map(meal => ({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
      }));

      res.json({ meals: formattedMeals });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/meal/random', async (req, res) => {
  try {
      const { data, error } = await supabase
        .rpc('get_random_meal');

      if (error) {
          throw new Error(error.message);
      }

      if (data.length === 0) {
          return res.status(404).json({ message: "No meals found" });
      }

      res.status(200).json({ meal: data[0] });
  } catch (error) {
      console.error('Ошибка при получении случайного блюда:', error.message);
      res.status(500).json({ error: 'Ошибка сервера при получении случайного блюда' });
  }
});

router.post('/meal/new', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const { data: user, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token', error: authError.message });
    }

    const { data, error } = await supabase
      .from('meals')
      .insert(req.body)
      .select();

    if (error) {
      return res.status(400).json({ message: 'Error adding meal', error: error.message });
      
    }

    return res.status(200).json({
      message: 'Meal added successfully',
      category: data[0],
    });
  } catch (error) {
    console.error('Error adding meal:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

router.delete('/meal/:id/delete', async(req, res) => {
  const {id} = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const { data: user, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token', error: authError.message });
    }

    const {data, error } = await supabase 
      .from('meals')
      .delete()
      .eq('idMeal', id)
      .select();

    if (error) {
      return res.status(400).json({ message: 'Error deleting meal', error: error.message });
      
    }

    return res.status(200).json({
      message: 'Meal deleted successfully',
      category: data[0],
    });
  } catch (error) {
    console.error('Error deleting meal:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

router.get('/meal/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const { data: meal, error: mealError } = await supabase
        .from('meals')
        .select('*')
        .eq('idMeal', id)


    if (mealError) {
        return res.status(400).json({ error: 'Category not found' });
    }

    if (meal && Array.isArray(meal)) {
      meal.forEach(mealItem => {
        // Удаляем поля с пустыми значениями (например, 'null', '' и т.п.)
        for (const key in mealItem) {
          if (mealItem[key] === "null" || mealItem[key] === "" || mealItem[key] === null) {
            delete mealItem[key];  // Удаляем поле
          }
        }
      });
    }

    res.json({ meal: meal });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
})

export default router;