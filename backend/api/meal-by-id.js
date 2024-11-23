import { router, supabase } from "../router";

router.get('/meal/:id', async (req, res) => {
    const {id} = req.params;
  
    try {
      // Получаем категорию по имени
      const { data: meal, error: mealError } = await supabase
          .from('meals')
          .select('*')
          .eq('idMeal', id)
  
      if (mealError) {
          return res.status(400).json({ error: 'Category not found' });
      }
  
      // Возвращаем ответ в нужном формате
      res.json({ meal: meal });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
  
  })