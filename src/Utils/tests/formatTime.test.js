import formatTime from '../formatTime.js';

describe('formatTime', () => {
  it('format a time with seconds', () => {
    const inputTime = '11:30:00';
    const expectedOutput = '11:30';

    const formattedTime = formatTime(inputTime);
    expect(formattedTime).toEqual(expectedOutput);
  });

  it('format a time with seconds that are not 00', () => {
    const inputTime = '01:02:03';
    const expectedOutput = '01:02';

    const formattedTime = formatTime(inputTime);
    expect(formattedTime).toEqual(expectedOutput);
  });
});