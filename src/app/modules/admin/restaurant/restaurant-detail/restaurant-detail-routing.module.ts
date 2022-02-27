import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RestaurantDetailComponent } from "./index";
const routes: Routes = [
  {
    path: "",
    component: RestaurantDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantDetailRoutingModule {}
