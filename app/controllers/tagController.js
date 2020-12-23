const { Tag, Card } = require('../models');

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
        const { name, color } = req;
        const bodyErrors = [];
        try {
            if (!name) {
                bodyErrors.push('name can not be empty');
            }
            if (!color) {
                bodyErrors.push('color can not be empty');
            }
            if (bodyErrors.length) {
                return res.status(400).json(bodyErrors);
            }
            const newTag = Tag.build({ name, color });
            await newTag.save();
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
                return res.status(404).json(`Cannot find list with id ${tagId}`);
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
                return res.status(404).json(`Cannot find list with id ${tagId}`);
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
                return res.status(404).json(`Cannot find list with id ${tagId}`);
            }
            await tag.destroy();
            res.json({ status: "ok" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    addTagToCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        const tagId = parseInt(req.body.tag_id, 10);
        try {
            let card = await Card.findByPk(cardId, {
                include: ["tags"]
            });
            if (!card) {
                return res.status(404).json(`Cannot find list with id ${cardId}`);
            }
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return res.status(404).json('Can not find tag with id ' + tagId);
            }
            await card.addTag(tag);
            card = await Card.findByPk(cardId, {
                include: ["tags"]
            });
            res.json(card);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    },

    deleteTagFromCard: async (req, res) => {
        const cardId = parseInt(req.params.id, 10);
        const tagId = parseInt(req.params.tag_id, 10);
        try {
            let card = await Card.findByPk(cardId, {
                include: ["tags"]
            });
            if (!card) {
                return res.status(404).json(`Cannot find list with id ${cardId}`);
            }
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return res.status(404).json('Can not find tag with id ' + tagId);
            }
            card.removeTag(tag);
            card = await Card.findByPk(cardId, {
                include: ["tags"]
            });
            res.json(card);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = tagController;