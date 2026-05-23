export abstract class BaseWorkflow {
  constructor(
    public id: string,
    public name: string,
  ) {}
  abstract execute(input: unknown): Promise<unknown>;
}
