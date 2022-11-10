export type AllPropertyTypesFromInterface<T> = {
  [P in keyof T]: T[P];
}[keyof T];
