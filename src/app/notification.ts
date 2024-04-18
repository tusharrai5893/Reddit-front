import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000,
    position: {
      x: 'center',
      y: 'bottom',
    },
    ripple: true,
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning',
        },
      },
      {
        type: 'error',
        background: 'indianred',
        dismissible: false,
      },
    ],
    
  });
}
