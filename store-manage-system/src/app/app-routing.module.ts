import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadStrategyService } from './utils/services/preload-strategy.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      /* tslint:disable */
      import('./auth/auth.module').then((m) => m.AuthModule),
    /* tslint:enable */
    data: {
      preload: true,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
