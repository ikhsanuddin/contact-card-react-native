import { I18n, Scope, TranslateOptions } from "i18n-js";
import * as Localization from "expo-localization";
import Storage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { ITranslate } from "@/types/translation";
import translations from "@/translations";

export const TranslationContext = React.createContext<ITranslate>({
  locale: "",
  setLocale: () => {},
  t: () => "",
  translate: () => "",
});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState(Localization.locale);
  
  // Set the key-value pairs for the different languages you want to support.
  const i18n = new I18n(translations);
  // Set the default locale as fallback.
  i18n.defaultLocale = 'en';
  // Set the locale once at the beginning of your app.
  i18n.locale = locale;
  // When a value is missing from a language it'll fallback to another language with the key present.
  i18n.enableFallback = true;

  const t = useCallback(
    (scope: Scope, options?: TranslateOptions) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  // get locale from storage
  const getLocale = useCallback(async () => {
    // get preferance gtom storage
    const localeJSON = await Storage.getItem("locale");

    // set Locale / compare if has updated
    setLocale(localeJSON !== null ? localeJSON : Localization.locale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    // save preferance to storage
    Storage.setItem("locale", locale);
  }, [locale]);

  const contextValue = {
    t,
    locale,
    setLocale,
    translate: t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

/*
 * useTranslation hook based on i18n-js
 * Source: https://github.com/fnando/i18n-js
 */
export const useTranslation = () =>
  useContext(TranslationContext) as ITranslate;
