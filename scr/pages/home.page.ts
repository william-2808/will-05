import type { Locator, Page } from '@playwright/test';

export class HomePage {
    // Locator chỉ mô tả cách tìm phần tử; Playwright sẽ tìm khi ta thao tác hoặc kiểm tra.
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly resultCount: Locator;
    readonly resultItems: Locator;

    constructor(page: Page) {
        this.searchBar = page.locator('//input[@placeholder="Search products..."]');
        // Tìm nút submit trong form chứa ô tìm kiếm, tránh chọn nhầm nút của form khác.
        this.searchButton = page.locator('//input[@placeholder="Search products..."]/ancestor::form[1]//button[@type="submit"]');
        // contains(@class, ...) vẫn tìm được khi thẻ p có thêm class khác.
        this.resultCount = page.locator('//p[contains(@class, "woocommerce-result-count")]');
        // ul là danh sách sản phẩm; /li chọn từng sản phẩm trực tiếp trong danh sách.
        this.resultItems = page.locator('//ul[contains(@class, "products")]/li');
    }

    // Gộp hai thao tác thường đi cùng nhau để test chỉ cần gọi một phương thức.
    async search(keyword: string): Promise<void> {
        await this.searchBar.fill(keyword);
        await this.searchButton.click();
    }
}
