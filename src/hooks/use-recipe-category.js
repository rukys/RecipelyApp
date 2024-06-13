import {useQuery} from 'react-query';
import {getRecipesCategory} from '../api/root-api';
// import {userStore} from '../stores';

export default function useRecipeCategory() {
  // const getUser = userStore(state => state.user);
  // const isAuthenticated = getUser !== {};

  const queryRecipeCategory = useQuery(
    ['get-recipe-category'],
    getRecipesCategory,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultRecipeCategory = queryRecipeCategory?.data?.results || [];

  const isLoadingRecipeCategory = queryRecipeCategory.isLoading;

  const onRefetchRecipeCategory = () => {
    queryRecipeCategory.refetch();
  };

  return {
    resultRecipeCategory,
    isLoadingRecipeCategory,
    onRefetchRecipeCategory,
  };
}
