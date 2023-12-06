import React, { createContext, useState, useEffect, useContext } from "react";
const FactsContext = createContext();
const FactsContextProvider = (props) => {
  const allFacts = [
    "Baobabs store water in their trunks, aiding survival during droughts in African savannas.",
    "The Titan Arum, or 'Corpse Flower,' emits an odor akin to rotting flesh to attract pollinators.",
    "Touch the sensitive plant, Mimosa Pudica, and watch its leaves fold instantly in response.",
    "Mangroves act as vital nurseries for young fish, supporting coastal biodiversity and protecting shorelines.",
    "Pando, a clonal colony of quaking aspen trees, is over 80,000 years old.",
    "Eucalyptus trees can release oils into the air, creating a blue haze over their forests.",
    "The Agave plant, used to make tequila, blooms only once in its lifetime and then dies.",
    "Sunflowers can track the sun's movement across the sky in a behavior called heliotropism.",
    "Bamboo is one of the fastest-growing plants and can grow up to 35 inches in a single day.",
    "The Venus flytrap can count the number of times it's been touched before closing on prey.",
    "The world's smallest flowering plant, Wolffia, is smaller than a grain of rice.",
    "The cacao tree produces cocoa beans used to make chocolate, and it can only grow within 20 degrees of the equator.",
    "Sequoia trees, among the tallest trees on Earth, can live for over 3,000 years.",
    "The Welwitschia mirabilis, a plant in the Namib Desert, can live for over 2,000 years.",
    "Cacti can survive without water for years due to their ability to store it in their tissues.",
    "The corpse plant, Rafflesia arnoldii, produces the world's largest flower, which emits a foul odor.",
    "The leaves of the silver dollar plant (Lunaria annua) are often used in dried flower arrangements.",
    "Vanilla flavoring comes from the seed pods of the Vanilla orchid.",
    "Saguaro cacti can take up to 75 years to grow their first arm.",
    "The Pitcher Plant attracts insects into a cup-shaped structure filled with digestive enzymes.",
  ];
  const [fact, setFact] = useState(null);

  useEffect(() => {
    getRandomFact();
  }, []);

  const getRandomFact = async () => {
    const takeRandomIndex = Math.floor(Math.random() * allFacts.length);
    const takeRandomeFact = allFacts[takeRandomIndex];
    if (takeRandomeFact) {
      setFact(takeRandomeFact);
    }
  };

  return (
    <FactsContext.Provider value={{ getRandomFact, fact }}>
      {props.children}
    </FactsContext.Provider>
  );
};

export { FactsContextProvider, FactsContext };
