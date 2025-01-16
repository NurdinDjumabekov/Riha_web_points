export const transformLists = (list, key1, key2) => {
  const newList = list?.map((i) => ({
    ...i,
    value: i?.[key1],
    label: i?.[key2],
  }));

  return newList;
};

export const transformListsProds = (list) => {
  ///// убираю лишние ключи
  const newList = list
    ?.filter(({ is_checked }) => is_checked)
    ?.map(({ product_guid, count, workshop_price }) => {
      return { product_guid, count, workshop_price };
    });

  return newList;
};

export const transformListsWH = (list) => {
  ///// убираю лишние ключи
  const newList = list
    ?.filter(({ is_checked }) => is_checked)
    ?.map(({ product_guid, count, price }) => {
      return { product_guid, count, workshop_price: price };
    });

  return newList;
};

export const transformListsProdsEdit = (list) => {
  // Фильтруем список, оставляя только те элементы, у которых is_checked = true
  const newList = list
    ?.filter(({ my_status }) => my_status) // Оставляем только те, где is_checked === true
    ?.map(({ product_guid, count, price }) => {
      return { product_guid, count, workshop_price: price };
    });

  return newList;
};

export const splitArrayIntoTwoEqualParts = (array) => {
  //// разделяю один массив на два поровну
  const defaultEmptyRows = 4; // Минимальное количество строк, если массив пустой
  const isArrayEmpty = !array || array?.length === 0;

  if (isArrayEmpty) {
    return {
      left: Array(defaultEmptyRows)?.fill({}),
      right: Array(defaultEmptyRows)?.fill({}),
    };
  }

  const midIndex = Math.ceil(array?.length / 2); // Точка разделения
  const firstHalf = array?.slice(0, midIndex); // Первая половина
  const secondHalf = array?.slice(midIndex); // Вторая половина
  const maxRows = Math.max(firstHalf?.length, secondHalf?.length);

  return {
    left: [...firstHalf, ...Array(maxRows - firstHalf.length)?.fill({})],
    right: [...secondHalf, ...Array(maxRows - secondHalf.length)?.fill({})],
  };
};
