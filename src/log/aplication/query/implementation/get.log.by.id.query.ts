import { IQuery } from '@nestjs/cqrs';

export class GetLogByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
