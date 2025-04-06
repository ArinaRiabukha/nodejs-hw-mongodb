import ContactCollection from "../db/models/contact.js";

export const getContacts = ()=> ContactCollection.find();
export const getContactsById = id => ContactCollection.findOne({_id: id});
export const addContact = payload => ContactCollection.create(payload);
export const updateContact = async(_id, payload) => {
    return ContactCollection.findByIdAndUpdate(_id, payload, {
      new: true,
    });
};
export const deleteContactById= _id => ContactCollection.findByIdAndDelete(_id);
