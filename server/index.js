'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3003;

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

