import { CarouPage } from './app.po';

describe('carou App', function() {
  let page: CarouPage;

  beforeEach(() => {
    page = new CarouPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
