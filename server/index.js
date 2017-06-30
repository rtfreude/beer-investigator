'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3003;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

app.listen(PORT, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url);
});