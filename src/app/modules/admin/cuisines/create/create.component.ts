import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef, 
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
import { CuisinesService } from "../cuisines.service";

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
  createForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild("search")
  public searchElementRef: ElementRef;
  getItemDetails: any;
  constructor(
    private route: ActivatedRoute,  
    private _formBuilder: FormBuilder,
    private service: CuisinesService,
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
      image: [""],
    });

    

    if (this.params && this.params.id) {
      this.getItemById(this.params.id);
    }
  }

  

  save(): void {
    if (this.params && this.params.id) {
      this.updateCuisines();
    } else {
      this.saveCuisines();
    }
  }

  saveCuisines() {
    if (this.createForm.valid) {
        const saveData = {
          name: this.createForm.value.name,
          image: this.createForm.value.image
        };
        this.service
          .create(saveData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Cuisines has been created successfully.");
              this._router.navigate(["/inventory/cuisines/list"]);
            }
          });
      
    }
  }

  updateCuisines() {
    if (this.createForm.valid) {
      const saveData = {
        name: this.createForm.value.name,
        image: this.createForm.value.image
      };
        this.service
          .update(saveData, this.params.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Cuisines has been updated successfully.");
              this._router.navigate(["/inventory/cuisines/list"]);
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
