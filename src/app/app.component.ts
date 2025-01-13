import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app',standalone: false, templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser!: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      debugger;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
      console.log('logout');
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
