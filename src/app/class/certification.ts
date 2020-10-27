import { LoginStaffData } from './staff';

export class Certification {
    public static MY_TOKEN_KEY = 'my_token_key';
    public static MY_STAFF_ID_KEY = 'my_staff_id_key';
    public static MY_IS_ADMINISTRATOR_KEY = 'my_is_administrator_key';
    public static MY_IS_DEVELOPER_KEY = 'my_is_developer_key';

    public static getToken(): string {
        return localStorage.getItem(this.MY_TOKEN_KEY);
    }

    public static setUserData(loginStaffData: LoginStaffData): void {
        localStorage.setItem(this.MY_TOKEN_KEY, JSON.stringify({ token: loginStaffData.token }));
        localStorage.setItem(this.MY_STAFF_ID_KEY, JSON.stringify({ staffId: loginStaffData.staffId }));
        localStorage.setItem(this.MY_IS_ADMINISTRATOR_KEY, JSON.stringify({ isAdministrator: loginStaffData.isAdministrator }));
        localStorage.setItem(this.MY_IS_DEVELOPER_KEY, JSON.stringify({ isDeveloper: loginStaffData.isDeveloper }));
    }

    public static clear(): void {
        localStorage.removeItem(this.MY_TOKEN_KEY);
        localStorage.removeItem(this.MY_STAFF_ID_KEY);
        localStorage.removeItem(this.MY_IS_ADMINISTRATOR_KEY);
        localStorage.removeItem(this.MY_IS_DEVELOPER_KEY);
    }
}
