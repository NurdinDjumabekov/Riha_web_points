/////////////////////////////// ReturnProdScreen
///checkcheck
export const totalSumRevision = (list) => {
  const totalSum = list?.reduce(
    (total, item) => total + +item?.sale_price * +item?.change_end_outcome,
    0
  );

  return formatCount(totalSum);
};

export const totalCountReturns = (list) => {
  const totalCount = list?.products?.reduce(
    (total, item) => +total + +item?.count,
    0
  );

  return formatCount(totalCount);
};

/////////////////////////////// InvoiceCheckPage
export const sumtotalPrice = (list) => {
  const totalSum = list?.reduce((total, item) => {
    return +item?.total + total;
  }, 0);

  return formatCount(totalSum);
};

////////////

/////////////////////////////// EveryListInvoiceReturn
export const totalLidtCountReturns = (list) => {
  const totalSum = list?.reduce((total, item) => {
    return +item.price * +item.count + total;
  }, 0);

  return formatCount(totalSum);
};

/////////////////////////////// DetailedInvoiceProdScreen

export const totalCountAccept = (data) => {
  const totalItemCount = data?.list?.reduce(
    (total, item) => +total + +item?.count,
    0
  );

  return formatCount(totalItemCount);
};

export const totalSumAccept = (data) => {
  const totalSum = data?.list?.reduce(
    (total, item) => +item?.count * +item?.price + +total,
    0
  );

  return formatCount(totalSum);
};

/////////////////////////////// EveryInvoiceAcceptScreen

export const totalSumEveryAccept = (list) => {
  const totalSum = list?.reduce((total, item) => {
    return +item?.price * +item?.count + total;
  }, 0);

  return formatCount(totalSum);
};

export const sumSoputkaProds = (arr) => {
  return arr?.reduce((sum, item) => +sum + +item?.total_soputka, 0);
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
export const formatCount = (count) => {
  /// если больше 0, то округлять до 1го числа, а если его нет, то выводится просто целое число без 0
  return count % 1 === 0 ? count?.toFixed(0) : count?.toFixed(1);
};

/////////////////////////////// считаю общую саммму отдельно для кг и шт

export const unitResultFN = (data) => {
  return data?.reduce(
    (acc, item) => {
      if (item?.unit_codeid == 1) {
        //// "шт"
        acc.totalSht += item?.count;
      } else if (item?.unit_codeid == 2) {
        // "кг"
        acc.totalKg += item?.count;
      }
      return acc;
    },
    { totalSht: 0, totalKg: 0 }
  );
};

export const unitRevisions = (data) => {
  return data?.reduce(
    (acc, item) => {
      if (item?.unit_codeid == 1) {
        //// "шт"
        acc.totalSht += +item?.change_end_outcome;
      } else if (item?.unit_codeid == 2) {
        // "кг"
        acc.totalKg += +item?.change_end_outcome;
      }
      return acc;
    },
    { totalSht: 0, totalKg: 0 }
  );
};

export const roundingNum = (count) => {
  ///// округления числа
  /// если больше 0, то округлять до 2го числа, а если его нет, то выводится просто целое число без 0
  return +count % 1 === 0 ? +count?.toFixed(0) : +count?.toFixed(2);
};

export const totalSumPrice = (list) => {
  const totalSum = list?.reduce(
    (total, item) => total + (+item?.price || 0),
    0
  );
  return formatCount(totalSum);
};
