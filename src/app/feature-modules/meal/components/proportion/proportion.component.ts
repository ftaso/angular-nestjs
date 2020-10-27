import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Meal } from '../../services/meal-http-handler.service';
import { MealStoreService } from '../../store/meal-store.service';

@Component({
  selector: 'app-proportion',
  templateUrl: './proportion.component.html',
  styleUrls: ['./proportion.component.scss'],
  animations: [openCloseAnimation]
})
export class ProportionComponent implements OnInit {

  @Input() data: any;

  proportionList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  type: 'main' | 'sub';

  constructor(
    private storeService: MealStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.type = this.data.type;
    // 初期値の代入
    this.putData = JSON.parse(JSON.stringify(this.data.meal));
    this.putData.id_fillOutStaff = this.data.id;
  }


  public async put(proportion: number): Promise<any> {
    if (this.type === 'main') {
      this.putData.num_mainProportion = proportion;
    } else {
      this.putData.num_subProportion = proportion;
    }
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

