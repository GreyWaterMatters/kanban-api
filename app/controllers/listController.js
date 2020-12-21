const { List } = require('../models');

listController = {
    getAllLists: async (req, res) => {
        try {
            const lists = await List.findAll();
            res.json(lists);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    createList: async (req, res) => {
        const { body } = req;
        try {
            const newList = await List.create(body);
            res.json(newList);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    getOneList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            res.json(list);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    updateList: async (req, res) => {
        const { body } = req;
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            await list.update(body);
            res.json(list);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    deleteList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            await list.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    }
};

module.exports = listController;