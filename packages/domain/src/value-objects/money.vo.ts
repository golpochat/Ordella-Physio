import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";

type MoneyProps = {
  amount: number;
  currency: string;
};

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  get amount(): number {
    return this.props.amount;
  }

  get currency(): string {
    return this.props.currency;
  }

  static create(amount: number, currency: string): Result<Money> {
    if (!Number.isFinite(amount)) {
      return fail("Amount must be a finite number");
    }

    if (amount < 0) {
      return fail("Amount cannot be negative");
    }

    const normalizedCurrency = currency.trim().toUpperCase();
    if (normalizedCurrency.length !== 3) {
      return fail("Currency must be a 3-letter ISO code");
    }

    return ok(new Money({ amount: roundMoney(amount), currency: normalizedCurrency }));
  }

  add(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return fail("Cannot add money with different currencies");
    }

    return Money.create(roundMoney(this.amount + other.amount), this.currency);
  }

  subtract(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return fail("Cannot subtract money with different currencies");
    }

    return Money.create(roundMoney(this.amount - other.amount), this.currency);
  }

  multiply(factor: number): Result<Money> {
    return Money.create(roundMoney(this.amount * factor), this.currency);
  }
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
