"use client";

import { useActionState, useState } from "react";
import { signIn, type SignInState } from "@/app/dashboard/login/actions";
import { IconLock, IconEye, IconEyeOff, IconArrow, IconAlert } from "./icons";

/* The sign-in form.

   Small and deliberately unclever. The only things it does beyond a plain
   form are the ones that stop people being stuck: it shows the password when
   asked, it says what went wrong in words under the field rather than at the
   top of the page, and it disables itself while the request is in flight so a
   second press cannot fire a second sign-in. */

export function SignInForm({ user, next }: { user: string; next: string }) {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="mt-7 space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="omh-user"
          className="block font-sans text-[12.5px] font-semibold tracking-[.01em]"
        >
          Name
        </label>
        <input
          id="omh-user"
          name="user"
          type="text"
          defaultValue={user}
          autoComplete="username"
          required
          className="mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-[15px] text-ink outline-none transition-colors duration-150 focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
        />
      </div>

      <div>
        <label
          htmlFor="omh-password"
          className="block font-sans text-[12.5px] font-semibold tracking-[.01em]"
        >
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="omh-password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            required
            aria-describedby={state.error ? "omh-signin-error" : undefined}
            aria-invalid={state.error ? true : undefined}
            className="w-full rounded-xl border border-line bg-surface py-3 pl-3.5 pr-12 text-[15px] text-ink outline-none transition-colors duration-150 focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            /* A real label, not a title: an icon-only button is unusable with
               a screen reader otherwise, and the state has to be in the name
               or it reads the same both ways. */
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted outline-none transition-colors duration-150 hover:bg-warm hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {show ? <IconEyeOff className="h-[17px] w-[17px]" /> : <IconEye className="h-[17px] w-[17px]" />}
          </button>
        </div>
      </div>

      {state.error && (
        <p
          id="omh-signin-error"
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-[#c4572f]/45 bg-[#c4572f]/10 px-3.5 py-3 text-[13.5px] leading-relaxed text-[#9a3f1e] dark:text-[#e8a583]"
        >
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        /* Tan rather than the ink fill used elsewhere. Every other primary
           button in the dashboard sits inside a pale card, so ink reads as
           the strongest thing near it. This one sits on the page itself, and
           in the dark theme a near-black button on a near-black page was a
           shape you had to look for. The brand accent is the one colour that
           is obviously a button in both themes, and ink on tan measures well
           past the contrast it needs. */
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-sans text-[15px] font-semibold outline-none transition-[filter,opacity] duration-150 hover:brightness-[1.04] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        /* The literal ink, not var(--color-ink): that token flips to near
           white in the dark theme, and the tan behind it does not. */
        style={{ background: "var(--accent)", color: "#101828" }}
      >
        {pending ? "Signing in…" : "Sign in"}
        {!pending && (
          <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 pt-1 text-[12.5px] text-muted">
        <IconLock className="h-3.5 w-3.5" />
        Private to Online Marketing Help
      </p>
    </form>
  );
}
