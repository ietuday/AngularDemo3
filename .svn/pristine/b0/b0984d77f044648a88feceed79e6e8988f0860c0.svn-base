import {Component} from '@angular/core';
import {WebSocketService} from './services/web-socket.service';
import {AuthService} from './services/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WebSocketService]
})
export class AppComponent {
    title = 'app works!';
    displayMenu: boolean = false;
    private windowWidth: number;
    private windowHeight: number;

    private headerLogin: boolean = true;
    private userName: any;
    private menuClassLeft = 'slideoutHideLeft';
    private menuClassRight = 'slideoutHideRight';
    private pageNames: SelectItem[];
    private routerUrl: string = "/";
    private pageName: string = "";
    private enabFooter:boolean = false;

    constructor(private authService: AuthService, private router: Router) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        console.log("windowWidth,windowHeight",this.windowWidth,this.windowHeight);

        window.addEventListener("resize", (e) => {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth >= 768) {
                this.displayMenu = false
            }
        });

        if(this.windowHeight == 667){
            console.log("######Inside Iphone6 Height")
            this.enableFooter();
        }

        authService.auth();
        WebSocketService.getInstance().uuidBehaviorSubject.subscribe(uuid => {
            WebSocketService.getInstance().connect(uuid);
        });

        router.events.subscribe(x => {
            if (x instanceof NavigationEnd) {
                console.log(x.url);
                console.log(x.urlAfterRedirects);
                this.routerUrl = x.url
                this.setPageName();
                console.log(x.url);
                console.log(x.urlAfterRedirects);
                if (x.urlAfterRedirects == "/" || x.urlAfterRedirects == "/login") {
                    this.headerLogin = true;
                    this.userName = 'User name';
                } else {
                    if (sessionStorage.getItem("userName") === null) {
                        this.headerLogin = false;
                        this.userName = 'User name';
                        // this.router.navigate(['/login']);
                    } else {
                        this.headerLogin = false;
                        this.userName = sessionStorage.getItem("userName");
                    }
                }
            }
        });
        console.log("sessionStorage.getItem", sessionStorage.getItem("userName"));
        // Get master data like Countries, Currencies, etc
        this.getMasterData();
    }

    getMasterData() {
        WebSocketService.getInstance().sendMessage({
            'action': 'getCustomers'
        });
        WebSocketService.getInstance().sendMessage({
            'action': 'getCurrencies'
        });
        WebSocketService.getInstance().sendMessage({
            'action': 'getNCParties'
        });
        WebSocketService.getInstance().sendMessage({
            'action': 'getJobTypes'
        });
        WebSocketService.getInstance().sendMessage({
            'action': 'getVendors'
        });
        WebSocketService.getInstance().sendMessage({
            'action': 'getContainerTypes'
        });
    }

    toggleMenu() {
        this.displayMenu = !this.displayMenu;
    }

    logout() {
        console.log("Inside logout");
        WebSocketService.getInstance().loginBehaviorSubject.next('');
//        WebSocketService.getInstance().customerIdBehaviorSubject.next({ customerId: "", customerName: "", deptId: "" });
        //        sessionStorage.setItem("selectCustomer", '');
        sessionStorage.setItem("userName", '');
        sessionStorage.clear();
        WebSocketService.getInstance().resetBehaviorSubject();
        this.headerLogin = true;
        this.router.navigate(['/login']);

        //         window.location.reload(true);
    }

    toggleSideMenu() {
        console.log('inside toggleMenu');
        this.menuClassLeft = this.menuClassLeft == 'slideoutHideLeft' ? 'slideoutShowLeft' : 'slideoutHideLeft';
        this.menuClassRight = this.menuClassRight == 'slideoutHideRight' ? 'slideoutShowRight' : 'slideoutHideRight';
    }

    enableFooter(){
        this.enabFooter = true;
    }

    setPageName() {
    switch (this.routerUrl) {
        case '/':
            this.pageName = "login";
            break;
        case '/mcontainers':
                this.pageName = "login";
                break;

      default:
            this.pageName = this.routerUrl;

    }
}

}
