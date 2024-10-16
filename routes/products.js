const express = require('express'),
      router = express.Router(),
      ProductController = require('../controllers/product.controller')

router.get('/' , ProductController.index)
router.post('/' , ProductController.storeProduct)
router.get('/:id' , ProductController.show)
router.put('/:id' , ProductController.updateProduct)
router.delete('/:id' , ProductController.destroy)


module.exports = router;      