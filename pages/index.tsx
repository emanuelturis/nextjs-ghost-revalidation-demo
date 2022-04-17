import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

type Post = {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  comment_id: string;
  feature_image: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
};

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Demo</title>
        <meta name="description" content="Ghost NextJS Revalidation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-screen-lg mx-auto mt-24">
          <h1 className="text-5xl text-gray-900 font-bold">Posts</h1>
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            eros sem, semper vitae molestie sed, mattis at risus. Suspendisse
            vitae convallis arcu, at laoreet felis. Fusce in nunc et sapien
            tincidunt aliquam. Curabitur ornare blandit dolor ut commodo. Donec
            sollicitudin quam leo, vitae ullamcorper dolor condimentum sit amet.
          </p>
          <div className="grid grid-cols-2 gap-5 mt-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-100 rounded-md px-7 py-4 shadow-sm flex flex-col items-start"
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="line-clamp-3 mt-2 mb-8 text-gray-700">
                  {post.excerpt}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-auto">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await axios.get(
    "https://ghost-demo.webdevfuel.com/ghost/api/v4/content/posts",
    {
      params: {
        key: process.env.GHOST_CONTENT_API_KEY,
      },
    }
  );

  return {
    props: {
      posts: posts.data.posts,
    },
  };
};

export default Home;
