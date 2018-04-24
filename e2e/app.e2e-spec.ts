import { Wigd2Page } from './app.po';

describe('wigd2 App', function() {
  let page: Wigd2Page;

  beforeEach(() => {
    page = new Wigd2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
