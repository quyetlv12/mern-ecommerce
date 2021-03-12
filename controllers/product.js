import Product from '../models/product';
import { errorHandler } from '../helpers/dbErrorsHandler';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        console.log('FIELDS', fields);
        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            res.status(400).json({
                error: "All fields are required"
            })
        }
        let product = new Product(fields);
        console.log(product);
        // 1kb = 1000
        // 1mb = 100000
        if (files.photo) {
            if (files.photo.size > 100000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            console.log(err, '----', result);
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}
export const productByID = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedProduct,
            message: "Product deleted successfully"
        })
    })
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            res.status(400).json({
                error: "All fields are required"
            })
        }
        let product = req.product;
        product = _.assignIn(product, fields);

        // 1kb = 1000
        // 1mb = 100000
        if (files.photo) {
            if (files.photo.size < 100000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            console.log(err, '----', result);
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}