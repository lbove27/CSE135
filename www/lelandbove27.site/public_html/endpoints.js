const express = require('express');
const app = express();
const port = 3001;

app.get("/", (req, res) => {
    console.log('testing if this updated');
    res.send("Hello world");
});

app.listen(port, () => console.log('Listening on port ' + port));

