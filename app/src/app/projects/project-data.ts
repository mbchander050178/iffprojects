import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProject } from './project';

export class ProjectData implements InMemoryDbService {

    createDb() {
        let projects: IProject[] = [
            {
                'projectId': 1,
                'projectName': 'Jasmine Fragrances',
                'projectCode': 'IFF-0001',
                'category': 'Fragrances',
                'projectOwner': 'Michael',
                'description': 'Raw Jasmine extract for fragrances.',
                'contributors': '',
                'startDate':'March 19, 2017',
                'completionDate': 'December 19, 2017',
                'status': 'Active'
            },
            {
                'projectId': 2,
                'projectName': 'Citrus Fragrances',
                'projectCode': 'IFF-0002',
                'category': 'Fragrances',
                'projectOwner': 'Michael',
                'description': 'Raw Citrus extract for fragrances.',
                'contributors': '',
                'startDate':'March 19, 2017',
                'completionDate': 'December 19, 2017',
                'status': 'Active'
            },
            {
                'projectId': 3,
                'projectName': 'Wild Fragrances',
                'projectCode': 'IFF-0003',
                'category': 'Fragrances',
                'projectOwner': 'Michael',
                'description': 'Raw Wild extract for fragrances.',
                'contributors': '',
                'startDate':'March 19, 2017',
                'completionDate': 'December 19, 2017',
                'status': 'Active'
            },
            {
                'projectId': 4,
                'projectName': 'Sport Fragrances',
                'projectCode': 'IFF-0004',
                'category': 'Fragrances',
                'projectOwner': 'Michael',
                'description': 'Raw Sport extract for fragrances.',
                'contributors': '',
                'startDate':'March 19, 2017',
                'completionDate': 'December 19, 2017',
                'status': 'Active'
            },
            {
                'projectId': 1,
                'projectName': 'Moderate Fragrances',
                'projectCode': 'IFF-0006',
                'category': 'Fragrances',
                'projectOwner': 'Michael',
                'description': 'Raw Moderate extract for fragrances.',
                'contributors': '',
                'startDate':'March 19, 2017',
                'completionDate': 'December 19, 2017',
                'status': 'Active'
            }
        ];
        return { projects };
    }
}
