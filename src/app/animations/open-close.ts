import { trigger, transition, style, animate, state } from '@angular/animations';

export const openCloseAnimation =
    trigger('openClose', [
        state('open', style({
            opacity: 1,
        })),
        state('closed', style({
            display: 'none',
            opacity: 0,
        })),
        transition('open => closed', [
            animate('0.05s')
        ]),
        transition('closed => open', [
            animate('0.2s')
        ]),
        transition('* => void', [
            animate('0.05s')
        ]),
        transition('void => *', [
            animate('0.2s')
        ]),
    ]);
