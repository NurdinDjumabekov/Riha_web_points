///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { roundingNum } from "../../../helpers/amounts";

///// fns
import {
  createInvoice,
  delProdInInvoice,
  getProducts,
  getProductsInQr,
  updateStatusInvoice,
} from "../../../store/reducers/saleSlice";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import GeneratePdfCheque from "../GeneratePdfCheque/GeneratePdfCheque";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import NavPrev from "../../../common/NavPrev/NavPrev";
import SaleProdModal from "../SaleProdModal/SaleProdModal";

///// icons
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////// styles
import "./style.scss";

const SaleProds = (props) => {
  const { invoice_guid, status, codeid, type } = props;
  //// type - 1 редакти

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refInput = useRef(null);
  const refInputSum = useRef(null);

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listProds } = useSelector((state) => state.saleSlice);

  const [sum, setSum] = useState("");
  const [modal, setModal] = useState({});
  const [price, setPrice] = useState("");
  const [confirm, setConfirm] = useState(false);

  const getData = () => dispatch(getProducts({ invoice_guid, type }));

  const sendProd = async (e) => {
    e.preventDefault();
    const send = { qrcode: sum, seller_guid: data?.seller_guid };
    const res = await dispatch(getProductsInQr(send)).unwrap();
    if (!!res?.guid) {
      setModal(res);
      setTimeout(() => {
        refInputSum.current?.focus();
      }, 200);
    } else {
      myAlert("Не удалось найти такой продукт", "error");
      setSum("");
    }
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      if (!!!status) {
        refInput.current?.focus();
      }
    }, 500);
  }, [invoice_guid]);

  const onChange = (e) => setSum(e.target.value);

  const clickDelProd = async (obj) => {
    const send = { product_guid: obj?.guid };
    const res = await dispatch(delProdInInvoice(send)).unwrap();
    if (res?.result == 0) {
      getData();
    }
  };

  const clearStates = () => {
    setSum("");
    setPrice("");
    refInput.current?.focus();
  };

  const closeModal = () => {
    setModal({});
    clearStates();
  };

  const sendAcceptInvoice = async () => {
    if (listProds?.length == 0) {
      myAlert("Пустой список!", "error");
      setConfirm("");
      return;
    }

    const send = { invoice_guid, status: 2 };
    //// 2 - подтверждение накладной продажи, сопутки и ревизии
    const res = await dispatch(updateStatusInvoice({ send, type })).unwrap();
    if (type == 1 && !!res?.result) {
      //// Продажи
      navigate("/");
      const res = await dispatch(createInvoice(data)).unwrap();
      const state = { invoice_guid: res?.guid, type: 1 };
      if (res?.guid) {
        navigate(`/sale_qr_code/main`, { state });
      }
    } else if (type == 2 && !!res?.result) {
      //// Сопутка
      navigate("/soputka/main");
    } else if (type == 3 && !!res?.result) {
      //// Ревизия
      navigate("/revision/main");
    }
  };

  const objAction = {
    1: (
      <>
        {!!!status && (
          <button
            className="saveAction endSaleBtn"
            onClick={() => setConfirm(true)}
          >
            <p>Завершить продажу</p>
          </button>
        )}
      </>
    ),
    2: (
      <button className="saveAction " onClick={() => setConfirm(true)}>
        <LibraryAddIcon sx={{ width: 16, height: 16 }} />
        <p>Завершить</p>
      </button>
    ),
    3: (
      <button className="saveAction " onClick={() => setConfirm(true)}>
        <LibraryAddIcon sx={{ width: 16, height: 16 }} />
        <p>Завершить ревизию</p>
      </button>
    ),
  };

  return (
    <>
      <div className="saleProdsQR">
        <div className="saleProdsQR__inner">
          <div className={`header ${!!!status ? "moreHeader" : ""}`}>
            {!!status ? (
              <div className="titleInAllPage">
                <NavPrev />
                <h3 className="titlePage">Накладная № {codeid}</h3>
              </div>
            ) : (
              <form className="actionAddProd" onSubmit={sendProd}>
                <div className="myInputs inputSend">
                  <h6>Поиск по штрих коду</h6>
                  <input
                    ref={refInput}
                    type="search"
                    onChange={onChange}
                    value={sum}
                  />
                </div>
              </form>
            )}
            <div className="header headerIner">
              {type == 1 && (
                <GeneratePdfCheque
                  list={listProds}
                  invoice_guid={invoice_guid}
                />
              )}
              {objAction?.[type]}
            </div>
          </div>
          <div className="saleProdsQR__table">
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
                      Цена за кг (шт)
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Итоговый вес (шт)
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Cумма продажи
                    </TableCell>
                    <TableCell align="center" style={{ width: "9%" }}>
                      *
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
                        {listProds?.length - index}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "41%" }}
                      >
                        {row?.product_name}
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {roundingNum(row?.price)} сом
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {roundingNum(row?.count)} {row?.unit}
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {roundingNum(row?.product_price)} сом
                      </TableCell>
                      <TableCell align="left" style={{ width: "9%" }}>
                        {!!!status ? (
                          <div className="delIcon">
                            <button onClick={(e) => clickDelProd(row)}>
                              <DeleteIcon
                                width={19}
                                height={19}
                                color={"red"}
                              />
                            </button>
                          </div>
                        ) : (
                          "..."
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="footerTable">
                    <TableCell colSpan={4} align="left">
                      Итого к оплате
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                      {roundingNum(listProds?.[0]?.total_price) || "0"} сом
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <SaleProdModal
          modal={modal}
          closeModal={closeModal}
          refInputSum={refInputSum}
          price={price}
          setPrice={setPrice}
          invoice_guid={invoice_guid}
          type={type}
        />
      </div>

      <ConfirmationModal
        visible={!!confirm}
        message="Завершить ?"
        onYes={sendAcceptInvoice}
        onNo={() => setConfirm("")}
        onClose={() => setConfirm("")}
      />
    </>
  );
};

export default SaleProds;
