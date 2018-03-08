import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router, ActivatedRoute, RoutesRecognized, GuardsCheckEnd } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Constantes } from 'app/common/Constantes';
import { NotificationsService } from 'angular2-notifications';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';
import { ShowSigninPopupService } from 'app/services/show-signin-popup.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService,
    private showSigninPopupService: ShowSigninPopupService) { }

  private routeData;
  model: any = {};
  returnUrl: string;
  disabled: boolean;
  errorMessage: string;
  signinModal: NgbModalRef;
  signupModal: NgbModalRef;
  routerEventsSubscription: Subscription;
  showSigninPopupSubscription: Subscription;
  isCollapsed: boolean = true;
  @ViewChild('signinModal') signinModalTemplate: TemplateRef<any>;

  ngOnInit() {

    if (this.authService.returnUrl) {
      this.router.navigate([this.authService.returnUrl]);
    }

    this.routerEventsSubscription = this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
      if (data instanceof GuardsCheckEnd) {
        if (!data.shouldActivate) {
          this.errorMessage = 'Vous n\'avez pas accès à cette fonctionnalité, veuillez vous connecter avec un compte approprié';
          this.displaySigninPopup();
        }
      }
    });

    this.showSigninPopupSubscription = this.showSigninPopupService.showSigninPopupObservable$.subscribe(x => {
      this.openSignin(this.signinModalTemplate);
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
    this.showSigninPopupSubscription.unsubscribe();
  }

  displaySigninPopup() {
    setTimeout.bind(this)(this.openSignin(this.signinModalTemplate), 1);
  }

  get token() {
    return this.localStorageService.token;
  }

  get displayName() {
    return this.localStorageService.tokenPayload.displayName;
  }

  openSignup(content) {
    this.signupModal = this.modalService.open(content);

    this.signupModal.result.then((result) => {
      this.router.navigate([`/register/${result}`]);
    }, (reason) => {

    });
  }

  openSignin(content) {
    this.signinModal = this.modalService.open(content);

    this.signinModal.result.then((result) => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    }, (reason) => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    });
  }

  login() {
    this.disabled = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.signinModal.close();
        if (this.authService.returnUrl) {
          this.router.navigate([this.authService.returnUrl]);
          this.authService.returnUrl = null;
        }
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'authentification';
        this.disabled = false;
      });
  }

  redirectToPersonal() {
    let role = this.localStorageService.tokenPayload.roles[0].authority;

    switch (role) {
      case Constantes.ROLE_ACHETEUR:
        this.router.navigate(['/acheteur']);
        break;
      case Constantes.ROLE_ARCHITECTE:
        this.router.navigate(['/architecte']);
        break;
    }
  }

  logout() {
  
    this.authService.logout().subscribe(res => {
      this.redirectIfAuthRequired();
    }, err => {
      this.redirectIfAuthRequired();
    });
    
  }

  redirectIfAuthRequired() {
    if (this.routeData && this.routeData.authRequired) {
      this.authGuard.canActivate(
        this.route.snapshot,
        this.router.routerState.snapshot
      )
    }
  }
}

