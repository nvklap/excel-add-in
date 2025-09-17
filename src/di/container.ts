import "reflect-metadata";
import { Container } from "inversify";

import { DI_TYPES } from "../core/types";
import { IExcelService } from "../core/interfaces/IExcelService";
import { IUIService } from "../core/interfaces/IUIService";

import { ExcelService } from "../services/ExcelService";
import { UIService } from "../services/UIService";
import { TaskPaneController } from "../controllers/TaskPaneController";
import { IDataTransformService } from "../core/interfaces/IDataTransformService";
import { DataTransformService } from "../services/DataTransformService";

export const container = new Container();

container.bind<IExcelService>(DI_TYPES.ExcelService).to(ExcelService).inSingletonScope();

container.bind<IUIService>(DI_TYPES.UIService).to(UIService).inSingletonScope();

container
  .bind<IDataTransformService>(DI_TYPES.DataTransformService)
  .to(DataTransformService)
  .inSingletonScope();

container
  .bind<TaskPaneController>(DI_TYPES.TaskPaneController)
  .to(TaskPaneController)
  .inSingletonScope();
