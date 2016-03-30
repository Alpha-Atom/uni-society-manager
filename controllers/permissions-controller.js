var society_controller = require("./society-controller.js");
var bcrypt = require("bcrypt-nodejs");

module.exports = {
  user_can_auth: function (user, pass, complete) {
    var user_controller = require("./user-controller.js");
    user_controller.get_password(user, function (result) {
      bcrypt.compare(pass, result, function (err, matched) {
        complete(matched === true);
      });
    })
  },

  user_can_view_society: function (auth, complete) {
    complete(true);
  },

  user_can_view_soc_events: function (auth, society, complete) {
    var user_controller = require("./user-controller.js");
    user_controller.get_user_from_auth(auth, function (username) {
      if (!username) {
        complete(false);
        return;
      }
      society_controller.get_user_list(society, function (userlist) {
        if (!userlist[0]) {
          complete(false);
          return;
        }
        complete((userlist.indexOf(username) !== -1));
      });
    });
  },

  user_can_manage_soc_events: function (auth, society, complete) {
    var user_controller = require("./user-controller.js");
    user_controller.get_user_from_auth(auth, function(username) {
      if (!username) {
        complete(false);
        return;
      }
      society_controller.get_admin_list(society, function (adminlist) {
        if (!adminlist[0]) {
          complete(false);
          return;
        }
        complete((adminlist.indexOf(username) !== -1));
      });
    });
  },

  user_can_manage_society: function (auth, society, complete) {
    var user_controller = require("./user-controller.js");
    user_can_manage_soc_events(auth, society, function (permission) {
      complete(permission);
    });
  }
}
