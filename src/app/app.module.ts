import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExtraOptions, PreloadAllModules, RouterModule } from "@angular/router";

import { MatNativeDateModule } from "@angular/material/core";

import { MarkdownModule } from "ngx-markdown";
import { AgmCoreModule } from "@agm/core";

import { FuseModule } from "@fuse";
import { FuseConfigModule } from "@fuse/services/config";
import { FuseMockApiModule } from "@fuse/lib/mock-api";

import { CoreModule } from "app/core/core.module";
import { appConfig } from "app/core/config/app.config";
import { mockApiServices } from "app/mock-api";
import { LayoutModule } from "app/layout/layout.module";
import { AppComponent } from "app/app.component";
import { appRoutes } from "app/app.routing";

import {MatSnackBarModule} from "@angular/material/snack-bar";

//import { } from 'googlemaps';
//declare var google: any;

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: "enabled",
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    MatSnackBarModule,

    // Layout module of your application
    LayoutModule,

    // Material Root Modules
    MatNativeDateModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBlgWERFnVsbjrVYrWZtfaHJLSPFKYXRac",
    //  apiKey: "AIzaSyCVworWZVFH-Uc6V_RNd5HdBa1eeBu0Zbs",
      libraries: ["places"],
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
