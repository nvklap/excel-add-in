import { inject, injectable } from "inversify";

import { DI_TYPES } from "../core/types";
import { IExcelService } from "../core/interfaces/IExcelService";
import { IDataTransformService } from "../core/interfaces/IDataTransformService";

@injectable()
export class ExcelService implements IExcelService {
  constructor(
    @inject(DI_TYPES.DataTransformService) private dataTransformService: IDataTransformService
  ) {}

  async getSelectedRangeValues(): Promise<Excel.Range> {
    return Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load(["address", "rowCount", "columnCount"]);
      await context.sync();
      return range;
    });
  }

  setSelectedRangeValues(range: Excel.Range, value: string): Promise<void> {
    return Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const loadedRange = sheet.getRange(range.address);

      const textMatrix = this.dataTransformService.createMatrix(
        range.rowCount,
        range.columnCount,
        value
      );

      loadedRange.values = textMatrix;
      await context.sync();
    });
  }

  async getActiveCellValue(): Promise<string> {
    return Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load("values");

      await context.sync();

      const [[value]] = range.values;
      return value?.toString() || "";
    });
  }

  async registerSelectionChangeHandler(handler: () => Promise<void>): Promise<void> {
    try {
      await Excel.run((context) => {
        context.workbook.onSelectionChanged.add(handler);
        return context.sync();
      });
    } catch (error) {
      console.error("Error setting up selection change handler:", error);
      ``;
    }
  }
}
