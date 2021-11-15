import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RecipePost } from '../models/recipePost.model';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeForm: FormGroup;
  status = "";
  myForm: FormGroup;
  loading = false;
  success = false;
  constructor(private authService: AuthService, private http: HttpClient, private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.recipeForm = this.fb.group({
      recipeName: ['', [
        Validators.required
      ]],
      recipeText: ['', [
        Validators.required
      ]],

      recipePrepTime: ['', [
        Validators.required
      ]],
      recipeCookTime: ['', [
        Validators.required
      ]],
      recipeImg: ['', [
        Validators.required
      ]],
      postDate: [''],
      ingredients: this.fb.array([])
    })

    this.recipeForm.statusChanges.subscribe((status) => {
      this.status = status;
    })
  }




  getRecipes() {
    return this.http.get<{ [key: string]: RecipePost }>("https://recipebook-e4caa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
      .pipe(map((responseData) => {
        const recipes: RecipePost[] = [];
        for (const key in responseData) {
          recipes.push({ ...responseData[key], id: key })
        }
        console.log(recipes);

        return recipes;
      }))
  }

  postRecipe(recipeForm: FormGroup) {
    const recipe = new RecipePost(this.authService.user.email, this.authService.user.id, recipeForm);

    return this.http.post<{ name: string }>("https://recipebook-e4caa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json", recipe,
      {
        params: new HttpParams().set('auth', this.authService.user.token)
      }
    );

  }

  deleteRecipe(id: string) {

    return this.http.delete("https://recipebook-e4caa-default-rtdb.europe-west1.firebasedatabase.app/recipes/" + id + ".json",
      {
        params: new HttpParams().set('auth', this.authService.user.token)
      }
    );
  }
}
