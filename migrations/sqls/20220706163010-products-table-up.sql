CREATE TABLE IF NOT EXISTS products (
    id serial primary key,
    name varchar not null,
    price integer not null,
    category varchar(100)
);