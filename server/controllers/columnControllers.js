const {Column} = require('../models/models')

class  ColumnControllers{
    async create(req,res) {
        const {title, userId} = req.body
        const column = await Column.create({title, userId})
        return res.json(column)
    }

    async getAll(req,res) {
        const columns = await Column.findAll()
        return res.json(columns)
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const column = await Column.findByPk(id);

            if (!column) {
                return res.status(404).json({error: 'Column not found'});
            }

            await column.destroy();
            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

module.exports = new ColumnControllers()