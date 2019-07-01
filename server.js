const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./Routes/index');
const bodyParser = require('body-parser');
const port = 4000;


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(cors())


app.use('/a1', routes.Admin)
app.use('/a2', routes.Contact)
app.use('/a3', routes.Contact_has_video)
app.use('/a4', routes.Decoration)
app.use('/a5', routes.Event)
app.use('/a6', routes.Event_has_contact)
app.use('/a7', routes.Lieux)
app.use('/a8', routes.Video)
app.use('/a9', routes.Video_has_event)





app.listen(port, (err) => {
    if(err) {
        throw new Error('Something bad happened ...')
    }
    console.log(`Server is listening on ${port}`)
})
