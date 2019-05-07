export interface Weather {
  name: string;
  levelType: string;
  level: number;
  unit: string;
  values: Array<number>;
}
