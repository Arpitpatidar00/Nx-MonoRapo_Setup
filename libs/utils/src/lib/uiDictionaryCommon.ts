import { UI } from './assets';

export type UIType = {
  [key: string]: Record<string, unknown> | string | number | boolean;
};

export type InterpolationType = {
  [key: string]: string | number;
};

export let UIData: UIType = UI;

export function setUIData(data: UIType) {
  UIData = data;
}
