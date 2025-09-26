const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", contactsController.allContacts);
router.get("/:id", contactsController.singleContact);

module.exports = router;