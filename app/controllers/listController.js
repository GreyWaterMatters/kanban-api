const { List } = require('../models');

listController = {
    getAllLists: async (req, res) => {
        try {
            const lists = await List.findAll();
            res.json(lists);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    createList: async (req, res) => {
        const { body } = req;
        try {
            const newList = await List.create(body);
            res.json(newList);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    getOneList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                res.status(404).json(`Cannot find list with id ${listId}`);
                return;
            }
            res.json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    updateList: async (req, res) => {
        const { name, position } = req.body;
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                res.status(404).json(`Cannot find list with id ${listId}`);
                return;
            }
            if (name) {
                list.name = name;
            }
            if (position) {
                list.position = position;
            }
            await list.save();
            res.json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    deleteList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                res.status(404).json(`Cannot find list with id ${listId}`);
                return;
            }
            await list.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = listController;