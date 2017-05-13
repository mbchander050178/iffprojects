import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProject } from './project';
import { ProjectService } from './project.service';

@Component({
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
    pageTitle: string = 'Project List';
    listFilter: string;
    errorMessage: string;

    projects: IProject[];

    constructor(private projectService: ProjectService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
       // this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';  
       this.listFilter = '';      
        this.projectService.getProjects()
                .subscribe(projects => this.projects = projects,
                           error => this.errorMessage = <any>error);
    }
}
