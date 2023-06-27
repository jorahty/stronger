import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on *:${port}`);
  console.log(`API Testing UI: http://localhost:${port}/api/v0/docs/`);
});
