const router = require("express").Router();
const contactsController = require("../controllers/contactsController");
const validation = require("../../utilities/contacts-validation");

router.get("/", contactsController.allContacts);

router.get("/:id", contactsController.singleContact);

router.post(
    "/",
    validation.ContactRules(),
    validation.handleValidationErrors,
    contactsController.createContact
);

router.put(
    "/:id",
    validation.ContactRules(),
    validation.handleValidationErrors,
    contactsController.updateContact
);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;