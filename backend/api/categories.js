import { router, supabase } from "../router";

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