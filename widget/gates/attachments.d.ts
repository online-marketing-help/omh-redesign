/* Types for attachments.js, so Convex and the Next app can import it.

   The gate itself is plain JavaScript on purpose: the identical text runs in
   the visitor's browser, in these tests, and inside an n8n Code node, and a
   build step between those three is a place for them to drift apart. This
   file is the contract, nothing more; it has no implementation in it. */

export type Kind = "image" | "audio";

/** Why something was refused. Each one maps to a sentence a visitor reads. */
export type Why =
  | "no_file"
  | "wrong_type"
  | "empty"
  | "too_big"
  | "not_what_it_claims"
  | "bad_url"
  | "host_not_allowed";

export type Verdict =
  | { ok: true; kind: Kind; type: string; name: string; size: number; limit?: number; url?: string }
  | { ok: false; why: Why; limit?: number };

export type StoredAttachment = {
  storageId: string;
  kind: Kind;
  type: string;
  name: string;
  size: number;
  sourceUrl?: string;
};

export type StoredVerdict =
  | { ok: true; attachment: StoredAttachment }
  | { ok: false; why: Why; limit?: number; attachment?: undefined };

export declare const LIMITS: { image: number; audio: number };
export declare const IMAGE: string[];
export declare const AUDIO: string[];
export declare const META_HOSTS: string[];

export declare function sniff(buf: ArrayLike<number> | null | undefined): string | null;

export declare function checkAttachment(
  file: { name?: string; type?: string; size?: number } | null,
  bytes?: ArrayLike<number> | null,
): Verdict;

export declare function checkRemote(
  att: { url?: string; name?: string; type?: string; size?: number } | null,
  bytes?: ArrayLike<number> | null,
): Verdict;

export declare function verifyStored(
  claim: {
    storageId?: string;
    kind?: string;
    type?: string;
    name?: string;
    size?: number;
    sourceUrl?: string;
  } | null,
  bytes: ArrayLike<number> | null,
  storedSize: number,
): StoredVerdict;

export declare function safeName(raw: unknown): string;
