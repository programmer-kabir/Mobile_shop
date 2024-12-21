import React from "react";
import useProducts from "../../Utils/Hooks/useProducts";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Title from "../Title";

const FeatureProducts = () => {
  const [products] = useProducts();
  const selectProducts = products
    ?.filter((product) => product.stock)
    .slice(8, 13);
  console.log(selectProducts);
  return (
    <Container>
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        <Title title={'Feature Products'} subtitle={"Most Expensive Products Here"}/>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-7">
        {selectProducts?.map((product) => (
          <div className="group  relative block overflow-hidden border border-gray-100 rounded-md">
            <img
              src={product?.image}
              alt=""
              className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 "
            />

            <div className="relative border border-gray-100 bg-white p-4">
              <p className="text-gray-700">${product?.price}</p>

              <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                {product?.name}
              </h3>
              <h3 className="mt-1.5  text-gray-800">{product?.category}</h3>

              <h3 className="mt-1.5 text-base font-medium text-gray-900">
                Stock: {product?.stock}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-gray-700 mb-5">
                {product.description}
              </p>

              <Link to={`/product/detailsProduct/${product._id}`}>
                <button className="block w-full rounded bg-[#f50963] px-4 py-3  font-medium text-gray-50 transition hover:scale-105">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FeatureProducts;
