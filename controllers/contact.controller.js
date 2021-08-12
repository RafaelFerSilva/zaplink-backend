const { remove } = require("../models/contact.model");
const ContactModel = require("../models/contact.model");

module.exports = {
  async create(request, h) {
    if (request.payload == null)
      return h.response({ message: "Not JSON." }).code(400);

    const contact = new ContactModel({
      name: request.payload.name,
      number: request.payload.number,
      description: request.payload.description,
    });

    if (!contact.name)
      return h.response({ message: "Name Is required." }).code(409);

    if (!contact.number)
      return h.response({ message: "Number Is required." }).code(409);

    if (!contact.description)
      return h.response({ message: "Description Is required." }).code(409);

    const dup = await ContactModel.findOne({ number: contact.number }).exec();

    if (dup) {
      return h.response({ error: 'Duplicated Number' }).code(409)
    }

    try {
      let result = await contact.save();
      return h.response(result).code(200);
    } catch (error) {
      return h.response(error).code(500)
    }
  },

  async remove(request, h) {
    try {
      await ContactModel.deleteOne({ _id: request.params.contactid})
      return h.response({}).code(204)
    } catch (error) {
      return h.response(error).code(500)
    }
  },

  async list(request, h) {
    const contacts = await ContactModel.find().exec();
    return contacts;
  },
};
