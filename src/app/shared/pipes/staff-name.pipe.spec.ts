import { StaffNamePipe } from './staff-name.pipe';

describe('StaffNamePipe', () => {
  it('create an instance', () => {
    const pipe = new StaffNamePipe();
    expect(pipe).toBeTruthy();
  });
});
