import {useQuery} from 'react-query';
import {getRecipeSearch} from '../api/root-api';

export default function useRecipeSearch(keyword) {
  const queryRecipeSearch = useQuery(
    ['get-recipe-search', {keyword: keyword}],
    getRecipeSearch,
    {
      enabled: !!keyword,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultRecipeSearch = queryRecipeSearch?.data?.results || [];

  const isLoadingRecipeSearch = queryRecipeSearch.isLoading;

  const onRefetchRecipeSearch = () => {
    queryRecipeSearch.refetch();
  };

  return {
    resultRecipeSearch,
    isLoadingRecipeSearch,
    onRefetchRecipeSearch,
  };
}
