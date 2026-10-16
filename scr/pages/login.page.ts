import {Locator, Page} from '@playwright/test';
export class LoginPage {
    // Thuộc tính: Các phần tử trong trang => những phần tử cần test
    page: Page;
    inputEmail: Locator;
    inputPassword: Locator;
    btnLogin: Locator;

    // Constructor: Khởi tạo
    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.locator('//input[@id="email"]');
        this.inputPassword = page.locator('//input[@id="password"]');
        this.btnLogin = page.getByRole('button', {name: "Login"});

    }

    // Method = Hành động
    async fillEmail(email: string) {
        await this.inputEmail.fill(email);
    }
    
    async fillPassword(password: string) {
        await this.inputPassword.fill(password);
    }

    async clickBtnLogin() {
        await this.btnLogin.click();
    }
    
    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickBtnLogin();

    }


}