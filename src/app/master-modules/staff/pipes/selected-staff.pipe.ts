import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedStaff'
})
export class SelectedStaffPipe implements PipeTransform {

  // 指定したstaffIdのデータのみ抽出
  transform(list: any[], staffId: number): any {
    return list.find(a => a.id_staff === staffId);
  }

}
