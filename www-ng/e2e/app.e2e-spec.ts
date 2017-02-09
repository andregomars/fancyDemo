import { WwwNgPage } from './app.po';

describe('www-ng App', function() {
  let page: WwwNgPage;

  beforeEach(() => {
    page = new WwwNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
