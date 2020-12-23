const { List } = require('../models');

listController = {
    getAllLists: async (req, res) => {
        try {
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC']
                ]
            });
            res.json(lists);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    createList: async (req, res) => {
        const { name, position } = req.body;
        const bodyErrors = [];
        try {
            if (!name) {
                bodyErrors.push('name can not be empty');
            }
            if (!position) {
                bodyErrors.push('position can not be empty');
            }
            if (bodyErrors.length) {
                return res.status(400).json(bodyErrors);
            }

            const newList = await List.build({ name, position });
            await newList.save();
            res.json(newList);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    getOneList: async (req, res) => {
        const listId = parseInt(req.params.id, 10);
        try {
            const list = await List.findByPk(listId, {
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC']
                ]
            });
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
                return res.status(404).json(`Cannot find list with id ${listId}`);
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
                return res.status(404).json(`Cannot find list with id ${listId}`);
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