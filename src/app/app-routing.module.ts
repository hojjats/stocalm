import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'advanced-search', loadChildren: './advanced-search/advanced-search.module#AdvancedSearchPageModule' },
  { path: 'contact', loadChildren: './settings/contact/contact.module#ContactPageModule' },
  { path: 'location-view/:lat/:lng', loadChildren: './home/location-view/location-view.module#LocationViewPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
