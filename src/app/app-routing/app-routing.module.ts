import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReadRecipesComponent } from '../recipes/read-recipes/read-recipes.component';
import { WriteRecipesComponent } from '../recipes/write-recipes/write-recipes.component';
import { AuthService } from '../services/auth.service';


const appRoutes: Routes = [

  {
    path: 'auth/:action',
    component: AuthComponent
  },
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'read-recipes',
    component: ReadRecipesComponent
  },
  {
    path: 'write-recipes', component: WriteRecipesComponent,
    canActivate: [AuthGuard]
  }

]



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
