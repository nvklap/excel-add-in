export interface IUIService {
  getInputElement(elementId: string): HTMLInputElement | null;
  getEventInputValue(event: Event): string | null;
  setInputValue(elementId: string, value: string): void;
  registerInputHandler(elementId: string, handler: (event: Event) => Promise<void>): void;
  hideSideloadMessage(): void;
  showAppBody(): void;
}
