const router = require("express").Router();

const userController = require("../controllers/UserController");

router.get("/:id", userController.getUser); // Get a user by ID
router.delete("/:id", userController.deleteUser); // Delete a user by ID

module.exports = router;
