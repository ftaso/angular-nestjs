import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Meal } from '../../services/meal-http-handler.service';
import { MealStoreService } from '../../store/meal-store.service';

@Component({
  selector: 'app-meal-type',
  templateUrl: './meal-type.component.html',
  styleUrls: ['./meal-type.component.scss'],
  animations: [openCloseAnimation]
})
export class MealTypeComponent implements OnInit {

  @Input() data: any;

  mealTypeList = ['昼食', '夕食'];
  isOpen = false;
  selectedMeal = '';

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
    // 初期値の代入
    this.putData = JSON.parse(JSON.stringify(this.data.meal));
    this.putData.id_fillOutStaff = this.data.id;
  }


  public async put(mealType: string): Promise<any> {
    this.putData.str_mealType = mealType;
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
