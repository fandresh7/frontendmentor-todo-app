import { TestBed } from '@angular/core/testing';

import { TodosLocalStorageService } from './todos-local-storage.service';

describe('TodosLocalStorageService', () => {
  let service: TodosLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
