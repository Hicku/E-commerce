const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagData)
  }catch(err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
    try { 
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{model: Product}]
      })

      if(!tagData) {
        res.status(404).json({message: "Can't find tag wit that id"});
        return;
      }
      res.status(200).json(tagData)
    }catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newData)
  }catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res.status(404).json({message: "Can't find tag with that id"});
      return;
    };
    res.status(200).json(tagData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!tagData) {
      res.status(404).json({message: "Can't find tag with that id"});
      return;
    }

    res.status(200).json(`tag ${req.params.id} deleted`);

  }catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
