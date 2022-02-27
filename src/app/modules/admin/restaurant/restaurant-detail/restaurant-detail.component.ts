import { FormControl, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { COMMA, ENTER, SPACE, TAB } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { expandCollapse } from "@fuse/animations/expand-collapse";

@Component({
  selector: "app-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html",
  styleUrls: ["./restaurant-detail.component.scss"],
  animations: [expandCollapse],
})
export class RestaurantDetailComponent implements OnInit {
  public separatorKeysCodes: number[] = [ENTER, COMMA, SPACE, TAB];

  public latitude: number = 0;
  public longitude: number = 0;
  public zoom: number = 15;
  public address: string;
  private geoCoder;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  public emailList: string[] = [];
  public phoneList: string[] = [];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  /**
   * On Init Method
   */
  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      if (!this.latitude || !this.longitude) {
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

  /**
   * Add Email Chip
   * @param event - Event
   * @returns
   */
  addEmailChip(event: MatChipInputEvent | any): void {
    const value = (
      (event.type !== "blur" ? event.value : event.target.value) || ""
    ).trim();

    if (value) {
      const emailControl = new FormControl(value, [Validators.email]);
      if (emailControl.invalid) {
        alert("Please enter valid email.");
        if (event.type === "blur") {
          event.target.value = null;
        }
        return;
      }

      this.emailList.push(value);
      event.input.value = null;
    }
  }

  /**
   * Remove Email Chip
   * @param index - Index
   */
  removeEmailChip(index: number): void {
    if (index >= 0) {
      this.emailList.splice(index, 1);
    }
  }

  /**
   * Add Phone Chip
   * @param event - Event
   * @returns
   */
  addPhoneChip(event: MatChipInputEvent | any): void {
    const value = (
      (event.type !== "blur" ? event.value : event.target.value) || ""
    ).trim();

    if (value) {
      const phoneControl = new FormControl(value, [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
      if (phoneControl.invalid) {
        alert("Please enter valid Phone.");
        if (event.type === "blur") {
          event.target.value = null;
        }
        return;
      }

      this.phoneList.push(value);
      event.input.value = null;
    }
  }

  /**
   * Remove Phone Chip
   * @param index - Index
   */
  removePhoneChip(index: number): void {
    if (index >= 0) {
      this.phoneList.splice(index, 1);
    }
  }
}
