const { Router } = require('express');
const router = Router();

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);

router.get('/lists/:id', listController.getOneList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

router.get('/lists/:id/cards', cardController.getAllCardsFromList);

router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);

router.get('/cards/:id', cardController.getOneCard);
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

router.post('/cards/:id/tag', tagController.addTagToCard);
router.delete('/cards/:id/tag/:tag_id', tagController.deleteTagFromCard);

router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createTag);

router.get('/tags/:id', tagController.getOneTag);
router.patch('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;