const connectToMongo = require('./db');
const express = require('express');
// const express = require('express')
connectToMongo();


//  to use req.body we need to use app.use

// const app = express();
// const port = 3000;
const app = express();
const port = 5000;
app.use(express.json());
// app.get('/', (req, res) => {
//     res.send("Hello world");
// });

// Available Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
    res.send("Hello Worl");
})

// app.listen(port, () => {
//     console.log(`Example app running on https://localhost:${port}`);
// });

app.listen(port, () => {
    console.log(`Port is listening on port https://localhost:${port}`);
});