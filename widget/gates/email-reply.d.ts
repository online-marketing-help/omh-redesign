/* Types for email-reply.js. The gate is plain JavaScript because the same
   text is asserted by the tests and inlined into the n8n Code node that
   reads the mailbox. */

export type InboundMessage = {
  subject?: string;
  from?: string;
  to?: string;
  text?: string;
  contentType?: string;
  /** The mail server's own id for this message, if the reader gives one. */
  messageId?: string;
  /** The IMAP uid, used to recognise the same message read twice. */
  uid?: string | number;
  headers?: Record<string, string>;
};

/** Which outbound Message-ID this answers, newest first. */
export declare function threadIds(msg: InboundMessage | null): string[];

/** The `+t<id>` token in an address, or null. */
export declare function tokenIn(value: unknown): string | null;

/** Machine-generated rather than written by a person. */
export declare function isAutoReply(msg: InboundMessage | null): boolean;

/**
 * Which outbound touch this answers.
 * `lookup` is asked for each candidate Message-ID and returns a touch id.
 */
export declare function touchIdFrom(
  msg: InboundMessage | null,
  lookup: (messageId: string) => string | null,
): string | null;

export declare function tokenFrom(msg: InboundMessage | null): string | null;

export type ReplyVerdict = {
  /** True only for a message a person wrote, matched to something we sent. */
  reply: boolean;
  /** One of our touch rows, found by threading. */
  touchId: string | null;
  /** The `+t` token from the Reply-To, naming the send rather than the
      touch. Resolved through the send's idempotency key. */
  token: string | null;
  /** "" when it is a reply; otherwise auto_reply | unmatched | no_message. */
  why: string;
};

export declare function readReply(
  msg: InboundMessage | null,
  lookup: (messageId: string) => string | null,
): ReplyVerdict;

/** Whether an inbound touch means the person actually answered. Asked both
    when mail arrives and by the sequence worker, which must agree. */
export declare function countsAsReply(
  touch: { direction?: string; status?: string } | null,
): boolean;
