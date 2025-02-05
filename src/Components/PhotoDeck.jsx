import React, { useState, useRef } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useAudio } from "../Components/AudioContext";

import "../styles/photography.scss";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 50,
  delay: i * 100,
});
const from = (_ier) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(750px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function PhotoDeck({ cards }) {
  const deckRefs = useRef([]);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const { playAudio, stopAudio } = useAudio();

  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = true; //velocity > 0.01 // If you flick hard enough it should trigger the card to fly out
      const dir = Math.random() > 0.5 ? 1 : -1; //xDir < 0 ? -1 : 1 // Direction should either point left or right

      const firstDeckItem = deckRefs.current[cards.length - 1];
      const deckItem = deckRefs.current[index];
      const nextDeckItem = deckRefs.current[index - 1];
      if (down && deckItem != null) {
        deckItem.classList.add("is-down");
        playAudio("/sounds/photography/paper.mp3", false);
        
      } else {
        stopAudio();
        deckItem.classList.remove("is-down");
        deckItem.classList.remove("top-card");

        index - 1 >= 0 ? nextDeckItem.classList.add("top-card") : "";
      }

      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (300 + window.innerWidth) * dir : down ? mx : 15; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 30 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.4 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 150 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          firstDeckItem.classList.add("top-card");
          gone.clear();
          api.start((i) => to(i));
        }, 400);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="deck-container">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={"deck"} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <div
            className={`deck-container ${
              i === props.length - 1 ? "top-card" : ""
            }`}
            ref={(ref) => (deckRefs.current[i] = ref)}
          >
            <animated.div
              className={"deck-inner"}
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                //backgroundImage: `url(${cards[i]})`,
              }}
            >
              <div className="deck-inner-image-container">
                <img
                  src={cards[i]}
                  loading="lazy" // Enables native lazy loading
                  alt={`Card ${i}`}
                />
              </div>
            </animated.div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}

export default PhotoDeck;
