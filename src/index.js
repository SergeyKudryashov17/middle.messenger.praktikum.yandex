const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/login/index.html'));

app.listen(PORT);