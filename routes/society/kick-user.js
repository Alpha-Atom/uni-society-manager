var society_controller = require("./../../presenters/society-controller.js");

module.exports = {
  perform: function (a,b) {
    perform(a,b);
  }
}

var perform = function (req, res) {
  var kicked = req.body.user || req.query.user;
  var soc_name = req.body.society || req.query.society;
  var auth = req.body.auth || req.query.auth;

  if (kicked && soc_name && auth) {
    society_controller.kick_user(kicked, soc_name, auth, function (response) {
      res.send(response);
    });
  } else {
    res.send({
      "success": 0,
      "error": 4
    })
  }
};
