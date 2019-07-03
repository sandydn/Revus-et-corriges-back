const Admin = require('./Admin')
const Auth = require('../auth/AuthController')
const Contact = require('./Contact')
const Contact_has_video = require('./Contact_has_video')
const Decoration = require('./Decoration')
const Event = require('./Event')
const Event_has_contact = require('./Event_has_contact')
const Lieux = require('./Lieux')
const Video = require('./Video')
const Video_has_event = require('./Video_has_event')

module.exports = {
  Admin,
  Auth,
  Contact,
  Contact_has_video,
  Decoration,
  Event,
  Event_has_contact,
  Lieux,
  Video,
  Video_has_event
}