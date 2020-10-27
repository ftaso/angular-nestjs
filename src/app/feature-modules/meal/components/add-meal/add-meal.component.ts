import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Meal } from '../../services/meal-http-handler.service';
import { MealStoreService } from '../../store/meal-store.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
  animations: [openCloseAnimation]
})
export class AddMealComponent implements OnInit {

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

  remark = '';
  careReceiver = '';

  mealTypeList = ['昼食', '夕食'];

  proportionList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  constructor(
    private storeService: MealStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.careReceiver = this.data.record.careReceiver.str_careReceiver;
    this.putData.id_record = this.data.record.id_record;
    this.putData.id_fillOutStaff = this.data.id;
  }

  public async post(): Promise<any> {
    const error = await this.storeService.post(this.putData);
    if (error) {

    }
    this.data.click('post');
    this.isOpen = false;
  }

  close(): void {
    this.isOpen = false;
  }

  // ダイアログ内部でのボタン操作
  selectMeal(meal): void {
    this.putData.str_mealType = meal;
  }

  selectMainProportion(proportion: number): void {
    this.putData.num_mainProportion = proportion;
  }

  selectSubProportion(proportion: number): void {
    this.putData.num_subProportion = proportion;
  }

}
