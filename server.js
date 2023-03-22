const express = require('express')
const app = express()
const port = 8383

app.use(express.static('frontend'))
app.use(express.json())

app.get('/info/:dynamic',(req, res) => {
    const { dynamic } = req.params
    const  { key } = req.query
    console.log(dynamic, key)
    res.status(200).json({info: 'preset text👾'})
})


app.post('/', (req, res) => {
    const { parcel } = req.body

    console.log(parcel)
    console.log(pageNum)

    allPageNotes.push(parcel)

    pageNum += 1

    console.log(allPageNotes)

    if (!parcel) {
        return res.status(400).send({status: 'failed'})
    }
    res.status(200).send({status: 'recieved'})
})

app.listen(port, () => console.log(`server has started on port: ${port}`))

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let allPageNotes = []
let pageNum = 0