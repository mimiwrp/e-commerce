import React from "react";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ products, product }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

//this is the function to pre render the page at build time using the props returned
export const getStaticProps = async ({ params: { slug } }) => {
  //form sanity query *[] meaning grab all the products
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`; //[0]because only want to fetch the product that match this query
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
