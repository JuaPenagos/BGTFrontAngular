import { TestBed } from '@angular/core/testing';
import { MasterService } from '../services/master.service';
import { HttpClientModule } from '@angular/common/http';

describe('MasterService', () => {
  let service: MasterService;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule]});
    service = TestBed.inject(MasterService);
  });

  it('get deberia retornar informacion', (done: DoneFn) => {
    service.getActiveFunding().subscribe(value => {
    expect(value.activeFunding).toBeDefined();
    done();
    })});
  });

