export interface IDataTransformService {
  createMatrix<T>(rows: number, columns: number, value: T): T[][];
}
