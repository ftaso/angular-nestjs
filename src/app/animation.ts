import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => login', []),
        transition('login => *', []),
        transition('* => *', [
            style({ position: 'relative' }),
            query(':enter, :leave',
                [
                    style({
                        position: 'absolute',
                        top: 0,
                        opacity: 0,
                        right: '0%',
                        width: '100%',
                    }),
                ],
                { optional: true }),
            query(':enter',
                [
                    style({ right: '-100%' })
                ],
                { optional: true }),
            group([
                query(':enter',
                    [
                        animate('600ms ease-out', style({
                            right: '0%',
                            opacity: 1,
                        }))
                    ],
                    { optional: true }),
            ]),
        ])
    ]);
