////// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// fns
import { createInvoice } from "../../store/reducers/saleSlice";

const EveryCategory = ({ obj }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);

  const clickCateg = async () => {
    if (obj?.codeid == 8) {
      const send = { seller_guid: data?.seller_guid };
      const res = await dispatch(createInvoice(send)).unwrap();
      if (!!res?.result) {
        navigate(`/${obj?.link}`, {
          state: {
            id: obj?.codeid,
            name: obj?.name,
            pathApi: obj?.pathApi,
            invoice_guid: res?.guid,
          },
        });
      }
    } else {
      navigate(`/${obj?.link}`, {
        id: obj?.codeid,
        name: obj?.name,
        pathApi: obj?.pathApi,
      });
    }
  };

  return (
    <button className="parentCateg" onClick={clickCateg}>
      <div className="shadow"></div>
      <img src={obj?.img} className="backgroundImage" />
      <div className="main">
        <p className="textTitle">{obj?.name}</p>
      </div>
    </button>
  );
};

export default EveryCategory;
