import formatDate from '../formatDate.js';

describe('formatDate', () => {
  it('should format a date with single-digit month and day', () => {
    const inputDate = '1/1/2020';
    const expectedOutput = '01.01.2020';

    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toEqual(expectedOutput);
  });

  it('should format a date with double-digit month and day', () => {
    const inputDate = '11/11/2011';
    const expectedOutput = '11.11.2011';

    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toEqual(expectedOutput);
  });
});