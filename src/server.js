require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

//  Routes
app.use('/api', productRouter);

// 404 not found - for all other routes
app.use((req, res) => {
  res.status(404).json({
    error: '404 - Endpoint not found',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
