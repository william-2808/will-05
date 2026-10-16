import type { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Locator mô tả cách tìm phần tử; Playwright chỉ tìm khi ta thao tác với nó.
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;

    // Nhận page từ test và tạo các locator dùng trên trang đăng nhập.
    constructor(page: Page) {
        this.inputEmail = page.locator('//input[@id="email"]');
        this.inputPassword = page.locator('//input[@id="password"]');
        this.btnLogin = page.getByRole('button', { name: 'Login' });
    }

    // await đợi Playwright nhập xong trước khi chuyển sang bước kế tiếp.
    async fillEmail(email: string): Promise<void> {
        await this.inputEmail.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.inputPassword.fill(password);
    }

    async clickBtnLogin(): Promise<void> {
        await this.btnLogin.click();
    }

    // Gộp ba bước thường dùng để test chỉ cần gọi login(email, password).
    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickBtnLogin();
    }
}
