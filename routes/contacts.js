const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.post('/', contactsController.addNewContact); 
router.get('/:id', contactsController.getContactById);
router.put('/:id', contactsController.updateContactById);
router.delete('/:id', contactsController.deleteContactById);

module.exports = router;