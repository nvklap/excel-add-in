import { injectable, inject } from "inversify";

import { DI_TYPES } from "../core/types";
import { IExcelService } from "../core/interfaces/IExcelService";
import { IUIService } from "../core/interfaces/IUIService";

@injectable()
export class TaskPaneController {
  constructor(
    @inject(DI_TYPES.ExcelService) private excelService: IExcelService,
    @inject(DI_TYPES.UIService) private uiService: IUIService
  ) {}

  initialize(): void {
    this.uiService.hideSideloadMessage();
    this.uiService.showAppBody();

    this.registerEventHandlers();
  }

  private async registerEventHandlers(): Promise<void> {
    this.uiService.registerInputHandler("textInput", this.handleInput.bind(this));

    await this.excelService.registerSelectionChangeHandler(this.handleSelectionChange.bind(this));
  }

  private async handleInput(event: Event): Promise<void> {
    const inputValue = this.uiService.getEventInputValue(event);

    if (inputValue !== null) {
      try {
        const selectedRange = await this.excelService.getSelectedRangeValues();
        await this.excelService.setSelectedRangeValues(selectedRange, inputValue);
      } catch (error) {
        console.log("Error handling input event:", error);
      }
    }
  }

  private async handleSelectionChange(): Promise<void> {
    try {
      const value = await this.excelService.getActiveCellValue();

      this.uiService.setInputValue("textInput", value);
    } catch (error) {
      console.log("Error handling selection change:", error);
    }
  }
}
