import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../scr/pages/login.page';
import { AirPlane } from '../../../scr/airplane/airplane-list.page';
import { AddPlane } from '../../../scr/airplane/add-airplane.page';

const loginUrl = 'http://regtool.vitex.asia:8009/admin/login';
const airplaneUrl =
    'http://regtool.vitex.asia:8009/en/admin/workspace/1/airplanes';

test.describe('Kiểm tra màn hình thêm máy bay', () => {
    // Mỗi test bắt đầu tại biểu mẫu thêm máy bay sau khi đăng nhập.
    test.beforeEach('Đăng nhập và mở biểu mẫu thêm máy bay', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const airPlane = new AirPlane(page);

        await page.goto(loginUrl);
        await loginPage.login('admin@yopmail.com', 'password');
        await page.goto(airplaneUrl);
        await airPlane.clickBtnAddPlane();
    });

    test('Thêm máy bay bằng nút Save', async ({ page }) => {
        const addPlane = new AddPlane(page);

        await addPlane.addInformation('william 01', 'WW01', '01111', '022');

        const msg = page.locator('//div[@class="col-md-12"]');

        await expect(msg).toBeVisible();
    });

    test('Thêm máy bay bằng nút Save and Close', async ({ page }) => {
        const addPlane = new AddPlane(page);

        await addPlane.addInformation('William 02', 'WW02', '02222', '023');

        const msg = page.locator('//div[@class="col-md-12"]');

        await expect(msg).toBeVisible();

        const rows = page.locator('.flight-table .row[id^="tr-"]');
        const airplaneRow = rows.filter({
            has: page.getByText('William 02', { exact: true }),
        });

        await expect(airplaneRow).toBeVisible();
    });

    test('Hủy thêm máy bay bằng nút Cancel và xác nhận Yes', async ({ page }) => {
        const addPlane = new AddPlane(page);

        // Nhập dữ liệu rồi hủy, không bấm Save.
        await addPlane.fillInputName('William 02');
        await addPlane.fillInputRegisNumber('02');
        await addPlane.fillInputMaxInfants('122');
        await addPlane.clickBtnCancel();

        // Kiểm tra nút Yes hiển thị trong hộp thoại xác nhận.
        const popup = page.getByRole('button', {
            name: 'Yes',
            exact: true,
        });

        await expect(popup).toBeVisible();
        await page.waitForTimeout(500);
        await popup.click();

        const rows = page.locator('.flight-table .row[id^="tr-"]');
        const airplaneRow = rows.filter({
            has: page.getByText('William 02', { exact: true }),
        });

        // Quay về danh sách và kiểm tra không có dòng mang tên vừa nhập.
        await expect(page).toHaveURL(airplaneUrl);
        await expect(airplaneRow).toHaveCount(0);
    });

    test('Hiển thị thông báo lỗi khi số đăng ký máy bay đã tồn tại', async ({ page }) => {
        const addPlane = new AddPlane(page);

        await addPlane.addInformation('william 01', 'w15', '1211', '');

        const alert = page.locator('.alert.alert-danger');

        await expect(alert).toContainText(
            'An airplane with this registration number already exists.',
        );
    });

    test('Yêu cầu nhập Name khi để trống các trường bắt buộc và bấm Save', async ({ page }) => {
        const addPlane = new AddPlane(page);

        await addPlane.clickBtnSave();

        // Ô Name vẫn trống và nhận con trỏ nhập liệu sau khi bấm Save.
        await expect(addPlane.inputName).toHaveValue('');
        await expect(addPlane.inputName).toBeFocused();
    });
});
