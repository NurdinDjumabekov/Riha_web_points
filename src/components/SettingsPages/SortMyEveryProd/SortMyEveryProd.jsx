////// hooks
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

// ////// fns
import { listAllProdsFN } from "../../../store/reducers/settingSlice";
import { crudListWorkShopActiveReq } from "../../../store/reducers/settingSlice";

////// components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";

////// icons
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

const SortMyEveryProd = ({ i, ind, listAllProds }) => {
  const dispatch = useDispatch();

  const [del, setDel] = useState({});

  const editStatus = async (obj) => {
    const { status, guid } = obj;
    const new_list = (list) =>
      list?.map((category) => ({
        ...category,
        prods: category?.prods?.map((product) =>
          product?.guid == guid
            ? { ...product, status: status == 1 ? 0 : 1 }
            : product
        ),
      }));

    const send = { action_type: 2, guid, status: status == 1 ? 0 : 1 };
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    dispatch(listAllProdsFN(new_list(listAllProds)));
    if (!res) dispatch(listAllProdsFN(listAllProds));
  };

  const delProdFN = async () => {
    const new_list = (list) =>
      list?.map((category) => ({
        ...category,
        prods: category?.prods?.filter((p) => p?.guid != del?.guid),
      }));

    const send = { action_type: 2, guid: del?.guid, status: -1 };
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    setDel({});
    dispatch(listAllProdsFN(new_list(listAllProds)));
    if (!res) dispatch(listAllProdsFN(listAllProds));
  };

  const obj52 = { maxWidth: 56, minWidth: 56, width: 56, padding: 0 };
  const obj82 = { maxWidth: 82, padding: 0, minWidth: 82, width: 82 };

  return (
    <>
      <Draggable
        key={i?.guid_product}
        draggableId={i?.guid_product}
        index={ind}
      >
        {(provided) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TableCell sx={obj52} onClick={() => editStatus(i)}>
              <p style={{ textAlign: "center", fontWeight: 400 }}>{ind + 1}</p>
            </TableCell>
            <TableCell
              sx={{ fontSize: 13, fontWeight: 400 }}
              style={{ padding: "0px 10px 0px 5px" }}
              onClick={() => editStatus(i)}
            >
              {i?.product_name || "..."}
            </TableCell>
            <TableCell sx={obj82}>
              <div
                style={{ display: "flex", padding: 0, alignItems: "center" }}
              >
                <div onClick={() => editStatus(i)}>
                  <Checkbox
                    checked={!!i?.status}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                  />
                </div>
                <div style={{ height: 21 }} onClick={() => setDel(i)}>
                  <DeleteIcon width="20" height="20" color="red" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </Draggable>
      <ConfirmationModal
        visible={!!del?.guid_product}
        message="Удалить ?"
        onYes={delProdFN}
        onNo={() => setDel({})}
        onClose={() => setDel({})}
      />
    </>
  );
};

export default SortMyEveryProd;
