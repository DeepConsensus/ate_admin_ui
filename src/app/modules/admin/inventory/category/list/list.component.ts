import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public columns: string[] = ["slno", "name", "status", "action"];
  public dataSource: any[] = [
    {
      slno: 1,
      name: "Classic Pizza",
      status: true,
    },
    {
      slno: 2,
      name: "Gourmet Pizza",
      status: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
