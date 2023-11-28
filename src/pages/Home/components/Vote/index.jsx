import Icon from "../../../../components/Icon";
import styles from "./vote.module.scss";

const Voting = (props) => {
  const { upvotesTotal, onVote, vertical, vote } = props;
  return (
    <div className={styles.container} data-vertical={vertical}>
      <Icon
        name="play_arrow"
        onClick={() => onVote("up")}
        className={styles.voteUp}
        filled={vote === "up"}
        rotate={-90}
      />
      <span>{upvotesTotal}</span>
      <Icon
        name="play_arrow"
        onClick={() => onVote("down")}
        className={styles.voteDown}
        rotate={90}
        filled={vote === "down"}
      />
    </div>
  );
};

export default Voting;
