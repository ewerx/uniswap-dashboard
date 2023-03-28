import Head from "next/head";
import Dashboard from "@/components/Dashboard";

// export async function getServerSideProps() {
//   console.log("getServerSideProps");
//   const { data } = await client.query<PoolsQuery>({
//     query: PoolsDocument,
//     variables: {
//       first: 3,
//     },
//   });

//   console.log(data.pools);

//   return {
//     props: {
//       pools: data.pools,
//     },
//   };
// }

export default function Home() {
  return (
    <>
      <Head>
        <title>Uniswap Dashboard</title>
        <meta name="description" content="A Uniswap V3 dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
