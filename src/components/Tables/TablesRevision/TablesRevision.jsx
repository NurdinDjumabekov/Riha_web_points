/////// hooks
import React, { useRef, useState } from "react";

/////// components
import RevisionChangeCount from "../../../components/CheckProd/RevisionChangeCount/RevisionChangeCount";

////style
import "./style.scss";

const TablesRevision = ({ arr }) => {
  const [objTemporary, setObjTemporary] = useState({});

  const inputRef = useRef(null);

  const addTenporaryData = (data) => {
    setObjTemporary(data);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 1000);
  };

  return (
    <>
      <div className="listRevisionHeader">
        <div className="mainBlock more">
          <p className="name moreText">Товар</p>
          <p className="price moreText">Цена</p>
          <p className="count moreText">Вналичии</p>
          <p className="count moreText">Возврат</p>
        </div>
        <div className="listRevisionTable">
          {arr?.map((item, index) => (
            <div className="mainBlock" key={item.guid}>
              <p className="name">
                {index + 1}. {item?.product_name}
              </p>
              <p className="price">{item?.sale_price}</p>
              <p className="count">{item?.end_outcome}</p>
              <button onClick={() => addTenporaryData(item)}>
                <p>{item?.change_end_outcome}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <RevisionChangeCount
        objTemporary={objTemporary}
        setObjTemporary={setObjTemporary}
        inputRef={inputRef}
      />
    </>
  );
};

export default TablesRevision;
