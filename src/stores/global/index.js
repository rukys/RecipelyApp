import {create} from 'zustand';

const globalStore = create(set => ({
  loading: false,
  setLoading: data => {
    set({loading: data});
  },

  visible: false,
  setVisible: data => {
    set({visible: data});
  },

  listNewRecipe: [],
  setListNewRecipe: data => {
    set({listNewRecipe: data});
  },

  listRecipeCategory: [],
  setListRecipeCategory: data => {
    set({listRecipeCategory: data});
  },

  listRecipeByCategory: [],
  setListRecipeByCategory: data => {
    set({listRecipeByCategory: data});
  },

  listNewArticle: [],
  setListNewArticle: data => {
    set({listNewArticle: data});
  },

  listRecipeSearch: [],
  setListRecipeSearch: data => {
    set({listRecipeSearch: data});
  },

  listRecomended: [],
  setListRecomended: data => {
    set({listRecomended: data});
  },

  listFavorite: [],
  setListFavorite: data => {
    set({listFavorite: data});
  },
}));

export default globalStore;
