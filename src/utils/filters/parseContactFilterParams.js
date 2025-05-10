import { typeList } from '../../constants/contacts.js';

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = typeList.includes(type) ? type : undefined;

  let parsedIsFavourite = undefined;

  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') {
      parsedIsFavourite = true;
    } else if (isFavourite.toLowerCase() === 'false') {
      parsedIsFavourite = false;
    }
  }

  return {
    parsedType,
    isFavourite: parsedIsFavourite,
  };
};
