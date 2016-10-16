import { TradingHoursPage } from './app.po';

describe('trading-hours App', function() {
  let page: TradingHoursPage;

  beforeEach(() => {
    page = new TradingHoursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
