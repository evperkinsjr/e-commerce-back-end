const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryData) {
      res.status(400).json({message: 'No category found with that id.'});
      return;
    } else {
      res.status(200).json(categoryData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
    category_name: req.body.category_name,
    });
    res.status(200).json([{'message': 'Category created.'}, {id: categoryData.id, category_name: categoryData.category_name}]);
  } catch (err) {
    res.status(500).json(err)
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(400).json({'message': 'No category found with that id.'});
    } else {
      res.status(200).json([{'message': 'Category updated.'}, {id: req.body.id, category_name: req.body.category_name}]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategoryData = await Category.findByPk(req.params.id);
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategoryData) {
      res.status(400).json({'message': 'No category found with that id.'});
    } else {
      res.status(200).json([{'message': 'Category deleted.'}, {id: deletedCategoryData.id, category_name: deletedCategoryData.category_name}]);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
