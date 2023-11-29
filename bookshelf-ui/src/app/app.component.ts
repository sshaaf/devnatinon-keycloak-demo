import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private readonly keycloak: KeycloakService
  ) {}

  public hasAdminRole: boolean = false;
  message?: string;
  author?: string;

  ngOnInit(): void {
    this.hasAdminRole = this.keycloak.getUserRoles().includes('admin');
  }

  public async logout() {
    this.keycloak.logout();
  }

  title = 'bookshelf-ui';




}
