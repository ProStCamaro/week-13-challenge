const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET All Tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: { attributes: [] }, // Exclude ProductTag attributes
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tags.' });
  }
});

// GET One Tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: { attributes: [] }, // Exclude ProductTag attributes
        },
      ],
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tag.' });
  }
});

// Create New Tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create a new tag.' });
  }
});

// Update Tag
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update tag.' });
  }
});

// DELETE Tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deletedTag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.status(204).send(); // Successful delete, no content to send
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag.' });
  }
});

module.exports = router;