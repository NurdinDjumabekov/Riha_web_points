///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import Select from "react-select";

////// styles
import "./style.scss";

////// fns
import { searchProdSale } from "../../../store/reducers/requestSlice";
import {
  getCategs,
  getSortProds,
  getWorkShops,
  searchProdLeftovers,
} from "../../../store/reducers/saleSlice";

////// helpers
import { debounce } from "lodash";
import { transformLists } from "../../../helpers/transformLists";
import { roundingNum } from "../../../helpers/amounts";

///// imgs
import searchIcon from "../../../assets/icons/searchIcon.png";

const SearchProdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refInput = useRef(null);

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProds } = useSelector((state) => state.saleSlice);
  const { listWorkShops } = useSelector((state) => state.saleSlice);
  const { listCategs } = useSelector((state) => state.saleSlice);

  const refInputSearch = useRef(null);
  const [searchProd, setSearchProd] = useState("");
  const [activeWorkShop, setActiveWorkShop] = useState({});
  const [activeCategs, setActiveCategs] = useState({});

  useEffect(() => {
    setTimeout(() => {
      refInputSearch.current.focus();
    }, 200);
    setSearchProd("");
    getData();
  }, []);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        const sendData = { text, seller_guid: data?.seller_guid };
        dispatch(searchProdLeftovers({ ...sendData }));
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
    text?.length == 0 ? getData() : searchData(text);
  };

  const onChangeWS = async ({ label, value }) => {
    setActiveWorkShop({ label, value });
    const send = { ...data, workshop_guid: value };
    const resp = await dispatch(getCategs(send)).unwrap();
    const labelCateg = resp?.[0]?.category_name;
    const valueCateg = resp?.[0]?.category_guid;
    setActiveCategs({ label: labelCateg, value: valueCateg });
    if (!!valueCateg) {
      dispatch(getSortProds({ ...data, valueCateg, value }));
      setSearchProd("");
      ////// очищаю поиск
    }
  };

  const onChangeCateg = async ({ label, value }) => {
    setActiveCategs({ label, value });
    if (!!value) {
      const send = { ...data, valueCateg: value, value: activeWorkShop?.value };
      dispatch(getSortProds(send));
      setSearchProd("");
      ////// очищаю поиск
    }
  };

  const getData = async () => {
    // ////// внутри есть getCategoryTT и getProductTT
    const res = await dispatch(getWorkShops(data)).unwrap();
    const label = res?.[0]?.workshop;
    const value = res?.[0]?.workshop_guid;
    setActiveWorkShop({ label, value });

    const send = { ...data, workshop_guid: value };
    const resp = await dispatch(getCategs(send)).unwrap();
    const labelCateg = resp?.[0]?.category_name;
    const valueCateg = resp?.[0]?.category_guid;
    setActiveCategs({ label: labelCateg, value: valueCateg });
    dispatch(getSortProds({ ...data, valueCateg, value }));
    setSearchProd("");
    ////// очищаю поиск
  };

  const emptyDataProd = listProds?.length === 0;

  return (
    <div className="searchProd">
      <div className="searchProd__inner">
        <div className="titleAction">
          <div className="myInputs inputSend">
            <h6>Поиск товаров </h6>
            <input
              ref={refInputSearch}
              type="text"
              placeholder="Поиск товаров ..."
              onChange={onChange}
              value={searchProd}
              className="searchInput"
            />
          </div>
          <div className="myInputs selectPosition">
            <h6>Цех</h6>
            <Select
              options={listWorkShops}
              className="select"
              onChange={onChangeWS}
              value={activeWorkShop}
            />
          </div>
          <div className="myInputs selectPosition">
            <h6>Категории</h6>
            <Select
              options={listCategs}
              className="select"
              onChange={onChangeCateg}
              value={activeCategs}
            />
          </div>
        </div>
        {emptyDataProd ? (
          <p className="noneData">Список пустой</p>
        ) : (
          <div className="searchProd__prod">
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "100%" }}
              className="scroll_table standartTable"
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: "5%" }}>
                      №
                    </TableCell>
                    <TableCell style={{ width: "41%" }}>Продукт</TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Цена за кг
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Остаток
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProds?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ width: "5%" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "41%" }}
                      >
                        {row?.product_name}
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {roundingNum(row?.product_price) || 0} сом
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {roundingNum(row?.end_outcome) || "0"}{" "}
                        {row?.unit || "кг"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProdPage;
