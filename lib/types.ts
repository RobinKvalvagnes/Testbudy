export type TestRun = {
    id: number | string;  // Allow both number and string
    applicationName: string;
    state: string;
    testID: number | string;  // Allow both number and string
    testName: string;
    testURL: string;
  };
  