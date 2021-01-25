export default {
    debug: false,
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD
    },
    seeds: { directory: 'src/database/seeds/' },
    migrations: { directory: 'src/database/migrations/' }
};
