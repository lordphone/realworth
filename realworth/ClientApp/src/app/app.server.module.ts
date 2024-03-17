import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';

@NgModule({
    imports: [ServerModule],
    bootstrap: [AppComponent],
    declarations: [
      NavigationBarComponent,
      ProfileDropdownComponent,
      SelectMenuComponent
    ]
})
export class AppServerModule { }

