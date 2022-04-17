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
  console.log(posts);

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Demo</title>
        <meta name="description" content="Ghost NextJS Revalidation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
