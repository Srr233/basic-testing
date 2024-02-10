// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(() => 1),
    mockTwo: jest.fn(() => 2),
    mockThree: jest.fn(() => 3),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    let logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    expect(logSpy).not.toHaveBeenCalled();

    logSpy = jest.spyOn(global.console, 'log');
    mockTwo();
    expect(logSpy).not.toHaveBeenCalled();

    logSpy = jest.spyOn(global.console, 'log');
    mockThree();
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
