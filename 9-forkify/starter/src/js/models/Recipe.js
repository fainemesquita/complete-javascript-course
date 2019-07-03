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
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings(){
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

    const newIngredients = this.ingredients.map(el => {
      // 1 uniform arrays ( units as they appear vs as we want to display)
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // 2 remove parentheses (RegEx)
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3  parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); //check if the element is part of the elements array

      let objIng;
      if (unitIndex > -1) {
        //there's a unit from the array
        // ex 4 1/2 cups is [4, 1/2] --> eval(4+1/2)
        // ex 4 cups is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };

      } else if (parseInt(arrIng[0], 10)) {
        // there's no unit from the array but the first element is a number (1 bread)
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ') //ingredient is the string resultant of the array minus the first element (quantity)
        }
      } else if (unitIndex === -1) {
        //there's no number and no unit
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }

      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}