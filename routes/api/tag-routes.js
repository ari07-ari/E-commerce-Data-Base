const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model:Product, through:ProductTag}]})
    .then((data) => {
    res.json(data);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    Tag.findOne({
      where: {
        id: req.params.id
      }, 
      include: [{model:Product, through:ProductTag}]
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
  // create a new tag
  try {
    const tag =  Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name:req.body.tag_name,
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
  // delete on tag by its `id` value
  try {
    const tag = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(tag);
  } catch (err) {
    res.json(err);
  }
  
});

module.exports = router;
