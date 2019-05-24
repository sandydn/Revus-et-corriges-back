//const connexion = require('./conf');
const express = require('express');
const routes = require('./Routes/index')
const bodyParser = require('body-parser');
const app = express();
const port = 4242;


app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/Admin", Admin)
app.use("./Cinema", Cinema)
app.use("./CinemaHasDistributeurEditeur", CinemaHasDistributeurEditeur)
app.use("./CinemaHasLieux", CinemaHasLieux)
app.use("./CinemaHasRealisateurs", CinemaHasRealisateurs)
app.use("./Decoration", Decoration)
app.use("./DistributeurEditeur", DistributeurEditeur)
app.use("./Events", Events)
app.use("./EventsHasLieux", EventsHasLieux)
app.use("./EventsHasRealisateurs", EventsHasRealisateurs)
app.use("./Lieux", Lieux)
app.use("./Realisateurs", Realisateurs)
app.use("./Video", Video)
app.use("./VideoHasRealisateurs", VideoHasRealisateurs)




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});