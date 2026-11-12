/* Types for csv.js. The gate is plain JavaScript because the same text runs
   in the tests, in the browser (so the preview is computed before anything
   is sent) and can be inlined into an n8n Code node. */

export type CsvRow = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  consentBasis: string;
  consentEvidence: string;
  lastBoughtAt: string;
  /** Which line of the file this came from, so a problem can be found. */
  _line: number;
};

export type CsvProblem = { line: number; why: string; text: string };

export type CsvResult = {
  rows: CsvRow[];
  problems: CsvProblem[];
  /** Set when the FILE is wrong rather than a row: no header, or no consent
      columns. `rows` is then empty on purpose. */
  headerProblem: string | null;
  /** rows + problems: every line that was meant to be a person. */
  intended: number;
};

export declare function parseCsv(text: string): CsvResult;
export declare function splitLine(line: string): string[];
export declare const HEADERS: {
  required: string[];
  aliases: Record<string, string[]>;
};
