type RegisterCustomCardParams = {
  /** Custom card type. E.g.: content-card-example */
  type: string;
  /** Friendly name for the card */
  name: string;
  /** Optional - defaults to false */
  preview?: boolean;
  /** Description of the card */
  description?: string;
  documentationURL?: string;
};

export function registerCustomCard(params: RegisterCustomCardParams) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];

  windowWithCards.customCards.push(params);
}
