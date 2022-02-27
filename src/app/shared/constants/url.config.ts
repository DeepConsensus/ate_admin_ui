import { environment } from "environments/environment";

const adminURL: string = environment.admin;
const settingsId: string = environment.settingsId;
const onboardURL: string = environment.base + "onboard/";

export const loginModuleURL: any = {
  login: `${onboardURL}login`,
  signup: `${onboardURL}register`,
  logOut: `${onboardURL}logout`,
  emailExirationCheck: `${adminURL}Auth/EmailVerification/`,
  checkEmailIsValid: `${adminURL}Account/IsValidEmail`,
};

export const NoticeBoard: any = {
  list: `${adminURL}notice`,
  create: `${adminURL}notice/`,
  getById: `${adminURL}notice/get/`,
};

export const DeliveryPeople: any = {
  list: `${adminURL}delivery-people/list`,
  get: `${adminURL}delivery-people`,
  create: `${adminURL}delivery-people/`,
  getById: `${adminURL}delivery-people/get/`,
};

export const Reasons: any = {
  list: `${adminURL}reason/list`,
  get: `${adminURL}reason`,
  create: `${adminURL}reason/`,
  getById: `${adminURL}reason/get/`,
};

export const PromoCodes: any = {
  list: `${adminURL}promocodes/list`,
  get: `${adminURL}promocodes`,
  create: `${adminURL}promocodes/`,
  getById: `${adminURL}promocodes/get/`,
};

export const DisputeManager: any = {
  list: `${adminURL}dispute-manager/list`,
  get: `${adminURL}dispute-manager`,
  create: `${adminURL}dispute-manager/`,
  getById: `${adminURL}dispute-manager/get/`,
};

export const CuisinesURL: any = {
  list: `${adminURL}cuisines/list`,
  get: `${adminURL}cuisines`,
  create: `${adminURL}cuisines/`,
  getById: `${adminURL}cuisines/get/`,
};

export const SettingsURL: any = {
  settingId: settingsId,
  get: `${adminURL}settings`,
  create: `${adminURL}settings/`,
  getById: `${adminURL}settings/get/`,
  currency: `${adminURL}currency/all`,
};
