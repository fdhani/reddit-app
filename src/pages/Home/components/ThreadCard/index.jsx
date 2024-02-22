import ClassicView from "./components/ClassicView";
import CompactView from "./components/CompactView";
import CardView from "./components/CardView";
import { useState } from "react";

const ThreadCard = (props) => {
  const [vote, setVote] = useState("");

  const { view, ...otherProps } = props;

  const handleVote = (vote) => {
    setVote((currentVote) => {
      if (currentVote) {
        return vote;
      }

      return currentVote ? "" : vote;
    });
  };

  let upvotesTotal = otherProps.upvotesTotal;
  if (vote === "up") {
    upvotesTotal += 1;
  } else if (vote === "down") {
    upvotesTotal -= 1;
  }

  switch (view) {
    case "compact":
      return (
        <CompactView
          {...otherProps}
          upvotesTotal={upvotesTotal}
          vote={vote}
          onVote={handleVote}
        />
      );
    case "card":
      return (
        <CardView
          {...otherProps}
          upvotesTotal={upvotesTotal}
          vote={vote}
          onVote={handleVote}
        />
      );

    default:
      return (
        <ClassicView
          {...otherProps}
          upvotesTotal={upvotesTotal}
          vote={vote}
          onVote={handleVote}
        />
      );
  }
};

export default ThreadCard;
