const express = require('express');
const app = express();
const port = 3001;

app.get(port, () => console.log('testing if this works'));

app.listen(port, () => console.log('Listening on port ' + port));