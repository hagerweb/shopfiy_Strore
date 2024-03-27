import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { CatogriesComponent } from './catogries/catogries.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CuttextPipe } from './cuttext.pipe'
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchPipe } from './search.pipe';
import { CatogryDetailsComponent } from './catogry-details/catogry-details.component';
import { SearchcatPipe } from './searchcat.pipe';
import { BrandsDetailsComponent } from './brands-details/brands-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
  
} from '@costlydeveloper/ngx-awesome-popup';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoadingInterceptor } from './loading.interceptor';
import { WhisListComponent } from './whis-list/whis-list.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrandComponent,
    CatogriesComponent,
    ProductsComponent,
    CartComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    CuttextPipe,
    ProductDetailsComponent,
    SearchPipe,
    CatogryDetailsComponent,
    SearchcatPipe,
    BrandsDetailsComponent,
    CheckOutComponent,
    WhisListComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,BrowserAnimationsModule,RouterModule,CarouselModule, NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.4
    
    ,NgxSpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
