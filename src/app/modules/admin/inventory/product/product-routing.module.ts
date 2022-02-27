import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import * as comp from "./index";

const routes: Routes = [
  {
    path: "",
    component: comp.ProductComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: comp.ListComponent,
      },
      {
        path: "create",
        component: comp.CreateComponent,
      },
      {
        path: "update/:id",
        component: comp.CreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
