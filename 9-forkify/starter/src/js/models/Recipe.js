import axios from 'axios';
import { key, proxy } from '../config';


export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      console.log(res);
    } catch(error){
      console.log(error);
      alert('something went wrong :(');
    }
  }

  calcTime() {
    //for every 3 ingredients, add 1 period of 15 min
    const numIng = this.ingredients.lenght;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings(){
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup(s)', 'pound(s)' ]

    const newIngredients = this.ingredients.map( el => {
      // 1 uniform arrays ( units as they appear vs as we want to display)
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // 2 remove parentheses (RegEx)
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // parse ingredients into count, unit and ingredient

      return ingredient;
    });
    this.ingredients = newIngredients;
  }
}