import knex from "knex"
export const db = knex({
    client: "pg",
    connection: //process.env.DB_URI 
    {       user: "berodouwlaphph",
                password: "d5c94222997d329975d5c2aa1fefd185e24b2bf3c56d7c317df7890a7ed94ec4",
                database: "d8af3glfcqvn69",
                port: 5432,
                host: "ec2-54-225-242-183.compute-1.amazonaws.com",
                ssl: true}

    // {user: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     port: process.env.DB_PORT,
    //     host: process.env.DB_HOST,
    //     ssl: process.env.DB_SSL}
})
