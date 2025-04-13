import { sortList } from '../constants/index.js';
import ContactCollection from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactCollection.find();

  if (filters.parsedType) {
    contactQuery.where('contactType').equals(filters.parsedType);
  }
  if (typeof filters.isFavourite === 'boolean') {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const items = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();
  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactsById = (id) => ContactCollection.findOne({ _id: id });
export const addContact = (payload) => ContactCollection.create(payload);
export const updateContact = async (_id, payload) => {
  return ContactCollection.findByIdAndUpdate(_id, payload);
};
export const deleteContactById = (_id) =>
  ContactCollection.findByIdAndDelete(_id);
