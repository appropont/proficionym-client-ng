import { ProficionymClientPage } from './app.po';

describe('proficionym-client App', function() {
  let page: ProficionymClientPage;

  beforeEach(() => {
    page = new ProficionymClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
