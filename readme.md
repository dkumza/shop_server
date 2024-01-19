# server side for shopping app

simple CRUD that handles APIs requests from SQL.

#### API endpoints are currently working:

- register user, with name, email and password. Password is hashed
- login user with validation and session token
- create new product with image upload to server using multer, fs, sharp and uuid
- get all products
- get single product
- ~~edit created product~~
- ~~delete created product~~

#### ENV file

- Copy .env.example to .env and fill with your data.

#### Installation

You need local setup of SQL DB <br>

To install the application, follow these steps:

1. Clone the repository.
2. Navigate to the `shop_server` folder and run `npm install` to install the server dependencies.
3. ~~Import "shopping.sql" to your local SQL server.~~
