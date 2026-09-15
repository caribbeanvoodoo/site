"use client";
import { createContext, useContext } from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";
const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(
  null,
);
export function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within a LocaleProvider");
  return value;
}
