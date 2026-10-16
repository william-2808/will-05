import { expect, test } from '@playwright/test';
import { LoginPage } from '../../scr/pages/login.page';

const loginUrl = 'http://regtool.vitex.asia:8009/admin/login';

// Nhóm các kịch bản cùng kiểm tra trang đăng nhập.
test.describe('Login page', () => {
  // beforeEach chạy trước từng test, nên mỗi kịch bản bắt đầu từ trang login mới.
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('logs in with valid credentials', async ({ page }) => {
    // Page Object gom các thao tác nhập email, mật khẩu và bấm Login.
    const loginPage = new LoginPage(page);

    await loginPage.login('admin@yopmail.com', 'password');

    // Sau khi đăng nhập thành công, trình duyệt phải rời URL trang login.
    await expect(page).not.toHaveURL(loginUrl);
  });

  test('shows required-field errors when submitted empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Không nhập dữ liệu và gửi form để kiểm tra hai trường bắt buộc.
    await loginPage.clickBtnLogin();

    // Giữ nguyên XPath cũ: tìm thẻ strong trong span.help-block có đúng nội dung lỗi.
    const emailError = page.locator('//span[@class="help-block"]/strong[normalize-space()="The email field is required."]');
    const passwordError = page.locator('//span[@class="help-block"]/strong[normalize-space()="The password field is required."]');

    // toBeVisible kiểm tra thông báo thực sự hiển thị cho người dùng.
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Đăng nhập bằng thông tin sai và kiểm tra thông báo phản hồi.
    await loginPage.login('abc@gmail.com', '12345');

    // exact: true yêu cầu nội dung khớp chính xác với chuỗi bên dưới.
    const msgError = page.getByText('The email address or password you have entered was not correct. Please try again!', { exact: true });
    // Thanh debug của trang đôi khi lặp lại cùng text. Phần tử đầu tiên là lỗi trong form.
    await expect(msgError.first()).toBeVisible();
  });
});
