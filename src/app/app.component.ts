import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { FronteggAppService, FronteggAuthService, ContextHolder } from "@frontegg/angular";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgFor],
  standalone: true //comment out if you're not using a standalone app
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;
  currentTenantId?: string;

  constructor(private fronteggAuthService: FronteggAuthService, private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }

  ngOnInit(): void {
    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user;
      this.currentTenantId = user?.tenantId;
    })
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }

  showAdminPortal(): void {
    this.fronteggAppService?.showAdminPortal()
  }

  tenantSelectionChanged(value: string) : void {
    this.currentTenantId = value;
  }

  switchTenant(): void {
    // Use this.user.tenantIds to get the tenants the user is a member of
    if (this.currentTenantId) {
      this.fronteggAuthService.switchTenant({ tenantId: this.currentTenantId })
    }
  }

  logOut(): void {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
