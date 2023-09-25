const {Card} = require("../models/models");

class  CardControllers{
    async create(req,res) {
        const {title, columnId, desc } = req.body
        const card = await Card.create({title, columnId, desc})
        return res.json(card)
    }

    async get (req,res) {
        const card = await Card.findAll()
        return res.json(card)
    }

    async delete (req,res) {
        try {
            const { id } = req.body;
            const card = await Card.findByPk(id);

            if (!card) {
                return res.status(404).json({error: 'Column not found'});
            }

            await card.destroy();
            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async change(req, res) {

        const { id } = req.params;
        const { newId } = req.body;

        try {
            const card = await Card.findByPk(id);

            if (!card) {
                return res.status(404).json({ error: 'Card not found' });
            }

            card.columnId = newId;

            await card.save();

            return res.status(200).json(card);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new CardControllers()