import React, { FC } from "react";
import image1 from "../../assets/404/byte-1.png";
import image2 from "../../assets/404/byte-2.png";
import image3 from "../../assets/404/byte-3.png";
import image4 from "../../assets/404/byte-4.png";
import image5 from "../../assets/404/byte-5.png";
import image6 from "../../assets/404/byte-6.png";
import image7 from "../../assets/404/byte-7.png";

const QUOTES = [
  "Not all who wander are lost.",
  "'Tis better to have loved and lost than never to have loved at all.",
  "When another is lost, dare to help them find the way.",
  "We should consider every day lost on which we have not danced at least once.",
  "It's a lot easier to be lost than found. It's the reason we're always searching and rarely discovered--so many locks not enough keys.",
  "Lost opportunities, lost possibilities, feelings we can never get back. That's part of what it means to be alive.",
  "I am free and that is why I am lost.",
  "Poetry is what gets lost in translation.",
  "I'm not lost for I know where I am. But however, where I am may be lost.",
  "Love is the longing for the half of ourselves we have lost.",
  "I was born lost and take no pleasure in being found.",
  "Out of all the things I have lost, I miss my mind the most.",
  '"Because I am lost," she whispered onto the earth. "And I do not know the way."',
];
const PHOTOS = [image1, image2, image3, image4, image5, image6, image7];
const tryAgain = `(Sorry, let's try that again...)`;

const NotFound: FC<void> = () => {
  const randomQuote = (): string => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  };
  const randomPhoto = (): string => {
    return PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
  };
  return (
    <div className="max-h-40vh grid grid-rows-3 min-h-72 bg-black mx-20 max-w-6xl xl:mx-auto py-6 rounded-mb-md">
      <div className="flex justify-center row-span-2">
        <img className="object-contain" src={randomPhoto()} alt="MB byte who's very sorry for your inconvenience!" />
      </div>
      <div className="place-self-center w-2/3">
        <p className="text-mb-green-100 text-center">{randomQuote()}</p>
        <p className="text-mb-green-200 text-center">{tryAgain}</p>
      </div>
    </div>
  );
};

export default NotFound;
