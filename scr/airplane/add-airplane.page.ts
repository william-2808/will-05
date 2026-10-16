import { Locator, Page} from '@playwright/test';
export class AddPlane {
    // thuộc tính
    readonly inputName: Locator;
    readonly inputRegisNumber: Locator;
    readonly inputCapacity: Locator;
    readonly inputMaxInfants: Locator;
    readonly btnSaveAndClose: Locator;
    readonly btnSave: Locator;
    readonly btnCancel: Locator;

    // Constructor: Khởi tạo
    constructor(page: Page) {
        this.inputName = page.locator('//input[@id="name"]')
        this.inputRegisNumber = page.getByLabel('Registration number')
        this.inputCapacity = page.locator('//input[@id="capacity"]')
        this.inputMaxInfants = page.locator('//input[@id="max_infants"]')
        this.btnSaveAndClose = page.locator('//button[@type="button"][1]')
        this.btnSave = page.getByRole('button', {name: "Save", exact: true});
        this.btnCancel = page.locator('//a[@class="btn btn-default airplane-cancel"]')
    }

    async fillInputName(name: string) {
        await this.inputName.fill(name);
    }

    async fillInputRegisNumber(number: string) {
        await this.inputRegisNumber.fill(number);
    }

    async fillInputCapacity(capacity: string) {
        await this.inputCapacity.fill(capacity);
    }

    async fillInputMaxInfants(infants: string) {
        await this.inputMaxInfants.fill(infants);
    }

    async clickBtnSaveAClose() {
        await this.btnSaveAndClose.click();
    }

    async clickBtnSave() {
        await this.btnSave.click();
    }

    async clickBtnCancel() {
        await this.btnCancel.click();
    }

    async addInformation(name: string, number: string, capacity: string, infants: string) {
        await this.inputName.fill(name);
        await this.inputRegisNumber.fill(number);
        await this.inputCapacity.fill(capacity);
        await this.inputMaxInfants.fill(infants);
        await this.btnSave.click();
    }
}