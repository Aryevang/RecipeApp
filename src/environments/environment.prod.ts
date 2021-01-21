export const environment = {
  production:    true,
  baseURL:       baseURL(),
  recipeURL:     baseURL() + 'recipes.json',
  authSignUpURL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key",
  authLoginURL:  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key"
};

function baseURL(){
	return "https://ng-recipe-training-default-rtdb.firebaseio.com/" 
}
