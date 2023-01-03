export interface IFilterButton {
  type: Filter;
  label: string;
  isActive: boolean
}
export enum Filter {
  All,
  Active,
  Completed
}
export const TOAST_TIME = 1000;
