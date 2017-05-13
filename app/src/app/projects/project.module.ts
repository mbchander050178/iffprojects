import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProjectData }  from './project-data';
import { FormulaData }  from './formulas/formula-data';
import { ProjectListComponent } from './project-list.component';
import { FormulaListComponent } from './formulas/formula-list.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectEditComponent } from './project-edit.component';
import { ProjectFilterPipe } from './project-filter.pipe';
import { ProjectService } from './project.service';
import { FormulaService } from './formulas/formula.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    //InMemoryWebApiModule.forRoot(ProjectData),
    //InMemoryWebApiModule.forRoot(FormulaData),
    RouterModule.forChild([
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects:id', component: ProjectDetailComponent },
      { path: 'projects/edit/:id', component: ProjectEditComponent },
      { path: 'formulas', component: FormulaListComponent }
    ])
  ],
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectFilterPipe,
    FormulaListComponent
  ],
  providers: [
    ProjectService,
    FormulaService
  ]
})
export class ProjectModule {}
