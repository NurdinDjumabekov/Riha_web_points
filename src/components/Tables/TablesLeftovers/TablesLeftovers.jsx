////// helpers
import { objTitleLeftov } from "../../../helpers/Data";

///// style
import "./style.scss";

const TablesLeftovers = ({ arr }) => {
  return (
    <div className="parentListLeftovers">
      <div className="mainBlock more">
        <p className="name moreText">{objTitleLeftov?.[1]}</p>
        <p className="price moreText">{objTitleLeftov?.[2]}</p>
        <p className="ostatokStart moreText">{objTitleLeftov?.[3]}</p>
        <p className="prihod moreText">{objTitleLeftov?.[4]}</p>
        <p className="rashod moreText">{objTitleLeftov?.[5]}</p>
        <p className="ostatokEnd moreText">{objTitleLeftov?.[6]}</p>
      </div>
      <div className="listProdsLeftovers">
        {arr?.map((item, index) => (
          <div className="mainBlock">
            <p className="name">
              {index + 1}. {item?.product_name}
            </p>
            <p className="price">{item?.price}</p>
            <p className="ostatokStart">{item?.start_outcome}</p>
            <p className="prihod">{item?.income}</p>
            <p className="rashod">{item?.outcome}</p>
            <p className="ostatokEnd">{item?.end_outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesLeftovers;
