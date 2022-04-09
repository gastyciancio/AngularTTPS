import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {UsersService} from "../users/user.service";

@Injectable({
    providedIn: 'root'
  })
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private userService: UsersService, private router: Router) { }

    canActivate() {
        
        if (!this.userService.isLogged()) {
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }
}