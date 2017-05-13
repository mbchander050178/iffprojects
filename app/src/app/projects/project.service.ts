import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProject } from './project';

@Injectable()
export class ProjectService {
    //private baseUrl = 'api/projects';
    private baseUrl = 'http://localhost:3000/api/projects';

    constructor(private http: Http) { }

    public getProjects(): Observable<IProject[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getProjects: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public getProject(id: number): Observable<IProject> {
        if (id === 0) {
            return Observable.of(this.initializeProject());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public deleteProject(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public saveProject(project: IProject): Observable<IProject> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (project.projectId === 0) {
            return this.createProject(project, options);
        }
        return this.updateProject(project, options);
    }

    private createProject(project: IProject, options: RequestOptions): Observable<IProject> {
        project.projectId = undefined;
        return this.http.post(this.baseUrl, project, options)
            .map(this.extractData)
            .do(data => console.log('createProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProject(project: IProject, options: RequestOptions): Observable<IProject> {
        const url = `${this.baseUrl}/edit/${project.projectId}`;
        return this.http.put(url, project, options)
            .map(() => project)
            .do(data => console.log('updateProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

   public initializeProject(): IProject {
        // Return an initialized object
        return {
            projectId: 0,
            projectName: null,
            projectCode: null,
            category: null,
            projectOwner: null,
            contributors: null,           
            startDate: null,
            completionDate: null,
            description: null,
            status: null
        };
    }
}
