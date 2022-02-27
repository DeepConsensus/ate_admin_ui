import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { ConfirmDialogComponent }  from './components/confirm-dialog/confirm-dialog.component';

import {CommonService} from 'app/shared/services/common.service';

@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        //ConfirmDialogComponent
    ],
    providers: [CommonService]
})
export class SharedModule
{
}
