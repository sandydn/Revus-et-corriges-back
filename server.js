const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./Routes/index')
const bodyParser = require('body-parser');
const port = 4001;


// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors())



app.use("/a1", routes.Acteurs)
app.use("/a2", routes.ActeursHasCinema)
app.use("/a3", routes.ActeursHasEvents)
app.use("/a4", routes.ActeurHasRealisateurs)
app.use("/a5", routes.ActeursHasVideo)
app.use("/a6", routes.Admin)
app.use("/a7", routes.Cinema)
app.use("/a8", routes.CinemaHasDistributeurEditeur)
app.use("/a9", routes.CinemaHasLieux)
app.use("/a10", routes.CinemaHasRealisateurs)
app.use("/a11", routes.Decoration)
app.use("/a12", routes.DistributeurEditeur)
app.use("/a13", routes.Events)
app.use("/a14", routes.EventsHasLieux)
app.use("/a15", routes.EventsHasRealisateurs)
app.use("/a16", routes.Importance)
app.use("/a17", routes.Lieux)
app.use("/a18", routes.RcEvents)
app.use("/a19", routes.RcEventsHasActeurs)
app.use("/a20", routes.RcEventsHasCinema)
app.use("/a21", routes.RcEventsHasLieux)
app.use("/a22", routes.RcEventsHasRealisateurs)
app.use("/a23", routes.Realisateurs)
app.use("/a24", routes.Video)
app.use("/a25", routes.VideoEditeur)
app.use("/a26", routes.VideoHasRealisateurs)
 




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});