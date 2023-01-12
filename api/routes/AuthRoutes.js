module.exports = function(app){

    const AuthController = require("../controllers/AuthController");

    app.post("/register", AuthController.registerShedOwner);
    //app.post("/login_shedowner",AuthController.loginShedOwner);

    // app.post("/register_shedowner",AuthController.registerShedOwner);
    // app.post("/login_shedowner",AuthController.loginShedOwner);

}
