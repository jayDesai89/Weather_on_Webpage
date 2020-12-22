import { TempconverterPipe } from './tempconverter.pipe';

describe('TempconverterPipe', () => {
  let pipe: TempconverterPipe;

  beforeEach(() => {
    pipe = new TempconverterPipe();
  });

  it('convert provided temp', () => {
    expect(pipe.transform(300)).toBe(80);
  });
});
