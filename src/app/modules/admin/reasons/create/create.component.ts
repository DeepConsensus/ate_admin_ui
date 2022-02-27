import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReasonService } from '../reason.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { find } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
  getItemDetails: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private nbService: ReasonService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.params = this.route.snapshot.params;
    if (this.params && this.params.id) {
      this.getItemById(this.params.id);
    }
  }

  ngOnInit(): void {
    this.createForm = this._formBuilder.group({
      reason: ["", [Validators.required]],
    });   
  }

 

  save(): void {
    if (this.params && this.params.id) {
      this.updateReason();
    } else {
      this.saveReason();
    }
  }

  saveReason():void {
    if (this.createForm.valid) {    
        const saveData = {         
          reason: this.createForm.value.reason
        };
        this.nbService
          .create(saveData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Reason has been created successfully.");
              this._router.navigate(["/inventory/reasons/list"]);
            }
          });
      
    }
  }

  updateReason() {
    if (this.createForm.valid) {
     
        const saveData = {         
          reason: this.createForm.value.reason
        };
        this.nbService
          .update(saveData, this.params.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Reason has been updated successfully.");
              this._router.navigate(["/inventory/reasons/list"]);
            }
          });
      
    }
  }

  getItemById(id): void {
    try {
      this.nbService
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
