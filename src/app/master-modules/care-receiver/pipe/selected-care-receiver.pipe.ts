import { Pipe, PipeTransform } from '@angular/core';
import { CareReceiver } from '../services/care-receiver-http-handler.service';

@Pipe({
  name: 'selectedCareReceiver'
})
export class SelectedCareReceiverPipe implements PipeTransform {

  // 指定したcareReceiverIdのデータのみ抽出
  transform(list: CareReceiver[], careReceiverId: number): any {
    return list.find(a => a.id_careReceiver === careReceiverId);
  }

}
