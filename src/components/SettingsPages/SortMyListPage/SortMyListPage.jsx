////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// ////// fns
import {
  activeCategFN,
  crudListWorkShopActiveReq,
  listAllProdsFN,
} from "../../../store/reducers/settingSlice";

////// components
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox } from "@mui/material";
import SortMyEveryProd from "../SortMyEveryProd/SortMyEveryProd";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

////// styles
import { styleCategName, styleCategBox, styleInnerTable } from "./style";

const TableList = (props) => {
  const { item, listAllProds, setCheckedPosition, checkedPosition } = props;

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(0);
  const [checkedStatus, setCheckedStatus] = useState(true);
  const [del, setDel] = useState("");

  const { activeCateg } = useSelector((state) => state.settingSlice);

  useEffect(() => {
    const list_check = item?.prods?.filter((prod) => prod?.status == 1);
    setChecked(list_check?.length >= 1 ? 1 : 0);
  }, [item?.prods]);

  const clickCateg = ({ category_guid }) => {
    if (checkedPosition != "1") return myAlert("Сохраните данные!", "error");
    if (category_guid == activeCateg) dispatch(activeCategFN("1"));
    else dispatch(activeCategFN(category_guid));
  };

  const editCategFN = async ({ category_guid }) => {
    setChecked(checkedStatus);

    const newListFN = (list) =>
      list?.map((categ) =>
        categ?.category_guid == category_guid
          ? {
              ...categ,
              prods: categ?.prods?.map((product) => ({
                ...product,
                status: checkedStatus,
              })),
            }
          : categ
      );

    dispatch(listAllProdsFN(newListFN(listAllProds)));
    const send = {
      action_type: 3,
      status: checkedStatus ? 1 : 0,
      guid: category_guid,
    };
    setCheckedStatus(!checkedStatus);

    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    if (res != 1) {
      myAlert("Упс, повторите пожалуйста еще раз", "error");
      dispatch(listAllProdsFN(listAllProds));
    }
  };

  const delCategFN = async () => {
    const newListFN = (list) => list?.filter((c) => c?.category_guid != del);
    dispatch(listAllProdsFN(newListFN(listAllProds)));
    const send = { action_type: 3, status: -1, guid: del };
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    setDel("");
    if (res != 1) {
      myAlert("Упс, повторите пожалуйста еще раз", "error");
      dispatch(listAllProdsFN(listAllProds));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // Если элемент перетащили за пределы списка, ничего не делаем

    // Создаем копию массива товаров (глубокое копирование, чтобы избежать read-only ошибок)
    const updatedProducts = item?.prods?.map((product) => ({ ...product }));

    // Получаем элементы, которые меняем местами
    const draggedItem = updatedProducts?.[result?.source?.index];
    const targetItem = updatedProducts?.[result?.destination?.index];

    if (!draggedItem || !targetItem) return; // Проверка, чтобы не было ошибок

    // 🔥 Меняем `position` местами
    const tempPosition = draggedItem.position;
    draggedItem.position = targetItem.position;
    targetItem.position = tempPosition;

    // Удаляем перемещаемый элемент из старой позиции
    const draggedProduct = updatedProducts.splice(result.source.index, 1)[0];

    // Вставляем его в новую позицию
    updatedProducts?.splice(result?.destination?.index, 0, draggedProduct);

    // Обновляем список категорий в Redux
    const updatedCategories = listAllProds?.map((category) =>
      category?.category_guid == item?.category_guid
        ? { ...category, prods: updatedProducts }
        : category
    );

    dispatch(listAllProdsFN(updatedCategories));
    setCheckedPosition(item?.category_guid); /// проверяю менялось ли что-то в списке
  };

  return (
    <>
      <TableRow sx={styleInnerTable}>
        <TableCell
          sx={{ width: 56, minWidth: 56, padding: 0 }}
          onClick={() => clickCateg(item)}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="expand row" size="small">
              {activeCateg == item?.category_guid ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        </TableCell>
        <TableCell sx={styleCategName} onClick={() => clickCateg(item)}>
          {item?.category_name || "..."}
        </TableCell>
        <TableCell sx={styleCategBox}>
          <div onChange={() => editCategFN(item)}>
            <Checkbox
              checked={!!checked}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
              color="success"
            />
          </div>
          <div
            style={{ height: 21 }}
            onClick={() => setDel(item?.category_guid)}
          >
            <DeleteIcon width="20" height="20" color="red" />
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse
            in={activeCateg == item?.category_guid}
            timeout={item?.prods?.length < 120 ? "auto" : 200}
            unmountOnExit
            sx={{ maxHeight: 450, overflowY: "auto" }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-prods">
                {(provided) => (
                  <Table
                    size="small"
                    aria-label="purchases"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <TableBody>
                      {item?.prods?.map((i, ind) => (
                        <SortMyEveryProd
                          i={i}
                          ind={ind}
                          listAllProds={listAllProds}
                          key={ind}
                        />
                      ))}
                      {provided?.placeholder}
                    </TableBody>
                  </Table>
                )}
              </Droppable>
            </DragDropContext>
          </Collapse>
        </TableCell>
      </TableRow>

      <ConfirmationModal
        visible={!!del}
        message="Удалить категорию?"
        onYes={delCategFN}
        onNo={() => setDel("")}
        onClose={() => setDel("")}
      />
    </>
  );
};

export default TableList;

TableList.propTypes = {
  row: PropTypes.shape({
    ind: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    prods: PropTypes.arrayOf(
      PropTypes.shape({
        ind: PropTypes.number.isRequired,
        historyRow: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
