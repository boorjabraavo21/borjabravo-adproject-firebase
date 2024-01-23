import { CreatedPipe } from './created.pipe';

describe('CreatedPipe', () => {
  it('create an instance', () => {
    const pipe = new CreatedPipe();
    expect(pipe).toBeTruthy();
  });
});
