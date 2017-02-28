import {
  Component, trigger,
  state,
  style,
  transition, keyframes,
  animate, OnInit, AfterViewInit, OnDestroy
} from '@angular/core';
import { Observable,Subscription } from 'rxjs';


export class Slide {

  index: number;
  image: string;
  text: string;
  title: string;
  active: boolean;
  state: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [

    trigger('slide1', [
      state('show', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1) translateX(0%)',
        opacity: 1
      })),
      state('right', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1) translateX(0%)',
        opacity: 0
      })),
      state('left', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1) translateX(0%)',
        opacity: 0
      })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(1000)
      ]),
      transition('show => right', [
        animate(1000, style({ transform: 'translateX(100%)', opacity: 0 }))
      ]),

      transition('show => left', [
        animate(1000, style({ transform: 'translateX(-100%)', opacity: 0 }))
      ]),

      transition('right => show', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(1000)
      ]),
      transition('left => show', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(1000)
      ]),



    ]),


    trigger('slideActiveWhite', [
      state('show', style({
        transform: 'scale(1) translateX(0%)',
        opacity: 1
      })),
      transition('* => show', [
        style({
          opacity: 0,
          transform: ' translateX(-100%) translateY(0)'
        }),
        animate('0.5s 1.5s ease-out')
      ]),
      transition('show => hide', animate('1000ms ease-out'))
    ]),
    trigger('slideActiveText', [
      state('show', style({

        transform: 'scale(1) translateX(0%) translateY(0%)',
        opacity: 1
      })),
      transition('* => show', [
        animate('0.3s 2s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: 0.8 }),
          style({ opacity: 1, transform: 'translateX(0) translateY(0%)', offset: 1.0 })
        ]))
      ]),
      transition('show => hide', animate('1000ms ease-out'))
    ]),
    trigger('slideActiveText2', [
      state('show', style({

        transform: 'scale(1) translateX(0%)',
        opacity: 1
      })),
      transition('* => show', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.1s 2.4s ease-in')
      ]),
      transition('show => hide', animate('1000ms ease-out'))
    ])
  ],

})



export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'app works!'; //The time to show the next photo
  private NextPhotoInterval: number = 4000;
  //Looping or not
  private noLoopSlides: boolean = true;
  //Photos
  private slides: Array<Slide> = [];
  private currentSlide: Slide;
  private _interval: number;
  private currentInterval: any;
  private isPlaying: boolean;
  private destroyed: boolean = false;
  private _index: number = 0;
  private leftDI: boolean = false;
  private rightDI: boolean = true;
  private pTimer: Observable<any>;
  private timerSups:Subscription;

  constructor() {
    this.addNewSlide();
    this.currentSlide = this.slides[0];
 


  }

  ngOnInit() {

  }

  ngAfterViewInit() {

   this.restartTimer();
  }
  nextSlideUser(direction: number) {

    this.restartTimer;
    this.nextSlide(direction);
  }


  nextSlide(direction: number) {
    console.log("dentro");

    this._index = this._index + 1;

    this.rightDI = true;
    this.leftDI = true;
    //if (this._index == 1 ){this.leftDI=false}
    if (this._index == 2) { this.rightDI = false }
    switch (this._index) {

      case 1:
        this.slides[0].state = 'right';

        this.slides[1].active = true;
        this.slides[1].state = 'show';

        break;
      case 2:

        if (direction == -1) {
          this.slides[0].state = 'show'
          this.slides[1].state = 'left'
          this._index = 0;
          this.leftDI = false;
          this.rightDI = true;
        }
        else {
          this.slides[1].state = 'right';
          this.slides[2].active = true;
          this.slides[2].state = 'show'
        }
        break;

      case 3:

        this.slides[1].state = 'show';
        this.slides[2].state = 'left'

        break;
      case 4:
        this.slides[0].state = 'show'
        this.slides[1].state = 'left'
        this._index = 0;
        this.leftDI = false;
        break;

      default:
        break;
    }




    console.log(this.slides[1].state);

  }


  private addNewSlide() {
    this.slides.push(
      { index: 1, image: 'assets/images/products-hero/tienda.jpg', title: 'Visita nuestra tienda!!', text: 'En Lope de Vega 15 te aconsejaremos cúal es el mejor tratamiento para tu piel', active: true, state: 'show' },
      { index: 2, image: 'assets/images/products-hero/san-valentin.jpg', title: 'Otra oportunidad..', text: 'Regala en San Valentín placer para los sentidos', active: false, state: 'hide' },
      { index: 3, image: 'assets/images/products-hero/homecampaign.jpg', title: 'Ofertas para evitar el frio ', text: 'En Febrero -20% en hidratación de cuerpo para combatir el frio', active: false, state: 'hide' },
    );
  }



  private restartTimer() {
   // if (this.pTimer) { this.pTimer = null; }
   
let p = Observable.timer(4000,4000);

//     this.timerSups= p.subscribe(x => {
//      console.log(x);
//      // this.nextSlide(1);
//  })
  }




  ngOnDestroy() {
    this.timerSups.unsubscribe;
  }





}