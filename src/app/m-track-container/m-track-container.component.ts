import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { SalesOrderData } from '../data-models/sales-order-data';
import {MenuItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

declare var $: any;

@Component({
  selector: 'mtrack-container',
  templateUrl: './m-track-container.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./m-track-container.component.scss']
})
export class MobileTrackContainerComponent implements OnInit {
private items: MenuItem[];
msgs: Message[] = [];
activeIndex: string = 'C';
private dummyData:number[] = [1,2,3,4,5,6,7,8,9,10];
private containerNumber : string ='';
private salesOrderData: SalesOrderData = new SalesOrderData();
private salesOrderNo: number = -1;
private containerArray: any[] = [];
// Drag And Drop


  constructor(){
	console.log("Inside MobileTrackContainersComponent");

        this.containerNumber = sessionStorage.getItem('containerNumber'); // name is the key
        console.log("$$$$$$$containerNumber",this.containerNumber);
        WebSocketService.getInstance().salesOrderDataBehaviorSubject.subscribe(data => this.showSalesOrderData(data));

        //Drag And Drop
  }

  ngOnInit() {
  }

  

      showSalesOrderData(data){
        console.log("MobileTrackContainerComponent: showSalesOrderData()", data);
        if (data == null || data == "" || data == undefined) {
            console.log("*************: ", this.containerArray);
            this.salesOrderData = new SalesOrderData();

        } else {
            this.salesOrderData = data;
            this.containerArray = this.salesOrderData.containers;
            console.log("*************: ", this.containerArray);
        }
    }
}
