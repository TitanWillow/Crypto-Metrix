const { Client } = require('pg');
const detail = {
  user: 'xxx',
  host: 'xxxx',
  database: 'crypto_metrix',
  password: 'xxxx',
  port: 5433,
}


async function entryCall() {
  const pgClient = new Client(detail);
  await pgClient.connect()
    .then(() => {
      console.log('Connected to PostgreSQL');
    })
    .catch(err => {
      console.error('Error connecting to PostgreSQL:', err);
    });
    await pgClient.end();
}

entryCall(); 