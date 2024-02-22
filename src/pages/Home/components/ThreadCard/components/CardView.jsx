import { Link } from "react-router-dom";
import Icon from "../../../../../components/Icon";
import Voting from "../../Vote";
import styles from "../thread-card.module.scss";

const checkIfExternalUrl = (url) => {
  if (url.includes("https://i.redd.it")) {
    return "internal";
  }

  return "external";
};

const ThreadCard = (props) => {
  const {
    threadId,
    subRedditName,
    title,
    totalComments,
    author,
    createdDate,
    upvotesTotal,
    onVote,
    vote,
    url,
    thumbnail,
  } = props;
  return (
    <article className={styles.containerCard}>
      <Voting upvotesTotal={upvotesTotal} onVote={onVote} vote={vote} />
      <div className={styles.info}>
        <h1>
          <Link to={`/${subRedditName}/comments/${threadId}`}>{title}</Link>
        </h1>
        {checkIfExternalUrl(url) === "external" ? (
          <a href={url}>{url}</a>
        ) : (
          <img src={thumbnail} width="80px" height="auto" />
        )}

        <span className={styles.txtPostInfo}>
          Posted by u/{author} | {createdDate}
        </span>
        <div className={styles.footer}>
          <Icon name="chat_bubble" size={14} />
          <b>&nbsp;{totalComments} Comments</b>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
