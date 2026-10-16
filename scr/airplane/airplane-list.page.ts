import type { Locator, Page } from '@playwright/test';
export class AirPlane {
    readonly archivedBtn: Locator;
    readonly addPlaneBtn: Locator;
    readonly searchField: Locator;
    readonly searchBtn: Locator;
    readonly reloadBtn: Locator;
    readonly checkbox: Locator;
    readonly deleteSelected: Locator

    constructor(page: Page) {
        // Trang có hai link "Add plane"; chọn link đầu tiên ở thanh công cụ phía trên.
        this.addPlaneBtn = page.getByRole('link', { name: 'Add plane' }).first();
        this.archivedBtn = page.getByRole('link', { name: 'Archived' });
        this.searchField = page.getByPlaceholder('Name or registration number');
        this.searchBtn = this.searchField.locator('xpath=ancestor::form[1]//button[@type="submit"]');
        this.reloadBtn = page.locator('//a[@title="Clear"]');
        this.checkbox = page.locator('//input[@id="airplane-check-all"]');
        this.deleteSelected = page.locator('//button[@id="airplane-bulk-delete"]')

    };

    async clickBtnArchived() {
        await this.archivedBtn.click();
    }
    
    async clickBtnAddPlane() {
        await this.addPlaneBtn.click();
    }

    async fillSearch(keyword: string) {
        await this.searchField.fill(keyword);
    }

    async clickBtnSearch() {
        await this.searchBtn.click();
    }

    async clickBtnReload() {
        await this.reloadBtn.click();
    }

    async checkedCheckbox() {
        await this.checkbox.check();
    }

    async clickDeletedIcon() {
        await this.deleteSelected.click();
    }
}
