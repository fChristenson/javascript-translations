class Translator {
  constructor() {
    this.languages = {};
    this.translationListeners = [];
    this.addTranslations = this.addTranslations.bind(this);
    this.translate = this.translate.bind(this);
    this.addTranslationListener = this.addTranslationListener.bind(this);
    this._callTranslationListeners = this._callTranslationListeners.bind(this);
    this._applyTranslations = this._applyTranslations.bind(this);
  }

  // we call this when the user changes language
  async addTranslations(lang, page) {
    if (typeof this.languages[lang] === "object") {
      this._applyTranslations(this.languages[lang], lang);
      return this._callTranslationListeners(this.translationListeners, lang);
    }

    const res = await fetch(
      `http://localhost:3000/lang?q=${lang}&page=${page}`
    );
    const json = await res.json();
    this.languages[lang] = json;
    this._applyTranslations(this.languages[lang], lang);
    return this._callTranslationListeners(this.translationListeners, lang);
  }

  // we provide a way for programmatic translations
  translate(lang, key, options) {
    const unformattedText = this.languages[lang] && this.languages[lang][key];

    if (!unformattedText)
      return console.warn(`Missing translation ${key} for language ${lang}`);

    const keys = Object.keys(options);

    return keys.reduce((str, key) => {
      const regexp = new RegExp(`{${key}}`, "g");
      const value = options[key];
      return unformattedText.replace(regexp, value);
    }, unformattedText);
  }

  // we allow for subscribers to subscribe to the language change event
  addTranslationListener(fn) {
    this.translationListeners.push(fn);
  }

  // we call all the listener functions
  _callTranslationListeners(translationListeners, lang) {
    return translationListeners.forEach(fn => fn(lang));
  }

  // we grab all the translations elements and set the translated text
  _applyTranslations(translations, lang) {
    const elementsToTranslate = document.querySelectorAll("[data-translation]");

    elementsToTranslate.forEach(element => {
      const key = element.getAttribute("data-translation");
      const translation = translations[key];

      if (translation) {
        element.textContent = translation;
      } else {
        console.warn(`Missing translation ${key} for language ${lang}`);
      }
    });
  }
}

const translator = new Translator();
