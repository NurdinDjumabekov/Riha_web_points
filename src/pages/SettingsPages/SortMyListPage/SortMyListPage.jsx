////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ////// fns
import {
  getListProdsReq,
  getListWorkShopActiveReq,
  saveListWorkShopActiveReq,
} from "../../../store/reducers/settingSlice";

/////// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";

////// components
import TableList from "../../../components/SettingsPages/SortMyListPage/SortMyListPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Select from "react-select";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import ViewGeneratePdf from "../../../components/SettingsPages/ViewGeneratePdf/ViewGeneratePdf";

////// style
import "./style.scss";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const SortMyListPage = () => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState({});
  const [checkedPosition, setCheckedPosition] = useState("1");
  const [saveModal, setSaveModal] = useState(false);

  const { listAllProds, listWH } = useSelector((state) => state.settingSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await dispatch(getListWorkShopActiveReq(data)).unwrap();
    const value = res?.[0]?.workshop_guid;
    const label = res?.[0]?.workshop_name;
    if (!!value) {
      setSelect({ value, label });
      dispatch(getListProdsReq({ wh: value, user_guid: data?.seller_guid }));
    }
  };

  const onChangeWH = async ({ label, value }) => {
    setSelect({ value, label });
    dispatch(getListProdsReq({ wh: value, user_guid: data?.seller_guid }));
  };

  const savePositionProds = async () => {
    if (listAllProds?.length == 0) return myAlert("Изменений нет", "error");

    const new_obj = listAllProds?.find(
      (i) => i?.category_guid == checkedPosition
    );

    const listIndex = new_obj?.prods?.map((obj) => obj?.position);

    const list = new_obj?.prods?.map((i, index) => {
      return { guid: i?.guid, position: index + 1 };
    });

    const res = await dispatch(saveListWorkShopActiveReq({ list })).unwrap();

    if (!!res) {
      setCheckedPosition("1");
      setSaveModal(false);
      onChangeWH(select);
      myAlert("Данные сохранены");
    } else {
      myAlert("Что-то пошло не так, повторите попытку", "error");
    }
  };

  return (
    <>
      <div className="sortMyListPage">
        <div className="header">
          <div className="myInputs">
            <Select
              options={listWH}
              className="select"
              onChange={onChangeWH}
              value={select}
              isSearchable={false}
            />
          </div>
          <div className="actions">
            {/* //// для сохранения изменения перемещенных товаров (1 - пустое значение) */}
            {checkedPosition != "1" && (
              <button onClick={() => setSaveModal(true)}>
                <SaveAsIcon sx={{ color: "#fff", width: 16, height: 16 }} />
                <p>Сохранить</p>
              </button>
            )}
            <ViewGeneratePdf list={sortFn(listAllProds)} />
          </div>
        </div>
        <div className="sortMyListPage__inner">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableBody style={{ cursor: "pointer" }}>
                {listAllProds?.map((item, index) => (
                  <TableList
                    key={index}
                    item={item}
                    index={index}
                    listAllProds={listAllProds}
                    setCheckedPosition={setCheckedPosition}
                    checkedPosition={checkedPosition}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <ConfirmationModal
        visible={saveModal}
        message={"Сохранить изменения ?"}
        onYes={savePositionProds}
        onNo={() => setSaveModal(false)}
        onClose={() => setSaveModal(false)}
      />
    </>
  );
};

export default SortMyListPage;

export const sortFn = (list) => {
  return list
    ?.map((i) => ({
      ...i,
      prods: i?.prods?.filter((prod) => prod?.status == 1),
    }))
    ?.filter((i) => i?.prods?.length > 0); // Удаляем пустые объекты
};

// import React, { useState } from "react";

// const SortMyListPage = () => {
//   const [text, setText] = useState("");
//   const [lastInputTime, setLastInputTime] = useState(0);
//   const [isScanner, setIsScanner] = useState(false);
//   const [showSearchButton, setShowSearchButton] = useState(false);

//   const SCANNER_SPEED_THRESHOLD = 80; // Если ввод быстрее 80 мс, считаем сканером

//   const handleInputChange = (e) => {
//     const now = Date.now();
//     const timeDiff = now - lastInputTime;

//     // Если символы вводятся быстро → это сканер
//     if (timeDiff < SCANNER_SPEED_THRESHOLD && text.length > 0) {
//       setIsScanner(true);
//       setShowSearchButton(false);
//     } else {
//       setIsScanner(false);
//       setShowSearchButton(true); // Показываем кнопку только при ручном вводе
//     }

//     setLastInputTime(now);
//     setText(e.target.value);
//   };

//   const handleManualSearch = () => {
//     console.log("Ручной ввод:", text);
//     setText(""); // Очищаем поле
//     setShowSearchButton(false); // Скрываем кнопку после поиска
//   };

//   const handleKeyDown = (e) => {
//     if (isScanner) {
//       console.log("Сканер ввёл:", text);
//       setText(""); // Очищаем поле после сканирования
//     }
//   };

//   return (
//     <div>
//       <form className="actionAddProd" onSubmit={(e) => e.preventDefault()}>
//         <div className="myInputs inputSend">
//           <h6>Поиск по штрих-коду</h6>
//           <input
//             type="search"
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             value={text}
//           />
//         </div>
//         {showSearchButton && (
//           <button type="button" onClick={handleManualSearch}>
//             Поиск
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SortMyListPage;
