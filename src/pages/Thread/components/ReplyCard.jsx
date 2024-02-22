import styles from "./replies.module.scss";

const ReplyCard = (props) => {
  const { author, body, createdDate, onExpand, showExpand } = props;
  return (
    <div className={styles.replyContainer}>
      <div className={styles.title}>
        <a
          href={`https://www.reddit.com/user/${author}`}
          target="_blank"
          rel="noreferrer"
        >
          <b>{author}</b>
        </a>{" "}
        | <span>{createdDate}</span>
      </div>
      <div className={styles.body}>{body}</div>
      {showExpand && <button onClick={onExpand}>expand / collapse</button>}
    </div>
  );
};

export default ReplyCard;
