import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { RecipePost } from 'src/app/models/recipePost.model';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-read-recipes',
  templateUrl: './read-recipes.component.html',
  styleUrls: ['./read-recipes.component.css']
})
export class ReadRecipesComponent implements OnInit {

  // private userSubscribtion: Subscription;

  public loggedIn = this.authService.user;
  public currentEmail = this.authService.user.email;
  //public adminEmail = "d.zajenckauskas@gmail.com"
  //pw: chefdanielius
  public adminLoggedIn: boolean;

  // public user: User = null;


  // imgSrc: string = 'https://www.onceuponachef.com/images/2017/10/How-To-Soft-Boil-An-Egg-760x527.jpg';
  public recipes: RecipePost[];
  constructor(private recipesService: RecipesService, private navigationService: NavigationService, private authService: AuthService) { }

  ngOnInit(): void {

    this.adminLoggedIn = this.authService.isAdmin;

    //if (this.currentEmail == this.adminEmail) {
    //  this.adminLoggedIn = true;
    //}
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    })

  }

  // onc() {


  //   console.log("WTF", this.authService.user);
  //   console.log("LOGGED IN", this.loggedIn);
  // }

  onDeleteRecipe(id: string) {

    console.log(id);

    this.recipesService.deleteRecipe(id).subscribe((response) => {

      this.ngOnInit();
    })

  }

}



