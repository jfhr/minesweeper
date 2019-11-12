import {AppPage} from './app.po';
import {browser, by, element, logging, protractor} from 'protractor';

describe('Minesweeper App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Minesweeper');
  });

  it('should show configuration options', () => {
    page.navigateTo();
    const optionsComponent = element(by.css('app-game-options'));
    expect(optionsComponent.isPresent()).toBeTruthy();
  });

  it('should submit and use options', () => {
    page.navigateTo();
    const fieldHeightInput = element(by.css('input[name="field-height"]'));
    fieldHeightInput.sendKeys('30');
    const fieldWidthInput = element(by.css('input[name="field-width"]'));
    fieldWidthInput.sendKeys('20');
    const numberOfBombsInput = element(by.css('input[name="number-of-bombs"]'));
    numberOfBombsInput.sendKeys('60');
    const submitInput = element(by.css('input[type="submit"]'));
    submitInput.click();

    // options field should disappear
    expect(element(by.css('app-game-options')).isPresent()).toBeFalsy();
    // should have 30 by 20 bombs
    expect(element.all(by.css('span.cell')).count()).toEqual(30 * 20);
  });

  it('should not close modal window on ESC', () => {
    page.navigateTo();
    element(by.css('body')).sendKeys(protractor.Key.ESCAPE);
    // options field should still be there
    expect(element(by.css('app-game-options')).isPresent()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
