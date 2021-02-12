import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{ path:"", redirectTo:"/recipes", pathMatch:"full" },
	{ path:"recipes" , loadChildren: () => import("./recipes/recipes.module").then( m => m.RecipesModule)}, 								//This is the newer way to use lazyLoading. PreReq: Features splited in modules.
	{ path: "shoppinglist", loadChildren: ()=> import("./shopping-list/shopping-list.module").then(s => s.ShoppingListModule)}, 	//ShoppingListModule
	{ path: "auth", loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)} 												//AuthModule

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
