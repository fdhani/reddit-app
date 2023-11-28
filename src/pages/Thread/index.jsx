import { Await, Link, useLoaderData } from "react-router-dom";
import RecursiveReplies from "./components/RecursiveReplies";
import buildCreatedDate from "../../factories/buildCreatedDate";
import Layout from "../../components/Layout";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

const Thread = () => {
  const { comments } = useLoaderData();

  return (
    <Layout>
      <Suspense fallback="Loading...">
        <Await resolve={comments}>
          {(comments) => {
            const commentData = comments?.data;
            const mainCommentData = commentData?.[0]?.data?.children?.[0]?.data;
            const threadComments = commentData?.[1].data;
            return (
              <article>
                <Helmet>
                  <title>{mainCommentData.title} | Reddit</title>
                </Helmet>
                <div>
                  <Link to={`/${mainCommentData.subreddit_name_prefixed}`}>
                    <b>{mainCommentData.subreddit_name_prefixed}</b>
                  </Link>{" "}
                  | Posted by{" "}
                  <a
                    href={`https://www.reddit.com/user/${mainCommentData.author}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    u/
                    {mainCommentData.author}
                  </a>{" "}
                  {buildCreatedDate(mainCommentData.created_utc)}
                </div>
                <h1>{mainCommentData.title}</h1>
                <p>{mainCommentData.selftext}</p>
                <RecursiveReplies data={threadComments.children} indent={0} />
              </article>
            );
          }}
        </Await>
      </Suspense>
    </Layout>
  );
};

export default Thread;
