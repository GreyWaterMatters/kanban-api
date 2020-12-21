const { Router } = require('express');
const router = Router();

const listController = require('./controllers/listController');

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);

router.get('/lists/:id', listController.getOneList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

module.exports = router;