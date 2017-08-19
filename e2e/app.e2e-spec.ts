import { CalendarAngular2Page } from './app.po';

describe('calendar-angular2 App', () => {
  let page: CalendarAngular2Page;

  beforeEach(() => {
    page = new CalendarAngular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
