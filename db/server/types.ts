export type Deferrals = {
  defer(): void;

  update(message: string): void;

  presentCard(card: object | string, cb?: (data: object, rawData: string) => void): void;

  done(failureReason?: string): void;
};

export type Identifiers = {
  steam: string;
  license: string;
  discord: string;
};
