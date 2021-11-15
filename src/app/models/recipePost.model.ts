import { FormGroup } from "@angular/forms";

export class RecipePost {
    constructor(
        public email: string,
        public uid: string,
        public recipeForm: FormGroup,
        public id?: string
    ) {

    }
}







// "-Mmw0WfLFIWbem1V7UQ5" : {
//   "email" : "dd@dd.dd",
//   "recipeForm" : {
//     "ingredients" : [ {
//       "amount" : 232323,
//       "ingredient" : "rwerewrew",
//       "units" : "er"
//     } ],
//     "recipeName" : "fdsdfsd",
//     "recipeText" : "sdfsdsdfsdf"
//   },
//   "uid" : "DIG37WKpdcWyodpiuQPdeS6Ys3J2"
// },


// "-Mmw1-H5_o-qQF-xFeNY" : {
//   "email" : "dd@dd.dd",
//   "recipeForm" : {
//     "ingredients" : [ {
//       "amount" : 2,
//       "ingredient" : "Kiausiniai",
//       "units" : "vnt"
//     } ],
//     "recipeName" : "Virti kiausiniai",
//     "recipeText" : "Isvirti kiausinius 7min"
//   },
//   "uid" : "DIG37WKpdcWyodpiuQPdeS6Ys3J2"
// },


// "-Mmw2p8iz4AZWPSbkgAh" : {
//   "email" : "dd@dd.dd",
//   "recipeForm" : {
//     "ingredients" : [ {
//       "amount" : 43,
//       "ingredient" : "werwerewr",
//       "units" : "werwerwwer"
//     } ],
//     "recipeName" : "sdfsdf",
//     "recipeText" : "sdfsdfsdf"
//   },
//   "uid" : "DIG37WKpdcWyodpiuQPdeS6Ys3J2"
// }
