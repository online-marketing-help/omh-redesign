"use client";

import { createContext, useContext } from "react";

/* =========================================================================
   Which rows are ticked, shared between the table and the bar above it.

   A context rather than a prop, for one reason worth writing down: the bulk
   bar is built on the server (it owns a server action) and handed to the
   table as an element. An element's props have to be serialisable, so the
   selection cannot be passed down to it and a callback cannot be passed up.
   Both sides read it from here instead, which keeps the table generic: it
   knows rows are ticked, not what ticking them is for.
   ========================================================================= */

export type Selection = {
  ids: string[];
  clear: () => void;
};

const Ctx = createContext<Selection>({ ids: [], clear: () => {} });

export const SelectionProvider = Ctx.Provider;

export function useSelection(): Selection {
  return useContext(Ctx);
}
