///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";

////// components
import MyModals from "../../../common/MyModals/MyModals";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// styles
import "./style.scss";

////// helpers
import { debounce } from "lodash";

///// imgs
import searchIcon from "../../../assets/icons/searchIcon.png";
import { searchProdSale } from "../../../store/reducers/requestSlice";
import { EveryProduct } from "../../SaleProd/EveryProduct/EveryProduct";
import { roundingNum } from "../../../helpers/amounts";

const SearchProdModal = (props) => {
  const { refInput, modalSearch, setModalSearch, clearStates } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProdSearch } = useSelector((state) => state.requestSlice);

  const refInputSearch = useRef(null);
  const [searchProd, setSearchProd] = useState("");

  const closeModal = () => {
    clearStates();
    setModalSearch(false);
  };

  useEffect(() => {
    if (modalSearch) {
      setTimeout(() => {
        refInputSearch.current.focus();
        setSearchProd("");
      }, 200);
    }
  }, [modalSearch]);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        const sendData = { text, seller_guid: data?.seller_guid };
        // Подготовка данных для поиска
        dispatch(searchProdSale({ ...sendData }));
        // Выполнение поиска с заданными параметрами
      }
    }, 500),
    []
  );

  const onChange = (e) => {
    const text = e?.target?.value;
    if (text?.[0] === " " || text?.includes("  ")) {
      return;
    }
    setSearchProd(text);
    searchData(text);
    text?.length === 0 ? searchData(text) : searchData(text);
  };

  const emptyDataProd = listProdSearch?.length === 0;

  console.log(listProdSearch, "listProdSearch");

  return (
    <div className="searchProdModal">
      <MyModals openModal={modalSearch} closeModal={closeModal} title={""}>
        <div className="searchProdModal__inner">
          <form onSubmit={searchProd}>
            <div>
              <input
                ref={refInputSearch}
                type="text"
                placeholder="Поиск товаров ..."
                onChange={onChange}
                value={searchProd}
              />
              <button type="submit">
                <img src={searchIcon} alt="" />
              </button>
            </div>
          </form>

          {emptyDataProd ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <div className="blockSelectProd">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: "10%" }}>
                      №
                    </TableCell>
                    <TableCell style={{ width: "50%" }}>Продукт</TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      Остаток
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      Цена
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProdSearch?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ width: "10%" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "50%" }}
                      >
                        {row?.product_name}
                      </TableCell>
                      <TableCell align="left" style={{ width: "20%" }}>
                        {roundingNum(row?.count)} кг
                      </TableCell>
                      <TableCell align="left" style={{ width: "20%" }}>
                        {roundingNum(row?.price)} сом
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </MyModals>
    </div>
  );
};

export default SearchProdModal;
