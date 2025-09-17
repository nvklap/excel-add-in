import { injectable } from "inversify";

import { IDataTransformService } from "../core/interfaces/IDataTransformService";

@injectable()
export class DataTransformService implements IDataTransformService {
  createMatrix<T>(rows: number, columns: number, value: T): T[][] {
    return Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(value));
  }
}
