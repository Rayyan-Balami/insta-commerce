const welcomeMessages = [
  "Welcome! Let's make shopping fun 🔥",
  "Hey! Ready for a shopping spree? 🛍️",
  "Welcome! Ready to fill your cart? 🛒",
  "Hello! Shopping just got better! 🎉",
  "Welcome to your top shopping spot! 🌈",
  "Welcome! Let's start your shopping journey 🌟",
  "Hey! Find your next great buy here 🔥",
  "Welcome aboard! Shop till you drop 🚀",
  "Welcome! Enjoy every purchase 🎉",
  "Welcome! Your shopping adventure starts now 🛍️"
];

const getRandomWelcomeMessage = () => {
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[randomIndex];
};

export { getRandomWelcomeMessage };

