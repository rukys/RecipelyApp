import {useQuery} from 'react-query';
import {getArticleDetail} from '../api/root-api';

export default function useArticleDetail(params) {
  const replaceKey = params.replace(/\s+/g, '-').toLowerCase();
  const queryArticleDetail = useQuery(
    ['get-article-detail', {key: replaceKey}],
    getArticleDetail,
    {
      enabled: !!replaceKey,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultArticleDetail = queryArticleDetail?.data?.results || [];

  const isLoadingArticleDetail = queryArticleDetail.isLoading;

  const onRefetchArticleDetail = () => {
    queryArticleDetail.refetch();
  };

  return {
    resultArticleDetail,
    isLoadingArticleDetail,
    onRefetchArticleDetail,
  };
}
