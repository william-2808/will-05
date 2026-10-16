import {test, expect} from '@playwright/test';
import {LoginPage} from '../../../scr/pages/login.page';
import {AirPlane} from '../../../scr/airplane/airplane-list.page';
import {AddPlane} from '../../../scr/airplane/add-airplane.page';

const loginUrl = 'http://regtool.vitex.asia:8009/admin/login';
const airplaneUrl = 'http://regtool.vitex.asia:8009/en/admin/workspace/1/airplanes';

test.describe('Verify màn add - airplane', () => {
    test.beforeEach('Login và truy cập màn hình add airplane', async({page}) => {
        const loginPage = new LoginPage(page);
        const airPlane = new AirPlane(page);

        await page.goto(loginUrl);
        await loginPage.login('admin@yopmail.com', 'password');
        await page.goto(airplaneUrl);
        await airPlane.clickBtnAddPlane();
    });

    test('Tạo thành công airplane mới và save', async({page}) => {
        const addPlane = new AddPlane(page);

        await addPlane.addInformation('William', 'WW111', '1111', '22');
        const msg = page.locator('//div[@role="alert"]')
        await expect(msg).toBeVisible();
    })

    test('Tạo thành công airplane mới và Save and close', async({page}) => {
        
    })

    test('Tạo airplane sau đó ấn cancel', async({page}) => {
        
    })

    test('Tạo airplane trùng với data trước đó', async({page}) => {
        
    })

    test('Để trống toàn bộ trường', async({page}) => {
        
    })
})