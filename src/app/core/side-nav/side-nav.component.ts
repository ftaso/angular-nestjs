import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SessionService } from '../../store/session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('sideNavInOut', [
      state('in', style({
        width: 190
      })),
      state('out', style({
        width: 0
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class SideNavComponent implements OnInit {

  // 表示するナビゲーション
  sideNavList = [
    {
      // マスターは権限によって表示・非表示を切り替えるため
      listCategory: 'マスター',
      navigationList: [
        { pageTitle: 'スタッフ', path: 'staff', icon: 'person', constrain: 'admin' },
        { pageTitle: '利用者', path: 'care-receiver', icon: 'elderly', constrain: 'admin' },
        // { pageTitle: 'サービスタグ', path: 'service-tag', icon: 'library_books', constrain: 'develop' },
        { pageTitle: 'サービスタグ', path: 'service-detail', icon: 'library_books', constrain: 'develop' },
      ],
    },
    {
      listCategory: 'ミーティング',
      navigationList: [
        { pageTitle: '終了ミーティング', path: 'closing-meeting', icon: 'group' },
        { pageTitle: 'スケジュール', path: 'day-schedule', icon: 'schedule' },
      ],
    },
    {
      listCategory: '記録入力',
      navigationList: [
        { pageTitle: '出席', path: 'attendance', icon: 'person_add' },
        { pageTitle: '水分補給', path: 'hydration', icon: 'local_drink' },
        { pageTitle: 'バイタル', path: 'vital', icon: 'tag_faces' },
        { pageTitle: '食事', path: 'meal', icon: 'restaurant' },
        { pageTitle: '排泄', path: 'excretion', icon: 'wc' },
        { pageTitle: 'サービス提供記録', path: 'service-sheet', icon: 'account_circle' },
      ],
    },
    {
      listCategory: '印刷',
      navigationList: [
        { pageTitle: 'サービス提供表', path: 'print-service-sheet', icon: 'account_circle' },
      ],
    },
  ];
  // 最初のページのパス
  selectedPath = '/attendance';
  sideNav = 'in';

  // マスターの表示・非表示を切り替えるための役割
  state = this.sessionService.loginStaffState$;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    // 最初のページのパスを入れ込む
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        this.selectedPath = e.url;
      }
    });
  }

  ngOnInit(): void { }

  // ルーティング
  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.selectedPath = e.url;
      }
    });
  }

  // サイドバーの表示・非表示
  toggle(): void {
    this.sideNav = this.sideNav === 'out' ? 'in' : 'out';
  }
}

