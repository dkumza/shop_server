# server side for shopping app /w express.js

created with node, express, bcryptjs, cors, dotenv, jsonwebtoken, morgan, multer, mysql2, sharp and more...

for latest version check [dev brach](https://github.com/dkumza/shop_server/tree/dev) (not stable!!!) <br>

simple CRUD that handles APIs requests from SQL.

#### API endpoints are currently working:

- register user. Password is hashed
- login user with validation and session token
- create new product with image upload (up to 4 images) to server using multer, fs, sharp and uuid
- get all products
- get single product
- edit created product
- delete/restore created product

#### ENV file

- Copy .env.example to .env and fill with your data.

#### Installation

You need local setup of SQL DB <br>

To install the application, follow these steps:

1. Clone the repository.
2. Navigate to the `shop_server` folder and run `npm install` to install the server dependencies.
3. Import `shopping.sql` from `data` folder to your local SQL server.
