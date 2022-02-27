import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public columns: string[] = [
    "slno",
    "name",
    "category",
    "restaurants",
    "calories",
    "price",
    "status",
    "action",
  ];
  public dataSource: any[] = [
    {
      slno: 1,
      name: "CAPRICIOUS",
      category: "Ordinary Pizza",
      restaurants: "Italian Cusine",
      calories: 5.55,
      price: 10,
      status: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
