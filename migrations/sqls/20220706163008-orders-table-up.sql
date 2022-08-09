CREATE TABLE IF NOT EXISTS orders (
    id serial primary key,
    status varchar(50) not null,
    user_id bigint not null references users(id)
);