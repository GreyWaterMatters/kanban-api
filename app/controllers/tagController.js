const { Tag } = require('../models');

tagController = {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    createTag: async (req, res) => {
        const { body } = req;
        try {
            const newTag = await Tag.create(body);
            res.json(newTag);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    getOneTag: async (req, res) => {
        const tagId = parseInt(req.params.id, 10);
        try {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                res.status(404).json(`Cannot find list with id ${tagId}`);
                return;
            }
            res.json(tag);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    updateTag: async (req, res) => {
        const { name, color } = req.body;
        const tagId = parseInt(req.params.id, 10);
        try {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                res.status(404).json(`Cannot find list with id ${tagId}`);
                return;
            }
            if (name) {
                tag.name = name;
            }
            if (color) {
                tag.color = color;
            }
            await tag.save();
            res.json(tag);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    deleteTag: async (req, res) => {
        const tagId = parseInt(req.params.id, 10);
        try {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                res.status(404).json(`Cannot find list with id ${tagId}`);
                return;
            }
            await tag.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = tagController;