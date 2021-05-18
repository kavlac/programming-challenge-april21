const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'marco',
    database: env.DB_NAME || 'teste',
  },
  listPerPage: env.LIST_PER_PAGE || 25,
};


module.exports = config;