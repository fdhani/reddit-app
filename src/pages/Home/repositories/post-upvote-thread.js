import authorize from "./authorize";

async function upvotePost(postId) {
  authorize();
  try {
    const response = await fetch(`https://oauth.reddit.com/api/vote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${"VKHRkGWFfPI2QYhDrkKAwsjH3x968A"}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${postId}&dir=1`, // dir=1 for upvote, dir=-1 for downvote
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Post upvoted successfully:", data);
      // Handle successful upvote
    } else {
      throw new Error(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error upvoting post:", error);
  }
}

export default upvotePost;
