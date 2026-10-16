import { Locator, Page} from '@playwright/test';
export class HomePage {
    // Thuộc tính
    page: Page;
    searchBar: Locator;
    searchButton: Locator;
    number0Result: Locator;
    resultIteams: Locator;

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator('//input[@placeholder="Search products..."]');
        this.searchButton = page.locator('//button[@type="submit"]');
        this.number0Result = page.locator('//p[@class="woocommer-result-count"]');
        this.resultIteams = page.locator('//u[@contains(@class, "producs"]//li');
    }

    //Method


}