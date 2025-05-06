import { typeList } from '../../constants/contacts.js';

export const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = typeList.includes(contactType) ? contactType : undefined;

  let parsedIsFavourite = undefined;

  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') {
      parsedIsFavourite = true;
    } else if (isFavourite.toLowerCase() === 'false') {
      parsedIsFavourite = false;
    }
  }

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
