const signupCostParagraph = document.querySelector(
  "[data-translation=signupCost]"
);

// We can also load a default language
translator.loadTranslations("en", "home");

// if we want to add dynamic values we need a way to know when the
// user changes the translations
translator.addTranslationListener(lang => {
  const price = Math.floor(Math.random() * 100);
  const key = "signupCost";
  const options = { price };
  signupCostParagraph.textContent = translator.translate(lang, key, options);
});
