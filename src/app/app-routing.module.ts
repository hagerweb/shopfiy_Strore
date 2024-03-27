import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CatogriesComponent } from './catogries/catogries.component';
import { BrandComponent } from './brand/brand.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CatogryDetailsComponent } from './catogry-details/catogry-details.component';
import { BrandsDetailsComponent } from './brands-details/brands-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { WhisListComponent } from './whis-list/whis-list.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:"register" , component:RegisterComponent},
  {path:"login" , component:LoginComponent},
  {path:"home" , canActivate:[authGuard], component:HomeComponent},
  {path:"products" ,canActivate:[authGuard], component:ProductsComponent},
  {path:"catogries" ,canActivate:[authGuard], component:CatogriesComponent},
  {path:"brand" ,canActivate:[authGuard], component:BrandComponent}, 
  {path:"cart" ,canActivate:[authGuard], component:CartComponent},
  {path:"whislist" ,canActivate:[authGuard], component:WhisListComponent},
  {path:"prodcuttDetails/:productId" ,canActivate:[authGuard], component:ProductDetailsComponent},
  {path:"catogryDetails/:catogryId" ,canActivate:[authGuard], component:CatogryDetailsComponent},
  {path:"brandsDetails/:brandId" ,canActivate:[authGuard], component:BrandsDetailsComponent},
  {path:"checkout/:cartId" ,canActivate:[authGuard], component:CheckOutComponent},
  {path:"**" , component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  


 }
