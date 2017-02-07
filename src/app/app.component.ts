import { Component , trigger,
  state,
  style,
  transition,keyframes,
  animate} from '@angular/core';


export class Slide {

  index:number;
  image:string;
  text:string;
  title:string;
  active:boolean;
  state:string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
     animations: [
   
    trigger('slideActive', [
      state('show',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1) translateX(0%)',
        opacity:1
      })),
     transition('* => show', [
      style({
        opacity: 0,
        transform: 'scale(1) translateX(-100%)'
      }),
      animate('1s ease-in')
    ]),
      transition('show => hide', animate('1000ms ease-out'))
    ]),
        trigger('slideActiveWhite', [
      state('show',   style({
        transform: 'scale(1) translateX(0%)',
        opacity:1
      })),
     transition('* => show', [
      style({
        opacity: 0,
        transform: ' translateX(-100%) translateY(0)'
      }),
      animate('0.5s 1.5s ease-in')
    ]),
      transition('show => hide', animate('1000ms ease-out'))
    ]),
    trigger('slideActiveText', [
      state('show',   style({
       
        transform: 'scale(1) translateX(0%) translateY(0%)',
        opacity:1
      })),
    transition('* => show', [
      animate('0.3s 2s ease-in' , keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(25px)',  offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0) translateY(0%)',     offset: 1.0})
      ]))
    ]),
      transition('show => hide', animate('1000ms ease-out'))
    ]),
    trigger('slideActiveText2', [
      state('show',   style({
       
        transform: 'scale(1) translateX(0%)',
        opacity:1
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



export class AppComponent {
  title = 'app works!'; //The time to show the next photo
    private NextPhotoInterval:number = 4000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<Slide> = [];
    private currentSlide:Slide;
    private _interval:number;
    private currentInterval:any;
    private isPlaying:boolean;
    private destroyed:boolean = false;

    constructor() {
            this.addNewSlide();
            this.currentSlide=this.slides[0];
           this.setinterval(this.NextPhotoInterval);

    }

    private addNewSlide() {
         this.slides.push(
            {index:1,image:'assets/images/products-hero/tienda.jpg',title:'Visita nuestra tienda!!',text:'En Lope de Vega 15 te aconsejaremos cúal es el mejor tratamiento para tu piel',active:true,state:'show'},
            {index:2,image:'assets/images/products-hero/san-valentin.jpg',title:'Otra oportunidad..',text:'Regala en San Valentín placer para los sentidos',active:false,state:'hide'},
            {index:3,image:'assets/images/products-hero/homecampaign.jpg',title:'Ofertas para evitar el frio ',text:'En Febrero -20% en hidratación de cuerpo para combatir el frio',active:false,state:'hide'},
              );
    }
    setinterval(value:number) {
        this._interval = value;
        this.restartTimer();
    }
    

       private restartTimer() {
        this.resetTimer();
        console.log('restart');
        let interval = +this._interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = setInterval(() => {
                let nInterval = +this._interval;
                if (this.isPlaying && !isNaN(this._interval) && nInterval > 0 && this.slides.length) {
                    this.currentSlide.state='hide';
                    //this.next();
                } else {
                    //this.pause();
                }
            }, interval);
        }
    }

    //   public pause() {
    //     if (!this.noPause) {
    //         this.isPlaying = false;
    //         this.resetTimer();
    //     }
    // }
   
   private getCurrentIndex() {
        return !this.currentSlide ? 0 : this.currentSlide.index;
    }

    // private next() {
    //     let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    //     if (newIndex === 0 && this.noWrap) {
    //         this.pause();
    //         return;
    //     }

    //     return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
    // }

    // private prev() {
    //     let newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

    //     if (this.noWrap && newIndex === this.slides.length - 1) {
    //         this.pause();
    //         return;
    //     }

    //     return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
    // }
      private resetTimer() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    }



}