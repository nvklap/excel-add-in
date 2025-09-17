export interface IExcelService {
  getSelectedRangeValues(): Promise<Excel.Range>;
  setSelectedRangeValues(range: Excel.Range, value: string): Promise<void>;
  getActiveCellValue(): Promise<string>;
  registerSelectionChangeHandler(handler: () => Promise<void>): Promise<void>;
}
