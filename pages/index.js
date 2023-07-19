import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      {/* parsing the prop heroBanner data which is array of banner  */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Various vitamins for your health</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

//this is the function to fetch data in NextJs that similar to ReactJs >>> create useEffect on line 7:
export const getServerSideProps = async () => {
  //form sanity query *[] meaning grab all the products
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  //whenever getServerSideProps return, it will get pop up in HeroBanner
  return {
    props: { products, bannerData },
  };
};

export default Home;
