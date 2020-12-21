const { Card } = require('../models');

cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.findAll();
            res.json(cards);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    createCard: async (req, res) => {
        const { body } = req;
        try {
            const newcard = await Card.create(body);
            res.json(newcard);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    getOneCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId);
            res.json(card);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    updateCard: async (req, res) => {
        const { body } = req;
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId);
            await card.update(body);
            res.json(card);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    deleteCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        try {
            const card = await Card.findByPk(cardId);
            await card.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    }
};

module.exports = cardController;