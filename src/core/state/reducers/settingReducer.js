// import { SettingActionType } from "../action-types/index";
// import { SettingAction } from "../actions";

const initialState = {
  name: "نظام صنفی کشاورزی",
  logoImageAddress: "",
  instagramAddress: "https://instagram.com",
  facebookAddress: "https://facebook.com",
  telegramAddress: "https://telegram.me",
  whatsappAddress: "https://whatsapp.com",
  twitterAddress: "https://twitter.com",
  aboutUsSummary:
    "به سامانه جامع بهره برداران کشاورزی خوش آمدید، شما می توتانید با ثبت نام در این سامانه از خدمات نظام صنفی بهره مند شوید .",
  tell: "۰۲۱۵۴۶۶۵۹۲۳۱",
  fax: "۰۲۱۵۴۶۶۵۹۲۳۱",
  address:
    "تهران - خیابان شریعتی - نرسیده به پل سید خندان - ورودی ۲۲ - ساختمان مرکزی",
  postalCode: "۱۱۱۱۱۱۱۱۱",
  googleMapLink:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.623834154988!2d53.0494553156805!3d36.563181979998106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDMzJzQ3LjUiTiA1M8KwMDMnMDUuOSJF!5e0!3m2!1sen!2sus!4v1629196622351!5m2!1sen!2sus",
  latitudeAndLongitude: "1N,32E",
  sliderImageCount: 4,
  homePageNewsCount: 3,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setsetting":
      return action.payload;

    default:
      return state;
  }
};

export default settingReducer;
