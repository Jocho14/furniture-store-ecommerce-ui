import { BACKEND_URL } from "@/config/config";
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/products?id=1,2,3,4,5,6`); // TODO: Change this to fetch all products
  return response.data;
};

export const getProductDetails = async (id: number) => {
  const response = await axios.get(
    `${BACKEND_URL}/products/${id}/details/client`
  );
  return response.data;
};

export const getMasonryContent = async (id: number) => {
  console.log(process.env.VITE_BACKEND_URL);
  const response = await axios.get(`${BACKEND_URL}/categories/${id}/masonry`);
  return response.data;
};

export const getHorizontalTilesContent = async (id: number) => {
  const response = await axios.get(
    `${BACKEND_URL}/categories/${id}/horizontal-tiles`
  );
  return response.data;
};

export const getHorizontalListContent = async (id: number) => {
  const response = await axios.get(
    `${BACKEND_URL}/products/${id}/horizontal-list`
  );
  return response.data;
};

export const getReviews = async (id: number) => {
  const response = await axios.get(`${BACKEND_URL}/products/${id}/reviews`);
  return response.data;
};

export const addReview = async (
  id: number,
  rating: number,
  comment: string
) => {
  const response = await axios.post(
    `${BACKEND_URL}/products/${id}/add-review`,
    {
      rating,
      comment,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const addToFavorites = async (id: number) => {
  const response = await axios.post(
    `${BACKEND_URL}/clients-favourites-products/${id}/add`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const removeFromFavorites = async (id: number) => {
  const response = await axios.post(
    `${BACKEND_URL}/clients-favourites-products/${id}/remove`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const checkFavourite = async (id: number) => {
  const response = await axios.get(
    `${BACKEND_URL}/clients-favourites-products/${id}/check`,
    {
      withCredentials: true,
    }
  );

  return response.data.isFavourite;
};

export const getAllFavourites = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/clients-favourites-products/all`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
