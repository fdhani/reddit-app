import styles from "./thread-card-loader.module.scss";

const ThreadCardLoader = () => {
  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <div className={styles.loader} />
      </div>

      <div className={styles.txtPostInfo}>
        <div className={styles.loader} />
      </div>
      <div className={styles.footer}>
        <div className={styles.loader} />
      </div>
    </article>
  );
};

export default ThreadCardLoader;
