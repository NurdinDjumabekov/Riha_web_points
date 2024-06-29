import React from "react";

////style
import "./style.scss";

const MyTable = ({ arr }) => {
  return (
    <div className="parentTable">
      <div className="mainBlock moreTable">
        <p className="name moreTextTable">Продукт</p>
        <p className="price moreTextTable">Цена</p>
        <p className="count moreTextTable">Кг (шт)</p>
      </div>
      <div>
        {arr?.map((item, index) => (
          <div className="mainBlock" key={item.guid}>
            <p className="name">
              {index + 1}. {item?.product_name}
            </p>
            <p className="price">{item?.product_price} сом</p>
            <p className="count">
              {item?.count} {item?.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTable;
