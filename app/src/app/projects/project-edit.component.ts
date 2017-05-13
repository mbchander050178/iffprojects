import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router, CanDeactivate  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProject } from './project';
import { ProjectService } from './project.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Project Edit';
    errorMessage: string;
    projectForm: FormGroup;

    project: IProject;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private projectService: ProjectService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            projectName: {
                required: 'Project name is required.',
                minlength: 'Project name must be at least three characters.',
                maxlength: 'Project name cannot exceed 50 characters.'
            },
            projectCode: {
                required: 'Project code is required.'
            },            
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.projectForm = this.fb.group({
            projectName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            projectCode: ['', Validators.required],
            category: '',
            projectOwner: ['', Validators.required],
            contributors: '',
            startDate: ['', Validators.required],
            completionDate: '',            
            description: '',
            status: ''
        });

        // Read the project Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProject(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.projectForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.projectForm);
        });
    }

   getProject(id: number): void {
        this.projectService.getProject(id)
            .subscribe(
                (project: IProject) => this.onProjectRetrieved(project),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProjectRetrieved(project: IProject): void {
        if (this.projectForm) {
            this.projectForm.reset();
        }
        this.project = project;

        if (this.project.projectId === 0) {
            this.pageTitle = 'Add Project';
        } else {
            this.pageTitle = `Edit Project: ${this.project.projectName}`;
        }

        // Update the data on the form
        this.projectForm.patchValue({
            projectName: this.project.projectName,
            projectCode: this.project.projectCode,
            projectOwner: this.project.projectOwner,
            category: this.project.category,           
            description: this.project.description,
            contributors: this.project.contributors,
            startDate: this.project.startDate,
            completionDate: this.project.completionDate,
            status: this.project.status
        });
    }

    deleteProject(): void {
        if (this.project.projectId === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the project: ${this.project.projectName}?`)) {
                this.projectService.deleteProject(this.project.projectId)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProject(): void {
        if (this.projectForm.dirty && this.projectForm.valid) {
            // Copy the form values over the project object values
            let p = Object.assign({}, this.project, this.projectForm.value);

            this.projectService.saveProject(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.projectForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.projectForm.reset();
        this.router.navigate(['/projects']);
    }
}
