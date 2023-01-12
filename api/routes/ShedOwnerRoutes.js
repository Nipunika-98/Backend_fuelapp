const { verifyToken } = require("../utils/verifyToken");
module.exports = function(app) {

    const ShedOwnerController = require("../controllers/ShedOwnerController");
    
    app.post("/create_post",[verifyToken],ShedOwnerController.createPost);
    app.get("/posts",[verifyToken],ShedOwnerController.getAllPosts);
    app.get("/post/:id", [verifyToken], ShedOwnerController.getPostById);
};