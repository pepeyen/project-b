import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from './index.component';

// Modules
import { AvatarModule } from '@components';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [NavbarComponent],
	imports: [AvatarModule, CommonModule, FormsBundle, MaterialBundle],
	providers: [],
	exports: [NavbarComponent],
})
export class NavbarModule {}