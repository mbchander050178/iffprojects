import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IFormula } from './formula';

export class FormulaData implements InMemoryDbService {

    createDb() {
        let formulas: IFormula[] = [
            {
                'id': 1,
                'projectId': 1,
                'formulaCode': 'IFF-Mtl-0001',
                'description': 'Raw Jasmine extract for fragrances.',
                'ipcNumber': null,
                'creator': '',
                'contributors': '',                
                'status': 'Active',
                'targetMarkets': '',
                'endUses':'',
                'ingredients': [
                    {
                        'id': 1,
                        'materialVolume': '5%',
                        'specifications': 'preheat conditions',
                        'comments':'test IPC'
                    }
                ]
            },
            {
                'id': 2,
                'projectId': 1,
                'formulaCode': 'IFF-Mtl-0002',
                'description': 'Raw Jasmine extract for fragrances.',
                'ipcNumber': null,
                'creator': '',
                'contributors': '',                
                'status': 'Active',
                'targetMarkets': '',
                'endUses':'',
                'ingredients': [
                    {
                        'id': 1,
                        'materialVolume': '5%',
                        'specifications': 'preheat conditions',
                        'comments':'test IPC'
                    }
                ]
            },
            {
                'id': 3,
                'projectId': 1,
                'formulaCode': 'IFF-Mtl-0003',
                'description': 'Raw Jasmine extract for fragrances.',
                'ipcNumber': null,
                'creator': '',
                'contributors': '',                
                'status': 'Active',
                'targetMarkets': '',
                'endUses':'',
                'ingredients': [
                    {
                        'id': 1,
                        'materialVolume': '5%',
                        'specifications': 'preheat conditions',
                        'comments':'test IPC'
                    }
                ]
            },
            {
                'id': 4,
                'projectId': 1,
                'formulaCode': 'IFF-Mtl-0004',
                'description': 'Raw Jasmine extract for fragrances.',
                'ipcNumber': null,
                'creator': '',
                'contributors': '',                
                'status': 'Active',
                'targetMarkets': '',
                'endUses':'',
                'ingredients': [
                    {
                        'id': 1,
                        'materialVolume': '5%',
                        'specifications': 'preheat conditions',
                        'comments':'test IPC'
                    }
                ]
            },
            {
                'id': 5,
                'projectId': 1,
                'formulaCode': 'IFF-Mtl-0005',
                'description': 'Raw Jasmine extract for fragrances.',
                'ipcNumber': null,
                'creator': '',
                'contributors': '',                
                'status': 'Active',
                'targetMarkets': '',
                'endUses':'',
                'ingredients': [
                    {
                        'id': 1,
                        'materialVolume': '5%',
                        'specifications': 'preheat conditions',
                        'comments':'test IPC'
                    }
                ]
            }
        ];
        return { formulas };
    }
}
