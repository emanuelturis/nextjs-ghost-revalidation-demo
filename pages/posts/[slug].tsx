import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Post } from "..";

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  return (
    <div className="max-w-screen-lg mx-auto mt-24">
      <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params && context.params.slug;

  const post = await axios
    .get(
      `https://ghost-demo.webdevfuel.com/ghost/api/v4/content/posts/slug/${slug}`,
      {
        params: {
          key: process.env.GHOST_CONTENT_API_KEY,
        },
      }
    )
    .then((res) => res.data.posts[0]);

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await axios
    .get<{ posts: Post[] }>(
      "https://ghost-demo.webdevfuel.com/ghost/api/v4/content/posts",
      {
        params: {
          key: process.env.GHOST_CONTENT_API_KEY,
        },
      }
    )
    .then((res) => res.data.posts);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
