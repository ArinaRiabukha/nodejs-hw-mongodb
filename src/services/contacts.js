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

  const filter = {};
  if (filters.userId) {
    filter.userId = filters.userId;
  }
  if (filters.contactType) {
    filter.contactType = filters.contactType;
  }
  if (typeof filters.isFavourite === 'boolean') {
    filter.isFavourite = filters.isFavourite;
  }

  const data = await ContactCollection.find(filter)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments(filter);

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};
export const getContactsById = (id, userId) =>
  ContactCollection.findOne({ _id: id, userId });
export const addContact = (payload) => ContactCollection.create(payload);
export const updateContact = async (_id, payload) => {
  return ContactCollection.findByIdAndUpdate(_id, payload, { new: true });
};
export const deleteContactById = (_id) =>
  ContactCollection.findByIdAndDelete(_id);
