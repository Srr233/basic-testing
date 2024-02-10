// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const doSomething = jest.fn();
    const spyTime = jest.spyOn(global, 'setTimeout');
    jest.advanceTimersByTime(50);
    doStuffByTimeout(doSomething, 50);

    expect(spyTime).toHaveBeenCalledWith(doSomething, 50);
  });

  test('should call callback only after timeout', () => {
    const doSomething = jest.fn();
    doStuffByTimeout(doSomething, 50);
    jest.advanceTimersByTime(50);
    expect(doSomething).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest;
  });

  test('should set interval with provided callback and timeout', () => {
    const doSomething = jest.fn();
    const spyTime = jest.spyOn(global, 'setInterval');
    jest.advanceTimersByTime(50);
    doStuffByInterval(doSomething, 50);

    expect(spyTime).toHaveBeenCalledWith(doSomething, 50);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const doSomething = jest.fn();
    doStuffByInterval(doSomething, 50);
    jest.advanceTimersByTime(50);
    expect(doSomething).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    readFileAsynchronously('path');
    expect(join).toBeCalledWith(__dirname, 'path');
  });

  test('should return null if file does not exist', async () => {
    const res = readFileAsynchronously('path');
    expect(res).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest.spyOn(fs.promises, 'readFile').mockImplementationOnce(async () => {
      return 'text';
    });
    await expect(readFileAsynchronously('еуче')).resolves.toBe('text');
  });
});
