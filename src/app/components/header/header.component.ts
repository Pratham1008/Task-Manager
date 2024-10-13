import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected name : string | null | undefined;

  private auth = inject(AuthenticationService);

  ngOnInit() {
    const email = localStorage.getItem('username');
    if(email != null){
      this.auth.getUser(email).subscribe(data => {
        localStorage.setItem('name', data.name);
        this.name = localStorage.getItem('name');
      })
    }
  }

  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    this.auth.deleteCookie();
    window.location.reload();
  }

}
