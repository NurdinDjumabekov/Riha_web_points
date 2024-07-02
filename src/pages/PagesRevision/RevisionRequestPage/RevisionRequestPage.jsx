////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { getRevisionRequest } from "../../../store/reducers/requestSlice";

////// components
import ListProdsRevision from "../../../components/CheckProd/ListProdsRevision/ListProdsRevision";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const RevisionRequestPage = () => {
  ////// каждый запрос других пр0давцов для подтверждения ревизии

  const dispatch = useDispatch();

  const { listRequestRevision } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getRevisionRequest(data?.seller_guid));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <NavMenu navText={`Список запросов на ревизию`} />
      <div className="revisionRequest">
        {listRequestRevision?.length === 0 ? (
          <p className="noneData">спиоск пустой</p>
        ) : (
          listRequestRevision?.map((item) => (
            <ListProdsRevision
              item={item}
              disable={item?.status === 1 ? false : true}
              key={item.guid}
            />
          ))
        )}
      </div>
    </>
  );
};

export default RevisionRequestPage;
