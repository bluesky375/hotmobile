import { NgModule } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu';
import { PopoverComponent } from './popover/popover';
import { MainHeaderComponent } from './main-header/main-header';
import { UserActionPopoverComponent } from './user-action-popover/user-action-popover';
import { RequirementPopoverComponent } from './requirement-popover/requirement-popover';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { CloseReqPopoverComponent } from './close-req-popover/close-req-popover';
import { SubvendorPopoverComponent } from './subvendor-popover/subvendor-popover';
import { ClientPopoverComponent } from './client-popover/client-popover';
import { CandidateSidePopoverComponent } from './candidate-side-popover/candidate-side-popover';


@NgModule({
	declarations: [SideMenuComponent,
	UserActionPopoverComponent,
	PopoverComponent,
	MainHeaderComponent,
    RequirementPopoverComponent,
    ProgressBarComponent,
    ProgressBarComponent,
    CloseReqPopoverComponent,
    SubvendorPopoverComponent,
    ClientPopoverComponent,
    CandidateSidePopoverComponent],
	imports: [],
	exports: [SideMenuComponent,
    UserActionPopoverComponent,
	PopoverComponent,
	MainHeaderComponent,
    RequirementPopoverComponent,
    ProgressBarComponent,
    ProgressBarComponent,
    CloseReqPopoverComponent,
    SubvendorPopoverComponent,
    ClientPopoverComponent,
    CandidateSidePopoverComponent]
})
export class ComponentsModule {}
