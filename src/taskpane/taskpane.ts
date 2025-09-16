/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";

    document.getElementById("textInput").addEventListener("input", handleInput);

    setupExcelEvents();
  }
});

const handleInput = async (event: Event) => {
  const inputElem = event.target as HTMLInputElement;
  const text = inputElem.value;

  try {
    await Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load(["address", "rowCount", "columnCount"]);
      await context.sync();

      console.log(`Updating range: ${range.address} (${range.rowCount}x${range.columnCount})`);

      const values = Array(range.rowCount)
        .fill(null)
        .map(() => Array(range.columnCount).fill(text));

      range.values = values;
      // range.format.autofitColumns();
      await context.sync();
    });
  } catch (error) {
    console.error(error);
  }
};

const handleSelectionChange = async () => {
  console.log("Selection changed!");

  const currentValue = await getActiveCellValue();

  const textInput = document.getElementById("textInput") as HTMLInputElement;
  if (textInput) {
    textInput.value = currentValue;
    // console.log("Text input cleared");
  }
};

const getActiveCellValue = async () => {
  return await Excel.run(async (context) => {
    const range = context.workbook.getActiveCell();
    range.load(["values"]);

    await context.sync();
    // console.log(`Active cell values: ${range.values}`);

    const [[firstValue]] = range.values;
    return firstValue?.toString() || "";
  });
};

const setupExcelEvents = async () => {
  try {
    await Excel.run(async (context) => {
      context.workbook.onSelectionChanged.add(handleSelectionChange);
      await context.sync();
    });
  } catch (error) {
    console.error(error);
  }
};
