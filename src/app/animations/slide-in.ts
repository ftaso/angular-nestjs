import { trigger, transition, style, animate, query, group, state } from '@angular/animations';

export const slideInAnimation =
    trigger('dateChange', [
        state('*', style({transform: 'translateX(0)', opacity: 1})),
        state('left', style({opacity: 0})),
        state('right', style({opacity: 0})),
        transition('* => center', animate('0.8s 0s cubic-bezier(0.29, 0.06, 0.43, 0.92)')),
        state('center', style({'border-left': '0px solid #EEE', opacity: 1})),
    ]);
