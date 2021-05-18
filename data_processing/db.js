
const exporter = require('./csv-to-mysql');

const db = { /* don't expose password or any sensitive info, done only for demo */
      host: 'localhost',
      user: 'root',
      password: 'marco',
      database: 'teste',
    };
 

exporter(db.host,db.database,db.user,db.password);
