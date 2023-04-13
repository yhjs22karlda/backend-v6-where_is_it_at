import express from 'express'
import {router} from './routes/routes.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(router)

app.use((req, res) => {
    res.status(404).json({status: false, msg: "Sidan finns inte"})
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(400).json({status: false, msg: err})
})

app.listen(PORT, () => {
    console.log('Listening to port ' + PORT)
})