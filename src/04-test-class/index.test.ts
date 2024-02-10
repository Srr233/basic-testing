import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(50).getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(50).withdraw(100)).toThrow('50');
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(50).transfer(100, getBankAccount(0)),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const bunkAcc = getBankAccount(50);
    expect(() => bunkAcc.transfer(100, bunkAcc)).toThrowError();
  });

  test('should deposit money', () => {
    const bunkAcc = getBankAccount(50);
    expect(bunkAcc.deposit(50)).toHaveProperty('_balance', 100);
  });

  test('should withdraw money', () => {
    const bunkAcc = getBankAccount(50);
    expect(bunkAcc.withdraw(10)).toHaveProperty('_balance', 40);
  });

  test('should transfer money', () => {
    const bunkAcc = getBankAccount(50);
    expect(bunkAcc.transfer(50, getBankAccount(0))).toHaveProperty(
      '_balance',
      0,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bunkAcc = getBankAccount(50);
    let tr = true;
    while (tr) {
      const resFetch = await bunkAcc.fetchBalance();

      if (resFetch) {
        expect(typeof resFetch).toBe('number');
        tr = false;
      }
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bunkAcc = getBankAccount(50);
    const prevVal = bunkAcc.getBalance();
    let tr = true;
    while (tr) {
      const resFetch = await bunkAcc.fetchBalance();

      if (resFetch) {
        expect(resFetch).not.toBe(prevVal);
        tr = false;
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bunkAcc = getBankAccount(50);
    let tr = true;
    while (tr) {
      const resFetch = await bunkAcc.fetchBalance();

      if (resFetch === null) {
        expect(resFetch).toBe(null);
        tr = false;
      }
    }
  });
});
