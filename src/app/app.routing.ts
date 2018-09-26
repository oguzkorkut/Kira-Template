import {Routes} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import { AuthGuard } from './service/auth-guard.service';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'userlogin' , pathMatch: 'full' },
  { path: 'userlogin', loadChildren: './pages/user-login/user-login.module#UserLoginModule' },
  { path: 'logout', loadChildren: './pages/user-logout/user-logout.module#UserLogoutModule' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default', 
        pathMatch: 'full'
      }, 
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'customer-operations',
        loadChildren: './pages/customer/customer.module#CustomerModule'
      },
      {
        path: 'tenant-operations',
        loadChildren: './pages/tenant/tenant.module#TenantModule'
      },
      {
        path: 'rental-operations',
        loadChildren: './pages/rental/rental.module#RentalModule'
      }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

/*

const routes: Routes = [
  { path: '', redirectTo: 'userlogin' , pathMatch: 'full' },
  { path: 'userlogin', loadChildren: './pages/user-login/user-login.module#UserLoginModule' },
  { path: 'logout', loadChildren: './pages/user-logout/user-logout.module#UserLogoutModule' },
  { path: 'user' , loadChildren: './pages/layout/kiralayout.module#KiraLayoutModule', canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
*/