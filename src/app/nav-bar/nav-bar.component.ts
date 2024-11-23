import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isloggedIn: boolean = false;
  
  onLogOut(){
    localStorage.removeItem("LoginToken")
  }
}
