import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorModule } from '@/app/commons/auth-interceptor/auth-interceptor.module';
import { UserstoriesApiService } from './userstories-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AuthInterceptorModule,
  ],
  providers: [
    UserstoriesApiService,
  ],
})
export class UserstoriesApiModule { }
