import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import ThreadCard from "./components/ThreadCard";
import buildCreatedDate from "../../factories/buildCreatedDate";
import { useEffect, useMemo, useState } from "react";
import fetchSubredditPosts from "./repositories/fetch-subreddit-threads";
import useIntersect from "./hooks/use-intersect";
import upvotePost from "./repositories/post-upvote-thread";
import TabFilter from "./components/TabFilter";
import ThreadCardLoader from "./components/ThreadCardLoader";
import Layout from "../../components/Layout";

const VIEW_TYPE = [
  {
    id: "classic",
    name: "view_list",
    title: "Classic",
  },
  {
    id: "compact",
    name: "table_rows_narrow",
    title: "Compact",
  },
  {
    id: "card",
    name: "view_agenda",
    title: "Card",
  },
];

function Home() {
  const data = useLoaderData();
  const [threadList, setThreadList] = useState(data.threads.list);
  const [after, setAfter] = useState(data.threads.after);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const params = useParams();
  const [activeView, setActiveView] = useState("classic");
  const { state, ...navP } = useNavigation();

  console.log({
    navP,
  });

  useEffect(() => {
    setThreadList(data.threads.list);
    setAfter(data.threads.after);
  }, [data]);

  const filterTabs = useMemo(
    () => [
      {
        id: "hot",
        name: "local_fire_department",
        title: "Hot",
        url: `/r/${params.subreddit}/hot`,
      },
      {
        id: "new",
        name: "new_releases",
        title: "New",
        url: `/r/${params.subreddit}/new`,
      },
      {
        id: "top",
        name: "social_leaderboard",
        title: "Top",
        url: `/r/${params.subreddit}/top`,
      },
    ],
    [params.subreddit]
  );

  const ref = useIntersect(async () => {
    if (!loadingPagination) {
      setLoadingPagination(true);
      const data = await fetchSubredditPosts(params.subreddit, {
        after,
      });
      setAfter(data.after);
      setThreadList((currPosts) => [...currPosts, ...data.list]);
      setLoadingPagination(false);
    }
  });

  const handleVote = () => {
    upvotePost();
  };

  const handleViewChange = ({ id }) => {
    setActiveView(id);
  };

  return (
    <Layout>
      <h1>{data.details.subRedditName}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TabFilter
          data={filterTabs}
          activeId={(params?.filter || "top").toLowerCase()}
        />
        <TabFilter
          data={VIEW_TYPE}
          activeId={activeView}
          onTabChange={handleViewChange}
        />
      </div>
      <main>
        {state === "loading" ? (
          <>
            <ThreadCardLoader />
            <ThreadCardLoader />
            <ThreadCardLoader />
            <ThreadCardLoader />
          </>
        ) : (
          <>
            {threadList.map(({ data: threadItem }, key) => {
              return (
                <>
                  <ThreadCard
                    view={activeView}
                    key={`${key}-${threadItem.id}`}
                    subRedditName={data.details.subRedditName}
                    title={threadItem.title}
                    totalComments={threadItem.num_comments}
                    author={threadItem.author}
                    upvotesTotal={threadItem.ups}
                    threadId={threadItem.id}
                    createdDate={buildCreatedDate(threadItem.created_utc)}
                    onVote={handleVote}
                  />
                </>
              );
            })}
            {after !== null && (
              <div ref={ref}>
                <ThreadCardLoader />
                <ThreadCardLoader />
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export default Home;
