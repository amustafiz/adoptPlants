import { ObjectId } from "bson";

export const Sunlight = {
  "full shade": "full shade",
  "part shade": "part shade",
  "indirect light": "indirect light",
  "full sun": "full sun",
} as const;

export const Cycle = {
  perennial: "perennial",
  annual: "annual",
  biennial: "biennial",
  biannual: "biannual",
} as const;

export const Water = {
  frequent: "frequent",
  average: "average",
  minumum: "minumum",
  none: "none",
} as const;

export interface Ad {
  _id?: string | ObjectId;
  authorId?: number | string;
  title: string;
  description: string;
  imageUrl?: string;
  watering?: keyof typeof Water;
  sunlight?: keyof typeof Sunlight;
  email: string;
  indoor?: boolean;
  edible?: boolean;
  poisonous?: boolean;
  cycle?: keyof typeof Cycle;
  authorName?: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface NotificationType {
  title?: string;
  status?: string;
  message?: string;
}
