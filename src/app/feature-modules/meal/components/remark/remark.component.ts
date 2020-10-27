import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Meal } from '../../services/meal-http-handler.service';
import { MealStoreService } from '../../store/meal-store.service';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss'],
  animations: [openCloseAnimation]
})
export class RemarkComponent implements OnInit {

  @Input() data: any;

  isOpen = false;

  putData: Meal = {
    id_meal: 0,
    id_record: 0,
    str_mealType: '',
    num_mainProportion: 10,
    num_subProportion: 10,
    str_remark: '',
    id_fillOutStaff: 0
  };

  constructor(
    private storeService: MealStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.putData = JSON.parse(JSON.stringify(this.data.meal));
    this.putData.id_fillOutStaff = this.data.id;
  }

  public async put(): Promise<any> {
    const error = await this.storeService.put(this.putData);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }

  close(): void {
    this.isOpen = false;
  }
}
