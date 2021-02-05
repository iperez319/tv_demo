import Head from 'next/head'
import {Button, ButtonBase, Container, Typography} from "@material-ui/core";
import Image from 'next/image';
import axios from 'axios';
import PosterList from "../components/PosterList";

export async function getStaticProps(context){
    const base = 'https://api.themoviedb.org/3';
    const popularPromise = axios.get(base + "/tv/popular", {params: {api_key: process.env.API_KEY}})
    const topRatedPromise = axios.get(base + "/tv/top_rated", {params: {api_key: process.env.API_KEY}})
    const trendingPromise = axios.get(base + '/trending/tv/day', {params: {api_key: process.env.API_KEY}})
    const [popularShows, topRatedShows, trendingShows] = await Promise.all([popularPromise, topRatedPromise, trendingPromise]);
    return {
        props: {
            popularShows: popularShows?.data,
            topRatedShows: topRatedShows?.data,
            trendingShows: trendingShows?.data,
        },
        revalidate: 450,
    }
}

export default function Home(props) {
    const image_path = 'https://image.tmdb.org/t/p/w220_and_h330_face/'
    let popularShows = props?.popularShows?.results ?? [];
    let topRatedShows = props?.topRatedShows?.results ?? [];
    let trendingShows = props?.trendingShows?.results ?? [];
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container style={{padding: '10px'}}>
            <PosterList title={"Popular Shows"} shows={popularShows} />
            <PosterList title={"Trending Shows"} shows={trendingShows} />
            <PosterList title={'Top Rated Shows'} shows={topRatedShows} />
        </Container>
    </div>
  )
}
