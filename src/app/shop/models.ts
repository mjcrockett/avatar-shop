export enum Categories {
    None = 0,
    Arms = 1,
    Feet = 2,
    Full = 3,
    Hair = 4,
    Heads = 5,
    Legs = 6,
    Torsos = 7
}
export interface Icon {
    partsId: number;
    path: string;
}
export interface Icons {
    iconsId: number;
    iconsName: string;
    icons: Icon[]
}
export interface BodyPaths {
    head: string;
    hair: string;
    torso: string;
    leftArm: string;
    rightArm: string;
    legs: string;
    feet: string;
}
export interface Parts {
    partsId: number;
    partsName: string;
    paths: BodyPaths;
}

export interface AllData {
    icons: Icons[];
    parts: Parts[];
}
  