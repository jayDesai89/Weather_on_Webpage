import { CapitalizePipe } from './capitalize.pipe';

describe('Pipe: CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('return 1st letter capital', () => {
    expect(pipe.transform('toronto')).toBe('Toronto');
  });
});
