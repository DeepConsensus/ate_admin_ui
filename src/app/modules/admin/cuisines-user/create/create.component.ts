import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DisputeManagerService } from "../dispute-manager.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit, OnDestroy {
  public params: any;
  public latitude: number = 0;
  public longitude: number = 0;
  public zoom: number = 15;
  public address: string;
  private geoCoder;
  createForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild("search")
  public searchElementRef: ElementRef;
  getItemDetails: any;
  constructor(
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _formBuilder: FormBuilder,
    private service: DisputeManagerService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.params = this.route.snapshot.params;
  }

  /**
   * On Init Method
   */
  ngOnInit(): void {
    this.createForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      address: ["", [Validators.required]],      
      latitude: ["10.3781379", [Validators.required]],
      longtitude: ["77.9665818", [Validators.required]],
      countrycode: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      deviceId: ["", [Validators.required]],
      deviceOS: ["", [Validators.required]],
      status: ["", [Validators.required]],
      image: [""],
    });

    this.mapsAPILoader.load().then(() => {
      if (!this.params?.id) {
        this.setCurrentLocation();
      }
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    if (this.params && this.params.id) {
      this.getItemById(this.params.id);
    }
  }

  /**
   * Set Current Location
   */
  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  /**
   * Marker Drag End
   * @param $event - Event
   */
  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  /**
   * Get Address by Lat & Lng
   * @param latitude - Latitude
   * @param longitude - Longitude
   */
  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  save(): void {
    if (this.params && this.params.id) {
      this.updateAgent();
    } else {
      this.saveAgent();
    }
  }

  saveAgent() {
    if (this.createForm.valid) {
        const saveData = {
          name: this.createForm.value.name,
          email: this.createForm.value.email,
          address: this.createForm.value.address,
          latitude: this.createForm.value.latitude,
          longtitude: this.createForm.value.longtitude,
          image: this.createForm.value.image,
          countrycode: this.createForm.value.countrycode,
          phone: this.createForm.value.phone,
          deviceId: this.createForm.value.deviceId,
          deviceOS: this.createForm.value.deviceOS,
          status: this.createForm.value.status,
        };
        this.service
          .create(saveData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Delivery Person has been created successfully.");
              this._router.navigate(["/delivery-people/list"]);
            }
          });
      
    }
  }

  updateAgent() {
    if (this.createForm.valid) {
      const saveData = {
        name: this.createForm.value.name,
        email: this.createForm.value.email,
        address: this.createForm.value.address,
        latitude: this.createForm.value.latitude,
        longtitude: this.createForm.value.longtitude,
        image: this.createForm.value.image,
        countrycode: this.createForm.value.countrycode,
        phone: this.createForm.value.phone,
        deviceId: this.createForm.value.deviceId,
        deviceOS: this.createForm.value.deviceOS,
        status: this.createForm.value.status,
      };
        this.service
          .update(saveData, this.params.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Delivery person has been updated successfully.");
              this._router.navigate(["/delivery-people/list"]);
            }
          });
     
    }
  }

  getItemById(id): void {
    try {
      this.service
        .getById(id)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.result.isSuccess) {
            this.getItemDetails = data.result.data;
            this.createForm.patchValue(this.getItemDetails);
            this.createForm.patchValue({
              status: String(this.getItemDetails.status),
            });
          } else {
            this.openSnackBar("Unable to get the data");
          }
        });
    } catch (error) {}
  }

  openSnackBar(message) {
    this._snackBar.open(message, "Splash", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
