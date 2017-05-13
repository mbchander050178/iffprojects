import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IFormula } from './formula';

@Injectable()
export class FormulaService {
    private baseUrl = 'api/formulas';

    constructor(private http: Http) { }

    public getFormulas(): Observable<IFormula[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getFormulas: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public getFormula(id: number): Observable<IFormula> {
        if (id === 0) {
            return Observable.of(this.initializeProject());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getFormula: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public deleteFormula(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteFormula: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    public saveFormula(formula: IFormula): Observable<IFormula> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (formula.id === 0) {
            return this.createFormula(formula, options);
        }
        return this.updateFormula(formula, options);
    }

    private createFormula(formula: IFormula, options: RequestOptions): Observable<IFormula> {
        formula.id = undefined;
        return this.http.post(this.baseUrl, formula, options)
            .map(this.extractData)
            .do(data => console.log('createFormula: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateFormula(formula: IFormula, options: RequestOptions): Observable<IFormula> {
        const url = `${this.baseUrl}/${formula.id}`;
        return this.http.put(url, formula, options)
            .map(() => formula)
            .do(data => console.log('createFormula: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

   public initializeProject(): IFormula {
        // Return an initialized object
        return {
            id: 0,
            projectId: null,
            formulaCode: null,
            description: null,
            ipcNumber: null,
            creator: null,
            contributors: null,  
            status: null,
            targetMarkets: null,
            endUses: null,
            ingredients: []
        };
    }
}


