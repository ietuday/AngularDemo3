import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { SalesOrderData } from '../data-models/sales-order-data';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'mcontainers',
  templateUrl: './m-containers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./m-containers.component.scss']
})
export class MobileContainersComponent implements OnInit {
    private enableSearchOption : boolean = false;
      display: boolean = false;
    private menuClassTop = 'slideoutHideTop';
    private menuClassBottom = 'slideoutHideBottom';
    onItemSelected: EventEmitter<string>;
    private dummyArray:number[] = [1,2,3,4,5,6,7,8,9,10];

    private salesOrderData: SalesOrderData = new SalesOrderData();
    private salesOrderNo: number = -1;
   private queryTypes: {
        'queryType': string,
        'queryTypeDesc': string
    }[] = [];
    private containerArray: any[] = [];
    private selectedQueryTypeIndex: number = 0;
    private queryTypeDesc: string = "Ref No";     // Currentlt works with salesOrderNo, bl, customer. These fields are not in SalesOrder: invoiceNo, shipperRef. consigneeRef, purchaseOrderNo
    private queryType: string = "salesOrderNo";     // Currentlt works with salesOrderNo, bl, customer. These fields are not in SalesOrder: invoiceNo, shipperRef. consigneeRef, purchaseOrderNo
    private queryValue: string = "1124";    // 1079
    private containerNumber : string = '';
  constructor(private router: Router){
        console.log("Inside MobileContainersComponent:constructor");
     WebSocketService.getInstance().salesOrderDataBehaviorSubject.subscribe(data => this.showSalesOrderData(data));
     WebSocketService.getInstance().salesOrderNumbersBehaviorSubject.subscribe(data => this.salesOrderNumber(data));

  }

  ngOnInit() {


  }

    getSalesOrderData() {
        console.log("MobileContainersComponent: getSalesOrder()", this.queryType, this.queryValue);
        console.log("MobileContainersComponent: getSalesOrder():this.queryType", this.queryType);
        console.log("MobileContainersComponent: getSalesOrder():this.queryValue",this.queryValue);

        let query: any = {};
        query[this.queryType] = isNaN(Number(this.queryValue)) ? this.queryValue : parseInt(this.queryValue);
        console.log("@@@@@@@@",query);
        WebSocketService.getInstance().sendMessage({
            'action': 'getSalesOrder',
            'message': query
        });
    }

    showSalesOrderData(data){
        console.log("MobileContainersComponent: showSalesOrderData()", data);
        if (data == null || data == "" || data == undefined) {
            console.log("*************: ", this.containerArray);
            this.salesOrderData = new SalesOrderData();

        } else {
            this.salesOrderData = data;
            this.containerArray = this.salesOrderData.containers;
            console.log("*************: ", this.containerArray);
        }
    }
    salesOrderNumber(data){
        console.log("MobileContainersComponent: salesOrderNumber()", data);

    }

    trackContainer(i){
        console.log("MobileContainersComponent:trackContainer ",this.containerArray[i]);
        this.containerNumber = this.containerArray[i].containerNO ;
        console.log("#######containerNumber",this.containerNumber);
        sessionStorage.setItem("containerNumber", this.containerNumber);
        this.router.navigate(['/mtrack-container']);
    }

    containerSearch(){
        console.log("MobileContainersComponent:containerSearch",this.enableSearchOption);
        this.enableSearchOption = true;

          // this.menuClassTop = this.menuClassTop == 'slideoutHideTop' ? 'slideoutShowTop' : 'slideoutHideTop';
          // this.menuClassBottom = this.menuClassBottom == 'slideoutHideBottom' ? 'slideoutShowBottom' : 'slideoutHideBottom';
    }

    cancelSearch(){
        console.log("MobileContainersComponent:cancelSearch",this.enableSearchOption);
        this.enableSearchOption = false;
    }

    showDialog() {
    this.display = true;
  }
}
