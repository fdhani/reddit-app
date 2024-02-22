import { useState } from "react";
import buildCreatedDate from "../../../factories/buildCreatedDate";
import ReplyCard from "./ReplyCard";
import styles from "./replies.module.scss";

const RecursiveReplies = (props) => {
  const { indent, data } = props;
  const [expand, setExpand] = useState(true);

  const renderData = data?.replies?.data?.children
    ? data.replies.data.children
    : data;

  const handleExpand = () => {
    setExpand((currEx) => !currEx);
  };

  return (
    <div className={styles.container} data-noborder={indent === 0}>
      {Array.isArray(renderData) &&
        renderData.map(({ data: childrenItem }, idx) => {
          console.log({ childrenItem: childrenItem });
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
                onExpand={handleExpand}
                showExpand={childrenItem?.replies?.data?.children?.length > 0}
                createdDate={buildCreatedDate(childrenItem.created_utc)}
              />
              {expand && (
                <RecursiveReplies
                  data={childrenItem}
                  hasChildrem
                  indent={indent + 1}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RecursiveReplies;
