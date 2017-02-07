import {Component, OnInit, OnDestroy, Input, HostBinding,
    trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';

import {Carousel, Direction} from  './carousel.component';

@Component({
    selector: 'slide',
    template: `
    <div [class.active]="active"  class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class Slide implements OnInit, OnDestroy {
    @Input('index') public index:number;
    @Input('direction') public direction:Direction;

    @HostBinding('class.active')
    @Input('active') public active:boolean;
    @Input('state') public state:string;
    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    private addClass:boolean = true;

    constructor(private carousel:Carousel) {
     
    }


    public ngOnInit() {
        this.carousel.addSlide(this);
           console.log(this.index)
        console.log(this.active);
    }

    public ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
}
