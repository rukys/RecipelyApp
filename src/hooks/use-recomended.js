/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import useRecipeCategory from './use-recipe-category';
import {fetchApi} from '../api/fetch-api';

export default function useRecomended() {
  const [arrayRecomended, setArrayRecomended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = 'https://resep-hari-ini.vercel.app/';
  const apiRecipesByCategory = (category = '') =>
    `${baseURL}api/category/recipes/${category}`;

  const {resultRecipeCategory} = useRecipeCategory();

  const getDataRecomended = () => {
    resultRecipeCategory.forEach(element => {
      fetchApi({url: apiRecipesByCategory(element?.key)}).then(response => {
        setArrayRecomended(oldArray => [...oldArray, response?.results[0]]);
      });
    });
  };

  const keys = arrayRecomended.map(({key}) => key);
  const filtered = arrayRecomended.filter(
    ({key}, index) => !keys.includes(key, index + 1),
  );

  const resultRecomended = filtered;

  useEffect(() => {
    getDataRecomended();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => getDataRecomended();
  }, []);

  return {resultRecomended, isLoading};
}
