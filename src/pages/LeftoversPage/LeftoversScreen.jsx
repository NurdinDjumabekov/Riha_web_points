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

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProdsSearch } = useSelector((state) => state.saleSlice);

  const fetchData = (initialLoad = false) => {
    // setProducts((prevProducts) => {
    //   if (prevProducts.length >= 1000) {
    //     setHasMore(false);
    //     return prevProducts;
    //   }
    //   const lastId = prevProducts[prevProducts.length - 1]?.id || 0;
    //   const newProducts = generateProducts(lastId + 1, initialLoad ? 150 : 30);
    // });
    return [];
  };

  useEffect(() => {
    fetchData(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          fetchData();
        }
      },
      { root: containerRef.current, threshold: 1 } // Отслеживаем именно прокрутку контейнера
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    setTimeout(() => refInputSearch.current.focus(), 200);
    getData();
  }, []);

  function onChange(e) {
    const text = e?.target?.value;
    if (text?.includes("  ")) return;
    setSearchProd(text);
  }

  function searchData(e) {
    e.preventDefault();
    const error = "В поисковой строке должно быть не меньше 3х букв";
    if (searchProd?.length < 3) return myAlert(error, "error");
    const sendData = { text: searchProd, seller_guid: data?.seller_guid };
    dispatch(searchProdLeftovers(sendData));
  }

  function getData() {
    setSearchProd("Колб");
    const sendData = { text: "Колб", seller_guid: data?.seller_guid };
    dispatch(searchProdLeftovers(sendData));
  }

  function clearInputSearch() {
    getData();
    setSearchProd("");
  }

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
                    <TableCell style={{ width: "20%" }}>Товар</TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Цена
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Остаток на начало
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Приход
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Расход
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Остаток на конец
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody ref={containerRef}>
                  {listProdsSearch?.map((category, index) => (
                    <Fragment key={index}>
                      <TableRow>
                        <TableCell align="left" component="th"></TableCell>
                        <TableCell colSpan={6} align="left" component="th">
                          Категория: {category.title}
                        </TableCell>
                      </TableRow>
                      {category?.list?.map((row, idx) => (
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
                            style={{ width: "25%" }}
                          >
                            {row?.product_name}
                          </TableCell>
                          <TableCell align="left" style={{ width: "15%" }}>
                            {roundingNum(row?.sale_price) || 0} сом
                          </TableCell>
                          <TableCell align="left" style={{ width: "15%" }}>
                            {roundingNum(row?.start_outcome) || "0"}{" "}
                            {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "15%" }}>
                            {roundingNum(row?.income) || "0"} {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "15%" }}>
                            {roundingNum(row?.outcome) || "0"} {row?.unit || ""}
                          </TableCell>
                          <TableCell align="left" style={{ width: "15%" }}>
                            {roundingNum(row?.end_outcome) || "0"}{" "}
                            {row?.unit || ""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                </TableBody>
                {hasMore && <div ref={loader}>Загружаю...</div>}
                {!hasMore && <p>Все товары загружены!</p>}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftoversScreen;
