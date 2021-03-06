import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.AppUser$.pipe(map((appUser) => appUser!.isAdmin));
  }
}
