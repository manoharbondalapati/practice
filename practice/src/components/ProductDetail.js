// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductById } from '../redux/ProductsSlice';
// import { addToCart } from '../redux/CartSlice';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.products.find((p) => p.id === parseInt(productId)));
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);

//   useEffect(() => {
//     if (!product) {
//       dispatch(fetchProductById(productId));
//     }
//   }, [productId, dispatch, product]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div>
//       <h1>{product.title}</h1>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetail;


import React from 'react'

const ProductDetail = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProductDetail
