import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.css']
})
export class AccountVerifyComponent implements OnInit {
  verifcation_token?: string;
  verified?: boolean = true;
  responseMessage?: string;
  countering:string = '';
  btnlabelEnableAccount = 'Enable Account';
  accountVerifyState = "Account Not Verified";

  constructor(
    private router: Router,
      private route: ActivatedRoute, 
      private authService: AuthService
    ) {
 }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.verifcation_token = param.get('p')?.toString();
    });
  }
  
  verifyAccount() {
    const token = this.verifcation_token?.toString();
    if (token) {
      this.authService.verifyToken(token).subscribe((res) => 
        { 
          this.verified = false;
          this.accountVerifyState = "Account Verified";
          this.responseMessage = res;
          this.btnlabelEnableAccount = this.verified ? 'Enable Account': "Account Enabled";
         
        });
       
        let counter = 3;
        const interval = setInterval(() => {
          if (counter > 0) {
            this.countering = `Redirecting in ${counter--} seconds...`;
            
          } else {
            this.router.navigate(['/']);
            clearInterval(interval);
          }
          
        }, 1000);
    }
  }

}
