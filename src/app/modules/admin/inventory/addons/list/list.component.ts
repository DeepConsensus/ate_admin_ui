import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public columns: string[] = ["slno", "name", "price", "status", "action"];
  public dataSource: any[] = [
    {
      slno: 1,
      name: "Basil",
      price: 10,
      status: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
