import {useQuery} from 'react-query';
import {getRecipeDetail} from '../api/root-api';

export default function useRecipeDetail(params) {
  const replaceKey = params.replace(/\s+/g, '-').toLowerCase();
  const queryRecipeDetail = useQuery(
    ['get-recipe-detail', {key: replaceKey}],
    getRecipeDetail,
    {
      enabled: !!replaceKey,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultRecipeDetail = queryRecipeDetail?.data?.results || [];

  const isLoadingRecipeDetail = queryRecipeDetail.isLoading;

  const onRefetchRecipeDetail = () => {
    queryRecipeDetail.refetch();
  };

  return {
    resultRecipeDetail,
    isLoadingRecipeDetail,
    onRefetchRecipeDetail,
  };
}
