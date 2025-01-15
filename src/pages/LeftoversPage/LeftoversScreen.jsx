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
  const loader = useRef(null);
  const containerRef = useRef(null);

  const [searchProd, setSearchProd] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [checkScroll, setCheckScroll] = useState(true); //  можно ли скролить и получать данные дальше или нельзя
  const [count, setCount] = useState(50);

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProdsSearch } = useSelector((state) => state.saleSlice);

  async function getAllDataSearch(initialLoad) {
    //// получение данных по 50
    if (!checkScroll) return setHasMore(false);

    setCount(async (prevCount) => {
      const send = {
        text: searchProd,
        seller_guid: data?.seller_guid,
        start: "1",
        end: prevCount + 50,
      };
      const res = await dispatch(searchProdLeftovers(send)).unwrap();
      setCheckScroll(res?.check);
      return prevCount + 50;
    });
  }

  useEffect(() => {
    getAllDataSearch(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          getAllDataSearch(false);
        }
      },
      { root: containerRef.current, threshold: 1 }
      // Отслеживаем именно прокрутку контейнера
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    setTimeout(() => refInputSearch.current?.focus(), 200);
    getData();
  }, []);

  function onChange(e) {
    const text = e?.target?.value;
    if (text?.includes("  ")) return;
    setSearchProd(text);
  }

  async function searchData(e) {
    e.preventDefault();
    const error = "В поисковой строке должно быть не меньше 3х букв";
    if (searchProd?.length < 3) return myAlert(error, "error");
    const send = {
      text: searchProd,
      seller_guid: data?.seller_guid,
      start: "1",
      end: "50",
    };
    const res = await dispatch(searchProdLeftovers(send)).unwrap();
    setCheckScroll(res?.check);
  }

  async function getData() {
    setSearchProd("Колб");
    setCount(50);
    const send = {
      text: "Колб",
      seller_guid: data?.seller_guid,
      start: "1",
      end: "50",
    };
    const res = await dispatch(searchProdLeftovers(send)).unwrap();
    setCheckScroll(res?.check);
  }

  function clearInputSearch() {
    getData();
    setSearchProd("");
  }

  console.log(listProdsSearch, "listProdsSearch");

  return (
    <>
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
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: "5%" }}>
                      №
                    </TableCell>
                    <TableCell style={{ width: "29%" }}>Товар</TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Цена
                    </TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Остаток на начало
                    </TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Приход
                    </TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Расход
                    </TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Остаток на конец
                    </TableCell>
                    <TableCell align="left" style={{ width: "11%" }}>
                      Штрих коды
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody ref={containerRef}>
                  {listProdsSearch?.map((item, index) => (
                    <Fragment key={index}>
                      <TableRow>
                        <TableCell className="subTitle"></TableCell>
                        <TableCell
                          colSpan={7}
                          align="left"
                          className="subTitle"
                        >
                          Категория: {item.categ}
                        </TableCell>
                      </TableRow>
                      {item?.list?.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            style={{ width: "5%" }}
                          >
                            {idx + 1}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: "29%" }}
                          >
                            {row?.product_name}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.sale_price) || 0} сом
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.start_outcome) || "0"}{" "}
                            {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.income) || "0"} {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.outcome) || "0"} {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {roundingNum(row?.end_outcome) || "0"}{" "}
                            {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "11%" }}>
                            {row?.qrcode}
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                  <TableRow>
                    {hasMore && (
                      <TableCell colSpan={8} align="left" className="loader">
                        Загрузка...
                        <div className="preloader">
                          <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {!hasMore && (
                      <TableCell colSpan={7} align="left" className="loader">
                        Все товары загружены!
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftoversScreen;
