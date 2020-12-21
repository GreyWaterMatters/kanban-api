const { Tag } = require('../models');

tagController = {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    createTag: async (req, res) => {
        const { body } = req;
        try {
            const newTag = await Tag.create(body);
            res.json(newTag);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    getOneTag: async (req, res) => {
        const tagId = parseInt(req.params.id, 10);
        try {
            const tag = await Tag.findByPk(tagId);
            res.json(tag);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    updateTag: async (req, res) => {
        const { body } = req;
        const tagId = parseInt(req.params.id, 10);
        try {
            const Tag = await Tag.findByPk(tagId);
            await Tag.update(body);
            res.json(tag);
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    },

    deleteTag: async (req, res) => {
        const tagId = parseInt(req.params.id, 10);
        try {
            const tag = await Tag.findByPk(tagId);
            await Tag.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        }
    }
};

module.exports = tagController;