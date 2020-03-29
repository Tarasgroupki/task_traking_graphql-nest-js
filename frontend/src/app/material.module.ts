import { NgModule } from '@angular/core';
import { MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
   imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatExpansionModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatPaginatorModule, MatIconModule, MatBadgeModule, MatDialogModule, MatButtonToggleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule, MatTabsModule],
   exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatExpansionModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatPaginatorModule, MatIconModule, MatBadgeModule, MatDialogModule, MatButtonToggleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule, MatTabsModule]
})

export class MaterialModule { }
