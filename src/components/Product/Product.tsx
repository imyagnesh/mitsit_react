import Rating from 'components/Rating';
import React, { memo } from 'react';
import { LoadingStateType } from 'reducers/loadingReducer';

export type ProductStoreProps = {
  addCartLoader: LoadingStateType | undefined;
  updateCartLoader: LoadingStateType | undefined;
  deleteCartLoader: LoadingStateType | undefined;
  cartItem: CartType | undefined;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateToCart: (cartItem: CartType) => Promise<void>;
  deleteItem: (cartItem: CartType) => Promise<void>;
};

export type ProductProps = {
  product: ProductType;
} & ProductStoreProps;

const Product = ({
  product,
  addToCart,
  addCartLoader,
  updateCartLoader,
  cartItem,
  updateToCart,
  deleteItem,
  deleteCartLoader,
}: ProductProps) => (
  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-3">
      <img
        src={product.image}
        alt={product.title}
        className="object-center object-cover"
      />
    </div>
    <div className="sm:col-span-8 lg:col-span-7">
      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
        {product.title}
      </h2>

      <section aria-labelledby="information-heading" className="mt-2">
        <h3 id="information-heading" className="sr-only">
          Product information
        </h3>

        <p className="text-2xl text-gray-900">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(1000000)}
        </p>

        {/* Reviews */}
        <Rating rating={product.rating} />
      </section>

      <section aria-labelledby="options-heading" className="mt-10">
        <h3 id="options-heading">{product.description}</h3>

        {cartItem ? (
          <div className="flex items-center mt-6 ">
            <button
              type="button"
              disabled={!!updateCartLoader}
              onClick={() =>
                updateToCart({ ...cartItem, quantity: cartItem.quantity + 1 })
              }
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
            >
              +
            </button>
            <p className="px-4 font-bold text-2xl">{cartItem.quantity}</p>
            <button
              type="button"
              disabled={
                cartItem.quantity > 1 ? !!updateCartLoader : !!deleteCartLoader
              }
              onClick={() => {
                if (cartItem.quantity > 1) {
                  updateToCart({
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                  });
                } else {
                  deleteItem(cartItem);
                }
              }}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
            >
              -
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={!!addCartLoader}
            onClick={() => addToCart(product.id, 1)}
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
          >
            Add to bag
          </button>
        )}
      </section>
    </div>
  </div>
);

export default memo(Product);
