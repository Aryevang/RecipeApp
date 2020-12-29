export const environment = {
  production: true,
  baseURL: baseURL(),
  recipeURL: baseURL() + 'recipes.json'
};

export function baseURL(){
	return "https://ng-recipe-training-default-rtdb.firebaseio.com/" 
}
