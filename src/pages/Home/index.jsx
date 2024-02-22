import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import ThreadCard from "./components/ThreadCard";
import buildCreatedDate from "../../factories/buildCreatedDate";
import { useEffect, useMemo, useState } from "react";
import fetchSubredditPosts from "./repositories/fetch-subreddit-threads";
import useIntersect from "./hooks/use-intersect";
import TabFilter from "./components/TabFilter";
import ThreadCardLoader from "./components/ThreadCardLoader";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import styles from "./index.module.scss";

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
  const [search, setSearch] = useState("");
  const [loadingPagination, setLoadingPagination] = useState(false);
  const params = useParams();
  const [activeView, setActiveView] = useState("classic");
  const { state } = useNavigation();

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

  const handleViewChange = ({ id }) => {
    setActiveView(id);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 3) {
      setThreadList((currThreadList) => {
        const searchLc = search.toLocaleLowerCase();

        const filteredThreadList = currThreadList.filter((threadItem) => {
          const { title } = threadItem.data;
          console.log("title", threadItem);
          const titleLc = title.toLowerCase();

          return titleLc.includes(searchLc);
        });
        console.log(filteredThreadList);

        return filteredThreadList;
      });
    }
  }, [search]);

  return (
    <Layout>
      <Helmet>
        <title>{data.details.subRedditName} | Reddit</title>
      </Helmet>
      <div>
        <h1>{data.details.subRedditName}</h1>
        <input
          value={search}
          placeholder="Input"
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.tabContainer}>
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
                <ThreadCard
                  thumbnail={threadItem.thumbnail}
                  view={activeView}
                  url={threadItem.url}
                  key={`${key}-${threadItem.id}`}
                  subRedditName={data.details.subRedditName}
                  title={threadItem.title}
                  totalComments={threadItem.num_comments}
                  author={threadItem.author}
                  upvotesTotal={threadItem.ups}
                  threadId={threadItem.id}
                  createdDate={buildCreatedDate(threadItem.created_utc)}
                />
              );
            })}
            {after !== null && !search && (
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
