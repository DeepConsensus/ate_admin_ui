import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestaurantDetailRoutingModule } from "./restaurant-detail-routing.module";

import { RestaurantDetailComponent } from "./index";

import { AgmCoreModule } from "@agm/core";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [RestaurantDetailComponent],
  imports: [
    CommonModule,
    RestaurantDetailRoutingModule,
    AgmCoreModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class RestaurantDetailModule {}
