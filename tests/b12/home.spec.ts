import { test, expect } from '@playwright/test';
import { LoginPage } from '../../scr/pages/login.page';

test.describe('Verify Login Page', () => {
    test.beforeEach('', async ({ page }) => {
        // Truy cập trang login
        await page.goto("http://regtool.vitex.asia:8009/admin/login");

    })

    test('Login successfully', async ({ page }) => {
        const testData = {
            email: "admin@yopmail.com",
            password: "password"
        };

        const loginPage = new LoginPage(page);

        // login thành công
        await loginPage.login(testData.email, testData.password);

    });

    test("Login Faile with blank email and password field", async ({ page }) => {

        const loginPage = new LoginPage(page);

        // click btn Login khi bỏ trống các field
        await loginPage.clickBtnLogin();

        // Verify hiển thị msg lỗi

        const emailError = page.locator('//span[@class="help-block"]/strong[normalize-space()="The email field is required."]');
        const passwordError = page.locator('//span[@class="help-block"]/strong[normalize-space()="The password field is required."]');

        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();

    });

    test('Login Failed with wrong email and wrong password', async ({ page }) => {

        const testData = {
            email: "abc@gmail.com",
            password: "12345"
        };

        const loginPage = new LoginPage(page);

        // Nhập thông tin 
        await loginPage.login(testData.email, testData.password);

        //verify msg
        const msgError = page.getByText('The email address or password you have entered was not correct. Please try again!', { exact: true });
        await expect(msgError).toBeVisible();
    });

})

