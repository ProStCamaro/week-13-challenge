const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated Products
    const categories = await Category.findAll({
      include: [Product], // Assuming there's an association between Category and Product models
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve category.' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new category.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

module.exports = router;