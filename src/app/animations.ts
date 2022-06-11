import {
  trigger,
  animate,
  style,
  query as q,
  transition,
  AnimationMetadata,
} from '@angular/animations';
const query = (
  s: string,
  a: AnimationMetadata | AnimationMetadata[],
  o = { optional: true }
) => q(s, a, o);

export const fadeAnimation = trigger('routeAnimations', [
  transition('* => Login', []),
  transition('Login => *', []),
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.5s', style({ opacity: 0, position: 'absolute' })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);
