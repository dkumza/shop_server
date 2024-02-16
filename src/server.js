require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');
const { makeError } = require('./middleware/errors');
const authRouter = require('./routes/autRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// make uploads folder static, that opens option to reach uploaded files in that folder
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json('Hello World!');
});

//  Routes
app.use('/api', productRouter);
app.use('/api', authRouter);

// 404 not found - for all other routes
app.use((req, res) => {
  res.status(404).json({
    error: '404 - Endpoint not found',
  });
});

// all errors goes here
app.use(makeError);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
