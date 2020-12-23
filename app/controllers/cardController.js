const { Card } = require('../models');

cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: 'tags',
                order: [
                    ['position', 'ASC']
                ]
            });
            res.json(cards);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    createCard: async (req, res) => {
        const { content, color, list_id } = req.body;
        const bodyErrors = [];
        try {
            if (!content) {
                bodyErrors.push(`content can not be empty`);
            }
            if (!list_id) {
                bodyErrors.push(`list_id can not be empty`);
            }
            if (bodyErrors.length) {
                return res.status(400).json(bodyErrors);
            }
            const newCard = await Card.build({ content, list_id });
            if (color) {
                newCard.color = color;
            }
            await newCard.save();
            res.json(newCard);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    getOneCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId, {
                include: 'tags',
                order: [
                    ['position', 'ASC']
                ]
            });
            if (!card) {
                return res.status(404).json(`Cannot find list with id ${cardId}`);
            }
            res.json(card);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    updateCard: async (req, res) => {
        const { content, color, position } = req.body;
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId);
            if (!card) {
                return res.status(404).json(`Cannot find list with id ${cardId}`);
            }
            if (content) {
                card.content = content;
            }
            if (color) {
                card.color = color;
            }
            if (position) {
                card.position = position;
            }
            await card.save();
            res.json(card);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    deleteCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId);
            if (!card) {
                return res.status(404).json(`Cannot find list with id ${cardId}`);
            }
            await card.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    getAllCardsFromList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const cards = await Card.findAll({
                include: ["list", "tags"],
                where: { list_id: listId }
            });
            if (cards.length < 0) {
                return res.status(404).json(`Cannot find cards with list_id ${listId}`);
            }
            res.json(cards);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = cardController;