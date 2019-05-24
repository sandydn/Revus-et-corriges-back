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

app.use("/Admin", routes.Admin)
app.use("./Cinema", routes.Cinema)
app.use("./CinemaHasDistributeurEditeur", routes.CinemaHasDistributeurEditeur)
app.use("./CinemaHasLieux", routes.CinemaHasLieux)
app.use("./CinemaHasRealisateurs", routes.CinemaHasRealisateurs)
app.use("./Decoration", routes.Decoration)
app.use("./DistributeurEditeur", routes.DistributeurEditeur)
app.use("./Events", routes.Events)
app.use("./EventsHasLieux", routes.EventsHasLieux)
app.use("./EventsHasRealisateurs", routes.EventsHasRealisateurs)
app.use("./Lieux", routes.Lieux)
app.use("./Realisateurs", routes.Realisateurs)
app.use("./Video", routes.Video)
app.use("./VideoHasRealisateurs", routes.VideoHasRealisateurs)




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});