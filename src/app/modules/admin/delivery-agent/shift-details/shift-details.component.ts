import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shift-details",
  templateUrl: "./shift-details.component.html",
  styleUrls: ["./shift-details.component.scss"],
})
export class ShiftDetailsComponent implements OnInit {
  public columns: string[] = [
    "slno",
    "customer",
    "deliveryperson",
    "restaurant",
    "address",
    "cost",
    "status",
    "orders",
  ];
  public dataSource: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
