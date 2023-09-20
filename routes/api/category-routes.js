const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll( {
    include: [{model:Product}] })
    .then( (data) => {
    res.json(data);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    Category.findOne({
      where: {
        id: req.params.id
      }, 
      include: [{model:Product}]
    })

    .then( (data) => {
      res.json(data);
    })
  } 
  catch (err) {
    res.json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const category =  Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
   Category.update(
    {
      category_name:req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
   )     
   .then((data) => {
    res.json(data);
  })          
                     
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const category = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(category);
  } catch (err) {
    res.json(err);
  }
  
});

module.exports = router;
