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
    pathApi: "",
    icon: <AppsIcon />,
  },
  {
    codeid: 2,
    name: "Приём товара",
    link: "main_invoice/accept_prod",
    pathApi: "main_invoice/accept_prod",
    icon: <ChecklistIcon />,
  },
  {
    codeid: 3,
    name: "Сопутка",
    link: "soputka/main",
    pathApi: "soputka/main",
    icon: <AddBusinessIcon />,
  },
  {
    codeid: 4,
    name: "Остатки",
    link: "leftovers",
    pathApi: "leftovers",
    icon: <ContentPasteSearchIcon />,
  },
  {
    codeid: 5,
    name: "Продажи",
    link: "sale_qr_code/main",
    pathApi: "sale_qr_code/main",
    icon: <ReceiptLongIcon />,
  },
  {
    codeid: 6,
    name: "История продаж",
    link: "history_sale",
    pathApi: "history_sale",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    codeid: 7,
    name: "Расходы",
    link: "spending",
    pathApi: "spending",
    icon: <BabyChangingStationIcon />,
  },
  {
    codeid: 8,
    name: "Оплата",
    link: "pay/main",
    pathApi: "pay/main",
    icon: <PriceCheckIcon />,
  },
  {
    codeid: 9,
    name: "Возврат",
    link: "return/main",
    pathApi: "return/main",
    icon: <RestoreIcon />,
  },
  {
    codeid: 10,
    name: "Ревизия",
    link: "revision/main",
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
  0: { t: "Не подтверждён", c: "red" },
  1: { t: "Подтверждён вами", c: "orange" },
  2: { t: "Подтверждён принимаемой стороной", c: "green" },
  ///// статус накладных для ревизии (свои накладные)
};

export const statusRevisionAccept = {
  0: { t: "Ожидание", c: "red" },
  1: { t: "Подтверждён отправляемой стороной", c: "orange" },
  2: { t: "Подтверждён вами", c: "green" },
  ///// статус накладных для ревизии (чужие накладные)
};

export const statusColor = { 1: "red", 2: "green" };

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
