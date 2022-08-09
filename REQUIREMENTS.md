# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index `GET ['/api/products']`
-   Show `GET ['/api/products']`
-   Create `POST ['/api/products']` [token required]
-   Update `put ['/api/products']` [token required]
-   Delete `DELETE ['/api/products']` [token required]
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

#### Users

-   Index `GET ['/api/users/']` [token required]
-   Show `GET ['/api/users/:id']` [token required]
-   Create `POST ['/api/users/']`
-   Update `PUT ['/api/users/:id']` [token required]
-   Delete `DELETE ['/api/users/:id']` [token required]

#### Orders

-   Index all orders `GET ['/api/orders/']`
-   Current Order by user (args: user id) `GET ['/api/orders/:user_id/all']` [token required]
-   Current Active Orders by user (args: user id) `GET ['/api/orders/:user_id/active']` [token required]
-   [OPTIONAL] Completed Orders by user (args: user id) `GET ['/api/orders/:user_id/active']` [token required]
-   ➕ Show Order `GET ['/api/orders/:order_id']` [token required]
-   ➕ Create Order `POST ['/api/orders/:user_id']` [token required]
-   ➕ Delete Order `DELETE ['/api/orders/:order_id']` [token required]
-   ➕ Update Order `PUT ['/api/orders/:order_id']` [token required]
-   ➕ Get Order Products `GET ['/api/orders/:order_id/products']` [token required]
-   ➕ Add Product in Order `POST ['/api/orders/:order_id/products']` [token required]
-   ➕ Update Product to Order `PUT ['/api/orders/:order_id/products']` [token required]
-   ➕ Delete Product from Order `DELETE ['/api/orders/:order_id/products']` [token required]

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

```
CREATE TABLE IF NOT EXISTS products ( id serial primary key, name varchar not null, price integer not null, category varchar(100) );
```

#### User

-   id
-   firstName
-   lastName
-   password

```
CREATE TABLE IF NOT EXISTS users ( id serial primary key, firstname varchar(100) not null, lastname varchar(100) not null, email varchar(50) unique, password text not null );
```

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or completed)

```
CREATE TABLE IF NOT EXISTS orders ( id serial primary key, status varchar(50) not null, user_id bigint not null references users(id));

CREATE TABLE IF NOT EXISTS order_products ( id serial primary key, quantity integer, order_id bigint references orders(id), product_id bigint references products(id) );
```
