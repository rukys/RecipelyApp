import {useQuery} from 'react-query';
import {getRecipesByCategory} from '../api/root-api';
// import {userStore} from '../stores';

export default function useRecipeByCategory(params = '') {
  // const getUser = userStore(state => state.user);
  // const isAuthenticated = getUser !== {};

  const replaceCategory = params.replace(/\s+/g, '-').toLowerCase();
  const queryRecipeByCategory = useQuery(
    ['get-recipe-by-category', {category: replaceCategory}],
    getRecipesByCategory,
    {
      enabled: !!replaceCategory,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultRecipeByCategory = queryRecipeByCategory?.data?.results || [];

  const isLoadingRecipeByCategory = queryRecipeByCategory.isLoading;

  const onRefetchRecipeByCategory = () => {
    queryRecipeByCategory.refetch();
  };

  return {
    resultRecipeByCategory,
    isLoadingRecipeByCategory,
    onRefetchRecipeByCategory,
  };
}
