import { Component } from '@angular/core';
import { Router, RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isloggedIn: boolean = false;
  private destorySubject = new Subject();

  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    authService.authStatus.pipe(takeUntil(this.destorySubject))
    .subscribe(result => {
      this.isloggedIn = result;
    })
  }

  onLogOut(){
    this.authService.logout();
    this.refreshRoute();
  }

  refreshRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
    });
  }
}
