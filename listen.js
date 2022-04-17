// const PORT = process.env.PORT || 9090;
// const app = require('./app');

// app.listen(PORT, (err) => {
//   if (err) throw err;
//   console.log(`Listening on port: ${PORT}...`);
// });


const { PORT = 9090 } = process.env;
const app = require('./app');

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));