import "reflect-metadata";
import { container } from "../di/container";

import { DI_TYPES } from "../core/types";

import { TaskPaneController } from "../controllers/TaskPaneController";

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    const controller = container.get<TaskPaneController>(DI_TYPES.TaskPaneController);
    controller.initialize();
  }
});
