import { Link } from "react-router-dom";
import Voting from "../../Vote";
import styles from "../thread-card.module.scss";
import Icon from "../../../../../components/Icon";

const CompactView = (props) => {
  const {
    threadId,
    subRedditName,
    title,
    vote,
    totalComments,
    author,
    createdDate,
    upvotesTotal,
    onVote,
  } = props;
  return (
    <article className={styles.containerCompact}>
      <Voting
        upvotesTotal={upvotesTotal}
        onVote={onVote}
        vertical
        vote={vote}
      />
      <div className={styles.info}>
        <h1>
          <Link to={`/${subRedditName}/comments/${threadId}`}>{title}</Link>
        </h1>

        <span className={styles.txtPostInfo}>
          Posted by u/{author} | {createdDate}
        </span>
      </div>
      <div className={styles.footer}>
        <Icon name="chat_bubble" size={14} />
        <b>&nbsp;{totalComments} Comments</b>
      </div>
    </article>
  );
};

export default CompactView;
