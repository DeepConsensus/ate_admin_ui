import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";

import { SettingsRoutingModule } from "./settings-routing.module";

import * as comp from "./index";

const COMP = [
  comp.SettingsComponent,
  comp.AccountComponent,
  comp.NotificationsComponent,
  comp.PlanBillingComponent,
  comp.SecurityComponent,
  comp.TeamComponent,
];

@NgModule({
  declarations: [...COMP],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
  ],
})
export class SettingsModule {}
