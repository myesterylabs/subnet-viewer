export type CreateSubnet = {
    parent: string;
    minValidator: number;
    minValidatorStake: number;
    bottomUpCheckPeriod: number;
    wallet: string;
  }