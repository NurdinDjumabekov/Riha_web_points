///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback, Fragment } from "react";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../../common/NavPrev/NavPrev";

////// styles
import "./style.scss";

////// icons
import krest from "../../assets/icons/krest.svg";

////// fns
import { searchProdLeftovers } from "../../store/reducers/saleSlice";

////// helpers
import { roundingNum } from "../../helpers/amounts";
import { myAlert } from "../../helpers/MyAlert";

const LeftoversScreen = () => {
  const dispatch = useDispatch();

  const refInputSearch = useRef(null);
  const containerRef = useRef(null);

  const [searchProd, setSearchProd] = useState("");

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProdsSearch } = useSelector((state) => state.saleSlice);

  useEffect(() => {
    setTimeout(() => refInputSearch.current?.focus(), 200);
    getData();
  }, []);

  const onChange = (e) => {
    const text = e?.target?.value;
    if (text?.includes("  ")) return;
    setSearchProd(text);
  };

  const searchData = async (e) => {
    e.preventDefault();
    const error = "В поисковой строке должно быть не меньше 3х букв";
    if (containerRef.current) {
      containerRef.current?.scrollTo({ top: 0 });
    }
    if (searchProd?.length < 3) return myAlert(error, "error");
    const send = {
      text: searchProd,
      seller_guid: data?.seller_guid,
      start: "1",
      end: "500",
    };
    dispatch(searchProdLeftovers(send));
  };

  const getData = async () => {
    setSearchProd("");
    const send = {
      // text: "Хлеб",
      text: "",
      seller_guid: data?.seller_guid,
      start: "1",
      end: "500",
    };
    dispatch(searchProdLeftovers(send));
  };

  const clearInputSearch = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    getData();
    setSearchProd("");
  };

  let counter = 0; // Внешний счётчик для сквозной нумерации

  return (
    <div className="searchProd leftoversContainer">
      <div className="searchProd__inner">
        <div className="titleAction">
          <NavPrev />
          <form className="titleAction__inner" onSubmit={searchData}>
            <div className="myInputs inputSend">
              <input
                ref={refInputSearch}
                onChange={onChange}
                value={searchProd}
                className="searchInput"
              />
              {searchProd?.length !== 0 && (
                <div className="krestImg" onClick={clearInputSearch}>
                  <img src={krest} alt="x" />
                </div>
              )}
            </div>
            <button className="searchBtn">
              <p>Поиск товаров</p>
            </button>
          </form>
        </div>
        <div className="searchProd__prod">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "100%" }}
            className="scroll_table standartTable"
            ref={containerRef}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "5%" }}>
                    №
                  </TableCell>
                  <TableCell style={{ width: "29%" }}>Товар</TableCell>
                  <TableCell align="left" style={{ width: "11%" }}>
                    Цеховая цена
                  </TableCell>
                  <TableCell align="left" style={{ width: "11%" }}>
                    Отпускная цена
                  </TableCell>
                  {/* <TableCell align="left" style={{ width: "11%" }}>
                    Остаток на начало
                  </TableCell>
                  <TableCell align="left" style={{ width: "11%" }}>
                    Приход
                  </TableCell>
                  <TableCell align="left" style={{ width: "11%" }}>
                    Расход
                  </TableCell> */}
                  <TableCell align="left" style={{ width: "11%" }}>
                    Остаток
                  </TableCell>
                  <TableCell align="left" style={{ width: "11%" }}>
                    Штрих коды
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProdsSearch?.map((item, index) => (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell className="subTitle"></TableCell>
                      <TableCell colSpan={7} align="left" className="subTitle">
                        Категория: {item.categ}
                      </TableCell>
                    </TableRow>
                    {item?.list?.map((row) => {
                      counter++;
                      return (
                        <TableRow key={`${item.categ}-${counter}`}>
                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            style={{ width: "5%" }}
                          >
                            {counter}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: "29%" }}
                          >
                            {row?.product_name}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.price) || 0} сом
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.sale_price) || 0} сом
                          </TableCell>
                          {/* <TableCell align="left" style={{ width: "11%" }}>
                              {roundingNum(row?.start_outcome) || "0"}{" "}
                              {row?.unit || ""}
                            </TableCell>
                            <TableCell align="left" style={{ width: "11%" }}>
                              {roundingNum(row?.income) || "0"} {row?.unit || ""}
                            </TableCell>
                            <TableCell align="left" style={{ width: "11%" }}>
                              {roundingNum(row?.outcome) || "0"} {row?.unit || ""}
                            </TableCell> */}
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.end_outcome) || "0"}{" "}
                            {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {row?.qrcode}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Fragment>
                ))}
                <TableRow>
                  {listProdsSearch?.length == 0 && searchProd == "" && (
                    <TableCell className="loader" colSpan={8} align="center">
                      Список пустой
                    </TableCell>
                  )}
                  {listProdsSearch?.length == 0 && searchProd != "" && (
                    <TableCell className="loader" colSpan={8} align="center">
                      Товар с названием "{searchProd}" не найден
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default LeftoversScreen;
