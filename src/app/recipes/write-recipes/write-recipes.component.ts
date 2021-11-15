import { Component, OnInit } from '@angular/core';
import { FormArray, NgForm, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-write-recipes',
  templateUrl: './write-recipes.component.html',
  styleUrls: ['./write-recipes.component.css'],
  providers: [DatePipe],
})
export class WriteRecipesComponent implements OnInit {



  recipeForm: FormGroup;
  public postDate: any = new Date();





  constructor(private recipesService: RecipesService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.postDate = this.datePipe.transform(this.postDate, 'short');
  }

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
      postDate: this.postDate,
      ingredients: this.fb.array([])
    })

    // this.recipesService.postRecipe(this.recipeForm).subscribe((response) => {
    //   console.log(response);

    // })
  }
  get ingredientForms() {
    return this.recipeForm.get('ingredients') as FormArray
  }

  addIngredient() {

    const ingredient = this.fb.group({
      ingredient: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required
      ]],
      units: ['', [
        Validators.required
      ]],
    })

    this.ingredientForms.push(ingredient);
  }

  deleteIngredient(i) {
    this.ingredientForms.removeAt(i)
  }


  onPostRecipe(recipeForm: FormGroup) {

    console.log(recipeForm);

    this.recipesService.postRecipe(recipeForm.value).subscribe((response) => {
      console.log(response);
      recipeForm.reset();

    })
  }


  get recipeName() {
    return this.recipeForm.get('recipeName');
  }

  get recipeText() {
    return this.recipeForm.get('recipeText');
  }

  get recipePrepTime() {
    return this.recipeForm.get('recipePrepTime');
  }
  get recipeCookTime() {
    return this.recipeForm.get('recipeCookTime');
  }
  get ingredients() {
    return this.recipeForm.get('ingredients');
  }
  get recipeImg() {
    return this.recipeForm.get('recipeImg');
  }
}