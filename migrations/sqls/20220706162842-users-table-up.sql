CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    firstname varchar(100) not null,
    lastname varchar(100) not null,
    email varchar(50) unique,
    password text not null
);