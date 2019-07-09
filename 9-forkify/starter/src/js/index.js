import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/SearchView';
import * as recipeView from './views/RecipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  //1 get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2 new search object and add to state
    state.search = new Search(query);
    // 3 perpare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4 search recipes

      await state.search.getResults();

      // 5 render results on UI
      searchView.renderResults(state.search.result);
      clearLoader();
    } catch (err) {
      alert('Something went wrong with the search');
      clearLoader();
    }
    
  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});



elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  }
});


/**
 * RECIPE CONTROLLER
 */

 const controlRecipe = async () => {
   //get ID from URL
   const id = window.location.hash.replace('#', '');
   console.log(id);

   if (id){
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    };
    // create new recipe object
    state.recipe = new Recipe(id);
    
      try {
        // get recipe data and parse ingredients

        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // calculare servigns and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
      } catch (err) {
        alert('Error loading recipe');
      }

    }
    
 }

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button is clicked
      if (state.recipe.servings > 1) {
          state.recipe.updateServings('dec');
          recipeView.updateServingsIngredients(state.recipe);
      }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
  } 
  console.log(state.recipe);

});

window.l = new List();