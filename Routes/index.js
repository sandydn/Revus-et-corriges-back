const Acteurs = require("./Acteurs")
const ActeursHasCinema = require("./ActeursHasCinema")
const ActeursHasEvents = require("./ActeursHasEvents")
const ActeurHasRealisateurs = require("./ActeursHasRealisateurs")
const ActeursHasVideo = require("./ActeursHasVideo")
const Admin = require("./Admin")
const Cinema = require("./Cinema")
const CinemaHasDistributeurEditeur = require("./CinemaHasDistributeurEditeur")
const CinemaHasLieux = require("./CinemaHasLieux")
const CinemaHasRealisateurs = require("./CinemaHasRealisateurs")
const Decoration = require("./Decoration")
const DistributeurEditeur = require("./DistributeurEditeur")
const Events = require("./Events")
const EventsHasLieux = require("./EventsHasLieux")
const EventsHasRealisateurs = require("./EventsHasRealisateurs")
const Importance = require("./Importance")
const Lieux = require("./Lieux")
const RcEvents = require("./RcEvents")
const RcEventsHasActeurs = require("./RcEventsHasActeurs")
const RcEventsHasCinema = require("./RcEventsHasCinema")
const RcEventsHasLieux = require("./RcEventsHasLieux")
const RcEventsHasRealisateurs = require("./ActeursHasRealisateurs")
const Realisateurs = require("./Realisateurs")
const Video = require("./Video")
const VideoEditeur = require("./VideoEditeur")
const VideoHasRealisateurs = require("./VideoHasRealisateurs")

module.exports = {
    Acteurs, 
    ActeursHasCinema, 
    ActeursHasEvents, 
    ActeurHasRealisateurs,
    ActeursHasVideo,
    Admin, 
    Cinema, 
    CinemaHasDistributeurEditeur, 
    CinemaHasLieux, 
    CinemaHasRealisateurs, 
    Decoration, 
    DistributeurEditeur, 
    Events, 
    EventsHasLieux, 
    EventsHasRealisateurs, 
    Importance,
    Lieux, 
    RcEvents,
    RcEventsHasActeurs,
    RcEventsHasCinema,
    RcEventsHasLieux,
    RcEventsHasRealisateurs,
    Realisateurs, 
    Video, 
    VideoEditeur,
    VideoHasRealisateurs
 }