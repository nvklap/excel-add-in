import { injectable } from "inversify";

import { IUIService } from "../core/interfaces/IUIService";

@injectable()
export class UIService implements IUIService {
  setInputValue(elementId: string, value: string): void {
    const inputElement = this.getInputElement(elementId);
    if (inputElement) {
      inputElement.value = value;
    }
  }

  getInputElement(elementId: string): HTMLInputElement | null {
    return document.getElementById(elementId) as HTMLInputElement;
  }

  getEventInputValue(event: Event): string | null {
    const inputElement = event.target as HTMLInputElement;
    return inputElement?.value ?? null;
  }

  registerInputHandler(elementId: string, handler: (event: Event) => Promise<void>): void {
    const inputElement = this.getInputElement(elementId);

    if (inputElement) {
      inputElement.addEventListener("input", handler);
    }
  }

  hideSideloadMessage(): void {
    const sideloadMessage = document.getElementById("sideload-msg");
    if (sideloadMessage) {
      sideloadMessage.style.display = "none";
    }
  }

  showAppBody(): void {
    const appBody = document.getElementById("app-body");
    if (appBody) {
      appBody.style.display = "flex";
    }
  }
}
