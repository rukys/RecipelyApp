import {useQuery} from 'react-query';
import {getNewRecipes} from '../api/root-api';
// import {userStore} from '../stores';

export default function useNewRecipes() {
  // const getUser = userStore(state => state.user);
  // const isAuthenticated = getUser !== {};

  const queryNewRecipes = useQuery(['get-new-recipes'], getNewRecipes, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const resultNewRecipes = queryNewRecipes?.data?.results || [];

  const isLoadingNewRecipes = queryNewRecipes.isLoading;

  const onRefetchNewRecipes = () => {
    queryNewRecipes.refetch();
  };

  return {resultNewRecipes, isLoadingNewRecipes, onRefetchNewRecipes};
}
