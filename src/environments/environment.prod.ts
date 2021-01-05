export const environment = {
  production:    true,
  baseURL:       baseURL(),
  recipeURL:     baseURL() + 'recipes.json',
  authSignUpURL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmVqcZgARNVvNXixi1nmXMB5u89zi1_cQ",
  authLoginURL:  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmVqcZgARNVvNXixi1nmXMB5u89zi1_cQ"
};

function baseURL(){
	return "https://ng-recipe-training-default-rtdb.firebaseio.com/" 
}
