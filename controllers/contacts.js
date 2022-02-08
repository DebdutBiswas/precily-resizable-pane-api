// router.get('/', contactsController.getAllContacts);
// router.post('/', contactsController.addNewContact); 
// router.get('/:id', contactsController.getContactById);
// router.put('/:id', contactsController.updateContactById);
// router.delete('/:id', contactsController.deleteContactById);

const db = require('../configs/database');
const _contactsModel = require('../models/contacts');

const contactsModel = _contactsModel(db);
// const contactsModel = _contactsModel(db.mongoose);

exports.getAllContacts = async (req, res) => {
    await contactsModel.find({})
    .then(contacts => {
        if (contacts === null || contacts.length === 0) {
            res.status(200).send({
                result: [],
                message: 'No contacts exist!'
            });
        } else {
            res.send({'result': contacts});
        }
    })
    .catch(err => {
        res.status(200).send({
            result: [],
            message: err.message || 'Something went wrong while getting the list of contacts!'
        });
    });
};

exports.addNewContact = async (req, res) => {
    if (!req.body.name || !req.body.phone) {
        return res.status(400).send({
            message: 'Please upload valid JSON format'
        });
    }

    const newContact = new contactsModel(
        {
            name: req.body.name?.toString() || '',
            phone: req.body.phone?.toString() || ''
        }
    );

    await newContact.save()
    .then(contact => {
        if (contact !== null) res.send({'result': contact});
        else {
            res.status(200).send({
                result: {},
                message: 'Something went wrong while getting the newly created contact!'
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            result: {},
            message: err.message || 'Something went wrong while creating new contact!'
        });
    });
};

exports.getContactById = async (req, res) => {
    const id = req.params.id?.toString().trim() ?? '';

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await contactsModel.findById(id)
        .then(contact => {
            if (contact !== null) res.send({'result': contact});
            else {
                res.status(200).send({
                    result: {},
                    message: 'The contact does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(200).send({
                result: {},
                message: err.message || 'Something went wrong while getting the contact!'
            });
        });
    } else {
        res.status(200).send({
            result: {},
            message: 'Invalid id provided!'
        });
    }
};

exports.updateContactById = async (req, res) => {
    if (!req.body.name || !req.body.phone) {
        return res.status(400).send({
            message: 'Please upload valid JSON format'
        });
    }

    const id = req.params.id?.toString().trim() ?? '';

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const newContact = {
            name: req.body.name?.toString() || '',
            phone: req.body.phone?.toString() || ''
        };

        await contactsModel.findByIdAndUpdate(id, newContact, { useFindAndModify: false })
        // await contactsModel.findOneAndUpdate({ id }, newContact, { new: true })
        .then(contact => {
            if (contact !== null) res.send({'result': contact});
            else {
                res.status(200).send({
                    result: {},
                    message: 'The contact does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(200).send({
                result: {},
                message: err.message || 'Something went wrong while updating the contact!'
            });
        });
    } else {
        res.status(200).send({
            result: {},
            message: 'Invalid id provided!'
        });
    }
};

exports.deleteContactById = async (req, res) => {
    const id = req.params.id?.toString().trim() ?? '';

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await contactsModel.findByIdAndRemove(id)
        .then(contact => {
            if (contact !== null) res.send({'result': contact});
            else {
                res.status(200).send({
                    result: {},
                    message: 'The contact does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(200).send({
                result: {},
                message: err.message || 'Something went wrong while deleting the contact!'
            });
        });
    } else {
        res.status(200).send({
            result: {},
            message: 'Invalid id provided!'
        });
    }
};