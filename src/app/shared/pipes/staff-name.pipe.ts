import { Pipe, PipeTransform } from '@angular/core';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';

@Pipe({
  name: 'staffName'
})
export class StaffNamePipe implements PipeTransform {

  constructor(
    private staffStoreService: StaffStoreService
  ) { }

  transform(staffId: number): string {
    if (!staffId) {
      return '';
    }
    return this.staffStoreService.staticList.find(a => a.id_staff === staffId).str_staffName;
  }

}
