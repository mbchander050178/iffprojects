import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProject } from './project';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectResolver implements Resolve<IProject> {

    constructor(private projectService: ProjectService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<IProject> {
        let id = route.params['id'];
        // let id = route.paramMap.get('id');
        if (isNaN(+id)) {
            console.log(`Project id was not a number: ${id}`);
            this.router.navigate(['/projects']);
            return Observable.of(null);
        }
        return this.projectService.getProject(+id)
            .map(project => {
                if (project) {
                    return project;
                }
                console.log(`Project was not found: ${id}`);
                this.router.navigate(['/projects']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/projects']);
                return Observable.of(null);
            });
    }
}
