export class Expression {
  constructor(
    public id: string,
    public name: string,
    public formula: string,
    public dependencies: Expression[]
  ) {}
}
