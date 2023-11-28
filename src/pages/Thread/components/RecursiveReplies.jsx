import buildCreatedDate from "../../../factories/buildCreatedDate";
import ReplyCard from "./ReplyCard";
import styles from "./replies.module.scss";

const RecursiveReplies = (props) => {
  const { indent, data } = props;

  const renderData = data?.replies?.data?.children
    ? data.replies.data.children
    : data;

  return (
    <div className={styles.container} data-noborder={indent === 0}>
      {Array.isArray(renderData) &&
        renderData.map(({ data: childrenItem }, idx) => {
          return (
            <div
              key={idx}
              style={{
                paddingLeft: indent === 0 ? "0" : `45px`,
              }}
            >
              <ReplyCard
                author={childrenItem.author}
                body={childrenItem.body}
                createdDate={buildCreatedDate(childrenItem.created_utc)}
              />
              <RecursiveReplies data={childrenItem} indent={indent + 1} />
            </div>
          );
        })}
    </div>
  );
};

export default RecursiveReplies;
