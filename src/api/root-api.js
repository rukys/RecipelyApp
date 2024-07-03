import Config from 'react-native-config';
import {fetchApi} from './fetch-api';

const baseURL = Config?.API_URL;

const apiNewRecipes = () => `${baseURL}api/recipes`;
const apiNewRecipesByPage = (page = '') => `${baseURL}api/recipes/${page}`;
const apiNewRecipesByLimit = (limit = '') =>
  `${baseURL}api/recipes-length/?limit=${limit}`;
const apiRecipesCategory = () => `${baseURL}api/category/recipes`;
const apiRecipesByCategory = (category = '') =>
  `${baseURL}api/category/recipes/${category}`;
const apiRecipeDetail = (key = '') => `${baseURL}api/recipe/${key}`;
const apiRecipeSearch = (keyword = '') => `${baseURL}api/search/?q=${keyword}`;
const apiArticleCategory = () => `${baseURL}api/category/article`;
const apiArticleByCategory = (category = '') =>
  `${baseURL}api/category/article/${category}`;
const apiNewArticle = () => `${baseURL}api/articles/new`;
const apiArticleDetail = (params = '') => `${baseURL}api/article/${params}`;

export const getNewRecipes = () => {
  return fetchApi({
    url: apiNewRecipes(),
  });
};

export const getNewRecipesByPage = ({queryKey}) => {
  const [, {page}] = queryKey;
  return fetchApi({
    url: apiNewRecipesByPage(page),
  });
};

export const getNewRecipesByLimit = ({queryKey}) => {
  const [, {limit}] = queryKey;
  return fetchApi({
    url: apiNewRecipesByLimit(limit),
  });
};

export const getRecipesCategory = () => {
  return fetchApi({
    url: apiRecipesCategory(),
  });
};

export const getRecipesByCategory = ({queryKey}) => {
  const [, {category}] = queryKey;
  return fetchApi({
    url: apiRecipesByCategory(category),
  });
};

export const getRecipeDetail = ({queryKey}) => {
  const [, {key}] = queryKey;
  return fetchApi({
    url: apiRecipeDetail(key),
  });
};

export const getRecipeSearch = ({queryKey}) => {
  const [, {keyword}] = queryKey;
  return fetchApi({
    url: apiRecipeSearch(keyword),
  });
};

export const getArticleCategory = () => {
  return fetchApi({
    url: apiArticleCategory(),
  });
};

export const getArticleByCategory = ({queryKey}) => {
  const [, {category}] = queryKey;
  return fetchApi({
    url: apiArticleByCategory(category),
  });
};

export const getNewArticle = () => {
  return fetchApi({
    url: apiNewArticle(),
  });
};

export const getArticleDetail = ({queryKey}) => {
  const [, {key}] = queryKey;
  return fetchApi({
    url: apiArticleDetail(key),
  });
};
