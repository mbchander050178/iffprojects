import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormula } from './formula';
import { FormulaService } from './formula.service';

@Component({
    templateUrl: './formula-list.component.html',    
})
export class FormulaListComponent  {
    pageTitle: string = 'Project List';
    listFilter: string;
    errorMessage: string;
    formulas: IFormula[];
    constructor(private formulaService: FormulaService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
       // this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';  
       this.listFilter = '';      
        this.formulaService.getFormulas()
                .subscribe(formulas => this.formulas = formulas,
                           error => this.errorMessage = <any>error);
    }

    
}
