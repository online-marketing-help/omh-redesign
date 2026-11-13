/* Types for consent-gate.js. */

export type ScreenedPerson = {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  service?: string;
  sourceChannel: "reactivation";
  consentBasis: string;
  consentEvidence: string;
  lastBoughtAt?: string;
};

export type Refusal = {
  row: number;
  name: string;
  phone?: string;
  email?: string;
  /** no_contact | no_consent_basis | unknown_consent_basis |
      no_consent_evidence | evidence_too_thin | duplicate_in_import */
  why: string;
};

export type Screened = {
  intended: number;
  accepted: ScreenedPerson[];
  refused: Refusal[];
  /** Accepted, in pages of PAGE, because enrolling four hundred in one
      mutation holds read locks every live send also needs. */
  pages: ScreenedPerson[][];
};

export declare function screenRows(rows: unknown[]): Screened;
export declare function phoneKey(raw: unknown): string;
export declare function emailKey(raw: unknown): string;
export declare const PAGE: number;
