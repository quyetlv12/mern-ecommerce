import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';

const app = express();
dotenv.config()


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//db connection
mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Routes Middlewares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', newsRoutes);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})