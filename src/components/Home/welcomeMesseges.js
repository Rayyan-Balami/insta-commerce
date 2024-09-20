const welcomeMessages = [
  "Hey bestie, ready to shop till you drop? 🛍️",
  "What's up? Time to treat yourself! 💅",
  "Yo, welcome to the coolest store ever! 🙌",
  "Hey fam, let's get you some fresh fits! 👗",
  "Welcome, let's find your next fave item! ✨",
  "Sup, you're about to discover some fire deals! 🔥",
  "Hey there, let's make your cart happy! 🛒",
  "Welcome, let's shop and slay together! 💪",
  "Hey, you're in for a shopping spree! 🎉",
  "Yo, let's make today a shopping adventure! 🌟"
];

const getRandomWelcomeMessage = () => {
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[randomIndex];
};

export { getRandomWelcomeMessage };