const express = require('express')
const app = express()
const port = 8383

app.get('/',(req, res) => {
    res.status(200).send('<h1>This is a get request</h1>')
})



app.listen(port, () => console.log(`server has started on port: ${port}`))