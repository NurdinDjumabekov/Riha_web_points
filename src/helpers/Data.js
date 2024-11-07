import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PriceCheckIcon from "@mui/icons-material/Payments";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import RestoreIcon from "@mui/icons-material/Restore";
import RuleIcon from "@mui/icons-material/Rule";
import AppsIcon from "@mui/icons-material/Apps";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export const dataCategory = [
  {
    codeid: 1,
    name: "Главная",
    link: "",
    img: "https://img.freepik.com/free-vector/posts-concept-illustration_114360-112.jpg?w=740&t=st=1710925459~exp=1710926059~hmac=1fceb9efe8e3f24d7d4bcee953232bf181a89b4fc703a7086866134fe73cd5d7",
    pathApi: "",
    icon: <AppsIcon />,
  },
  {
    codeid: 2,
    name: "Приём товара",
    link: "main_invoice/accept_prod",
    img: "https://img.freepik.com/free-vector/posts-concept-illustration_114360-112.jpg?w=740&t=st=1710925459~exp=1710926059~hmac=1fceb9efe8e3f24d7d4bcee953232bf181a89b4fc703a7086866134fe73cd5d7",
    pathApi: "main_invoice/accept_prod",
    icon: <ChecklistIcon />,
  },
  {
    codeid: 3,
    name: "Сопутка",
    link: "soputka/main",
    img: "https://img.freepik.com/premium-vector/budget-planning-flat-illustration-is-scalable-and-easy-to-use_203633-7957.jpg?w=900",
    pathApi: "soputka/main",
    icon: <AddBusinessIcon />,
  },
  {
    codeid: 4,
    name: "Остатки",
    link: "leftovers",
    img: "https://img.freepik.com/free-vector/button-style-concept-illustration_114360-4428.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "leftovers",
    icon: <ContentPasteSearchIcon />,
  },
  // {
  //   codeid: 3,
  //   name: "Продажа",
  //   link: "sale/main",
  //   img: "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?t=st=1711965120~exp=1711968720~hmac=96a672de3602a7397d6e0b7452abfa17eaa700d42fd08a2a3e244eb154b7bd30&w=1380",
  //   pathApi: "sale/main",
  //   icon: <ProductionQuantityLimitsIcon />,
  // },
  {
    codeid: 5,
    name: "Продажа с чеком",
    link: "sale_qr_code/main",
    img: "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?t=st=1711965120~exp=1711968720~hmac=96a672de3602a7397d6e0b7452abfa17eaa700d42fd08a2a3e244eb154b7bd30&w=1380",
    pathApi: "sale_qr_code/main",
    icon: <ReceiptLongIcon />,
  },
  {
    codeid: 6,
    name: "История продаж",
    link: "sale_qr_code/return_prod",
    img: "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?t=st=1711965120~exp=1711968720~hmac=96a672de3602a7397d6e0b7452abfa17eaa700d42fd08a2a3e244eb154b7bd30&w=1380",
    pathApi: "sale_qr_code/return_prod",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    codeid: 7,
    name: "Расходы",
    link: "spending",
    img: "https://img.freepik.com/free-vector/balance-sheet-cartoon-web-icon-accounting-process-finance-analyst-calculating-tools-financial-consulting-idea-bookkeeping-service_335657-2313.jpg?t=st=1711965019~exp=1711968619~hmac=635d5b94c27cf917e8532dfd722c44aba43db051d262065031cdac53408da1ab&w=900",
    pathApi: "spending",
    icon: <BabyChangingStationIcon />,
  },
  {
    codeid: 8,
    name: "Оплата",
    link: "pay/main",
    img: "https://img.freepik.com/free-vector/euro-coins-concept-illustration_114360-15485.jpg?t=st=1710925698~exp=1710929298~hmac=4fb3746133437b6b0ca94daa3d06c8c634817a0562bb3e4ac1df5e613f3512bd&w=740",
    pathApi: "pay/main",
    icon: <PriceCheckIcon />,
  },
  {
    codeid: 9,
    name: "Возврат",
    link: "return/main",
    img: "https://img.freepik.com/premium-vector/teamwork-web-concept-with-character-scene-man-woman-work-together-construct-cubes-developing-project-people-situation-flat-design-vector-illustration-social-media-marketing-material_9209-12505.jpg?w=1380",
    pathApi: "return/main",
    icon: <RestoreIcon />,
  },
  {
    codeid: 10,
    name: "Ревизия",
    link: "revision/main",
    img: "https://img.freepik.com/free-vector/flat-university-concept_23-2148184535.jpg?t=st=1714467037~exp=1714470637~hmac=5c4ad18c3bd18c0d4b01c395340bf0b264b4c3ec37090fd429ec276be7a41b7d&w=900",
    pathApi: "revision/main",
    icon: <RuleIcon />,
  },
];

export const listTableLeftoverst = [
  "Товар",
  "Остаток на начало",
  "Приход",
  "Расход",
  "Остаток на конец",
];

export const listTableForAcceptInvoice = [" Продукт", "Цена", "Шт(кг)"];

export const listTableForReturnProd = [
  " Товар",
  " Цена",
  "В наличии",
  "Возврат",
  " ....",
];

// export const typeProd = {
//   1: "шт",
//   2: "кг",
//   /////unit_codeid
// };

export const statusRevision = {
  1: "Не подтверждён",
  2: "Подтверждён",
  ///// статус накладных для ревизии
};

export const statusColor = {
  1: "red",
  2: "green",
};

export const typesPay = {
  1: "Поступление средств по накладной",
  2: "Передача денег торговой точки агенту",
  3: "Расходы и траты",
};

export const objTitleLeftov = {
  1: "Товар",
  2: "Цена",
  3: "Остаток на начало",
  4: "Приход",
  5: "Расход",
  6: "Остаток на конец",
};

export const listTimes = [
  { id: 1, name: "Сегодня" },
  { id: 2, name: "За последнюю неделю" },
  { id: 3, name: "За последние 10 дней" },
  { id: 4, name: "За последние 15 дней" },
  { id: 5, name: "За последний месяц" },
];
