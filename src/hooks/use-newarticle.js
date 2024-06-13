import {useQuery} from 'react-query';
import {getNewArticle} from '../api/root-api';
// import {userStore} from '../stores';

export default function useNewArticle() {
  // const getUser = userStore(state => state.user);
  // const isAuthenticated = getUser !== {};

  const queryNewArticle = useQuery(['get-article'], getNewArticle, {
    staleTime: Infinity,
    cacheTime: Infinity,
    // onSuccess: response => {
    //   console.log(response?.results);
    // },
  });
  const resultNewArticle = queryNewArticle?.data?.results || [];

  const isLoadingNewArticle = queryNewArticle.isLoading;

  const onRefetchNewArticle = () => {
    queryNewArticle.refetch();
  };

  return {resultNewArticle, isLoadingNewArticle, onRefetchNewArticle};
}
