export interface IUnicodeCodes {
    LEFT_TO_RIGHT_EMBEDDING: string;
    RIGHT_TO_LEFT_EMBEDDING: string;
    POP_DIRECTIONAL_FORMATTING: string;
}

// tslint:disable-next-line:max-classes-per-file
export const UnicodeCodes: IUnicodeCodes = class {
    public static readonly LEFT_TO_RIGHT_EMBEDDING = "\u202A";
    public static readonly RIGHT_TO_LEFT_EMBEDDING = "\u202B";
    public static readonly POP_DIRECTIONAL_FORMATTING = "\u202C";
};

// tslint:disable-next-line:max-classes-per-file
export const DebugUnicodeCodes: IUnicodeCodes = class {
    public static readonly LEFT_TO_RIGHT_EMBEDDING = "→";
    public static readonly RIGHT_TO_LEFT_EMBEDDING = "←";
    public static readonly POP_DIRECTIONAL_FORMATTING = "♦";
};
