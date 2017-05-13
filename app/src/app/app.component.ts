/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AppState } from './app.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,  
})
export class AppComponent implements OnInit {
  public pageTitle: string = 'Project Management';
  public loading: boolean = true;

  constructor(
    public appState: AppState,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
     router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }

    public displayMessages(): void {
        // Example of primary and secondary routing together
        // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
        // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
        this.router.navigate([{outlets: { popup: ['messages']}}]); // Works
        this.messageService.isDisplayed = true;
    }

    public hideMessages(): void {
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }

    public logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
    }
}
