# **Database setup**

1. run `npm i` to install all the dependencies
2. open >> `PSQL SHELL`
3. run `psql -U postgres` to connect to the default postgress database
4. the run these commands to create databse for development and for testing

    ```
    /** dev database **/
    CREATE DATABASE storefront_dev;
    /** test database **/
    CREATE DATABASE storefront_test;

    ```

5. make a `.env` file and add these variaples to it
   -- remember to change the values to match your environment

    ```
    ENV=dev
    DB_HOST=127.0.0.1
    DB_USER=postgres
    DB_PASSWORD={database_password}
    DB_DATABASE_DEV=storefront_dev
    DB_DATABASE_TEST=storefront_test
    BCRYPT_PASSWORD=
    SALT_ROUNDS=
    TOKEN_SECRET=
    ```

6. run the command `npm run db-up` to setup the database schema

### **scripts**

-   for testing `npm run test`
-   for building the project `npm run build`
-   for migrations `UP [npm run db-up] DOWN [npm run db-down] RESET [npm run db-reset]`
-   for running the build version `npm run start`

## Important to know

the token should be add to the headers in this format

```
Authorization : Bearer token
```

and any other info will be in the request body

---
