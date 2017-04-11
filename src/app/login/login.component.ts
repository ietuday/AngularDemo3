import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {Router} from '@angular/router';
import {WebSocketService} from '../services/web-socket.service';
import {CustomerData} from '../data-models/customer-data';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [WebSocketService]
})
export class LoginComponent implements OnInit {

  private displayMenu: boolean = false;
  private windowWidth: number;
  private customers: SelectItem[];
  private userName: string = '';
  private password: string = '';
  private selectCustomer: any = 'Customer Name';
  private selectCustomerObj: any = {customerId: "", customerName: "Customer Name", deptId:""};
  private loginStatus:string = "";
  private display :boolean=false;
  private displaySignInBtn :boolean=true;
  private mainLoginBlock = 'mainBlockBefore';


  constructor(private router: Router) {
    console.log("LoginComponent: constructor");
    this.windowWidth = window.innerWidth;

    window.addEventListener("resize", (e) => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 768) {
        this.displayMenu = false
      }
    });
    // this.focusLogin();
    // WebSocketService.getInstance().customerDataBehaviorSubject.subscribe(data => this.customerDataBehaviorSubjectSubscribe(data));
    WebSocketService.getInstance().loginBehaviorSubject.subscribe(data => this.loginBehaviorSubjectSubscribe(data));
  }


  focusLogin(){
    console.log("Inside FocusLogin**************");
    $('input').blur(function() {
      var $this = $(this);
      if ($this.val())
      $this.addClass('used');
      else
      $this.removeClass('used');
    });
    // var $input = $('.loginInput');
    // console.log("In focusLogin",$input);
    // $input.focusout(function() {
    //     console.log("Inside FocusLogin focusout()0000000000", $(this).val());
    //
    //     if($(this).val().length > 0) {
    //         console.log("Inside FocusLogin focusout() if: ", $(this).val().length);
    //         $(this).addClass('loginInput:focus ~ loginLabel');
    //         // $(this).next('.loginLabel').addClass('loginInput:focus ~ loginLabel');
    //     }
    //     else {
    //         console.log("Inside FocusLogin focusout() else", $(this).val().length);
    //         $(this).removeClass('loginInput:focus ~ loginLabel');
    //         // $(this).next('.loginLabel').removeClass('loginInput:focus ~ loginLabel');
    //
    //     }
    // });
  }

  ngOnInit() {
    this.focusLogin();
  }

  loginBehaviorSubjectSubscribe(data) {
    console.log("LoginComponent: loginBehaviorSubjectSubscribe: ", data);
    if (data === '') {
      console.log("Ignore");
    } else if (data === 'ERROR') {
//      alert("Login failed.");
      this.loginStatus = "Login failed.";
    } else {
      this.loginStatus = "Success.";
      sessionStorage.setItem("userName", this.userName);
//      sessionStorage.setItem("selectCustomer", this.selectCustomer);
//      let custId = parseInt(this.selectCustomer);
      // WebSocketService.getInstance().customerIdBehaviorSubject.next(this.selectCustomer);
      this.router.navigate(['/mcontainer']);
    }
  }
  toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  // customerDataBehaviorSubjectSubscribe(data) {
  //   console.log("LoginComponent: customerDataBehaviorSubjectSubscribe: ", data);
  //   this.customers = [];
  //   this.customers.push({ label: 'Select Customer', value: null });
  //   for (let i in data) {
  //     this.customers.push({ label: data[i].customerName, value: data[i].customerId });
  //   }
  // }

  login() {
    console.log("Login Data: UserName :",this.userName);
   if(this.userName != '' && this.password !='') {
     WebSocketService.getInstance().sendMessage({
       'action': 'login',
       'message': {
         "userName": this.userName,
         "password": this.password
       }
     });
   } else if (this.userName == ''||this.password== '' ){
     this.loginStatus = "Please enter Valid userName and Password";
   }
  }

  signUp() {
    console.log("Inside Signup");
    this.router.navigate(['/mcontainer']);
  }
}
