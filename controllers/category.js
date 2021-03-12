import Category from '../models/category';
import { errorHandler } from '../helpers/dbErrorsHandler';

export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data });
    });
}
export const list = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ categories });
    })
}