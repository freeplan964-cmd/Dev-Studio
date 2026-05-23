import { BaseService } from "./base.service.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class TemplatesService extends BaseService {
  constructor(uow: IUnitOfWork) {
    super(uow, (u) => u.templates);
  }
}

