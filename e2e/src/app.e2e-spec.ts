import {AppPage} from './app.po';
import {browser, by, element, logging, protractor, ExpectedConditions as EC} from 'protractor';

describe('Minesweeper App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', async () => {
    await page.navigateTo();
    expect(page.getTitleText()).toEqual('Minesweeper');
  });

  it('should show configuration options', async () => {
    await page.navigateTo();
    const optionsComponent = element(by.css('app-game-options'));
    expect(optionsComponent.isPresent()).toBeTruthy();
  });

  it('should submit and use options', async () => {
    await page.navigateTo();
    const fieldHeightInput = element(by.css('input[name="field-height"]'));
    await fieldHeightInput.sendKeys('30');
    const fieldWidthInput = element(by.css('input[name="field-width"]'));
    await fieldWidthInput.sendKeys('20');
    const numberOfBombsInput = element(by.css('input[name="number-of-bombs"]'));
    await numberOfBombsInput.sendKeys('60');
    const submitInput = element(by.css('input[type="submit"]'));
    await submitInput.click();

    // options field should disappear
    await browser.driver.wait(EC.invisibilityOf(element(by.css('app-game-options'))), 1000);
    // should have 30 by 20 bombs
    expect(element.all(by.css('span.cell-content')).count()).toEqual(30 * 20);
  });

  it('should not close modal window on ESC', async () => {
    await page.navigateTo();
    await element(by.css('body')).sendKeys(protractor.Key.ESCAPE);
    // options field should still be there
    await browser.driver.wait(EC.visibilityOf(element(by.css('app-game-options'))), 1000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
