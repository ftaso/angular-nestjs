export class BaseConst {
    // PC
    // public static BASE_WINDOWPOINT = 'https://ikoinoie26.com';
    // public static BASE_ENDPOINT = 'https://ikoinoie26.com/api';
    // public static BASE_SOCKETPOINT = 'https://ikoinoie26.com';
    // DEVELOP
    public static BASE_WINDOWPOINT = 'https://develop.ikoinoie26.com';
    public static BASE_ENDPOINT = 'https://develop.ikoinoie26.com/api';
    public static BASE_SOCKETPOINT = 'https://develop.ikoinoie26.com';

    // public static BASE_WINDOWPOINT = 'http://localhost:4200';
    // public static BASE_ENDPOINT = 'http://localhost:4200/api';
    // public static BASE_SOCKETPOINT = 'http://localhost:4200';
}

export class ConstURL {
    // APIの管理を行う
    public static Login = `${BaseConst.BASE_ENDPOINT}/auth/login`;
    public static Logout = `${BaseConst.BASE_ENDPOINT}/auth/logout`;
    public static Session = `${BaseConst.BASE_ENDPOINT}/auth/session`;
    public static Relogin = `${BaseConst.BASE_ENDPOINT}/auth/relogin`;
    // mst_staff
    public static Staff = `${BaseConst.BASE_ENDPOINT}/staff/`;
    public static Staff_Password = `${BaseConst.BASE_ENDPOINT}/staff/password`;


    public static Staff_AccountName = `${BaseConst.BASE_ENDPOINT}/staff/account-name`;
    public static CareReceiver = `${BaseConst.BASE_ENDPOINT}/care-receiver`;
    public static ServiceTag = `${BaseConst.BASE_ENDPOINT}/service-tag`;
    public static ServiceTagCategory = `${BaseConst.BASE_ENDPOINT}/service-tag-category`;
    public static ServiceTagSubCategory = `${BaseConst.BASE_ENDPOINT}/service-tag-sub-category`;
    public static ServiceDetail = `${BaseConst.BASE_ENDPOINT}/service-detail`;
    public static ServiceType = `${BaseConst.BASE_ENDPOINT}/service-type`;

    // INPUT画面
    public static Meal = `${BaseConst.BASE_ENDPOINT}/meal`;
    public static Vital = `${BaseConst.BASE_ENDPOINT}/vital`;
    public static Excretion = `${BaseConst.BASE_ENDPOINT}/excretion`;
    public static Hydration = `${BaseConst.BASE_ENDPOINT}/hydration`;
    public static Record = `${BaseConst.BASE_ENDPOINT}/record`;
    public static RegularSchedule = `${BaseConst.BASE_ENDPOINT}/regular-schedule`;

    public static Record_Date = `${BaseConst.BASE_ENDPOINT}/record/date`;
    public static Meal_Today = `${BaseConst.BASE_ENDPOINT}/meal/today`;
    public static Hydration_Today = `${BaseConst.BASE_ENDPOINT}/hydration/today`;
    public static Excretion_Today = `${BaseConst.BASE_ENDPOINT}/excretion/today`;
    public static Vital_Today = `${BaseConst.BASE_ENDPOINT}/vital/today`;
    public static Excretion_Multiple = `${BaseConst.BASE_ENDPOINT}/excretion/multiple`;
    public static SherviceSheet = `${BaseConst.BASE_ENDPOINT}/service-sheet`;
    public static ServiceTagMap = `${BaseConst.BASE_ENDPOINT}/service-tag-map`;
    public static TimeFixedService = `${BaseConst.BASE_ENDPOINT}/time-fixed-service`;
    public static HandingOver = `${BaseConst.BASE_ENDPOINT}/handing-over`;
    public static Service = `${BaseConst.BASE_ENDPOINT}/service`;
    public static ServiceDetailMap = `${BaseConst.BASE_ENDPOINT}/service-detail-map`;






}
