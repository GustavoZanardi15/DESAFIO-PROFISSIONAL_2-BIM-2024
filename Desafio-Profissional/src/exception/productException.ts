export class ProductException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductException';
    Object.setPrototypeOf(this, ProductException.prototype);
  }
}
