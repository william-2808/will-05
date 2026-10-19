import { test, expect } from '@playwright/test';
import {AirPlane} from '../../../scr/airplane/airplane-list.page';
import { LoginPage } from '../../../scr/pages/login.page';

const loginUrl = 'http://regtool.vitex.asia:8009/admin/login';
const airplaneUrl = 'http://regtool.vitex.asia:8009/en/admin/workspace/1/airplanes';

test.describe('Verify màn hình Airplane', () => {
    test.beforeEach('Login vào FMS và truy cập màn hình Airplane', async({page}) => {
        const loginPage = new LoginPage(page);
        await page.goto(loginUrl);
        await loginPage.login('admin@yopmail.com', 'password');
        await page.goto(airplaneUrl);
    })
    test('Verify màn hình airplane list', async({page}) => {
       const airPlane = new AirPlane(page);
       
       // Button airchived
       await expect(airPlane.archivedBtn).toBeVisible();
       // Button Add plane
       await expect(airPlane.addPlaneBtn).toBeVisible();
       // Search field 
       await expect(airPlane.searchField).toBeVisible();
       // Search button
       await expect(airPlane.searchBtn).toBeVisible();
       // Clear button
       await expect(airPlane.reloadBtn).toBeVisible();

       const rows = page.locator('.flight-table .row[id^="tr-"]');
       await expect(rows.first()).toBeVisible();
    })

    test('Kiểm tra trạng thái ban đầu của checkbox', async ({ page }) => {
        const airPlane = new AirPlane(page);
        await expect(airPlane.checkbox).not.toBeChecked();
    });

    test('Verify search data hợp lệ với Name', async({page}) => {
        const airPlane = new AirPlane(page);
        
        await airPlane.fillSearch('Full License');
        await airPlane.clickBtnSearch();

        const rows = page.locator('.flight-table .row[id^="tr-"]');
        const airplaneRow = rows.filter({
            has: page.getByText('Full License', { exact: true }),
        });
        await expect(airplaneRow).toHaveCount(1);
        await expect(airplaneRow).toBeVisible();
    })

    test('Verify search data hợp lệ với Registraion number', async({page}) => {
        const airPlane = new AirPlane(page);
        
        await airPlane.fillSearch('1');
        await airPlane.clickBtnSearch();

        const rows = page.locator('.flight-table .row[id^="tr-"]');
        const airplaneRow = rows.filter({
            has: page.getByText('Full License', { exact: true }),
        });
        await expect(airplaneRow).toHaveCount(1);
        await expect(airplaneRow).toBeVisible();
    })

    test('Verify search data không hợp lệ', async({page}) => {
        const airPlane = new AirPlane(page);
        
        await airPlane.fillSearch('zzzzz');
        await airPlane.clickBtnSearch();

        const rows = page.locator('.flight-table .row[id^="tr-"]');
        await expect(rows).toHaveCount(0);

        const msgError = page.getByText('No airplanes yet.' , { exact: true})
        await expect(msgError).toBeVisible();
    })


});
