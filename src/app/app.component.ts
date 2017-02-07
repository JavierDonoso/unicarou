import { Component , trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';

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
        transform: 'translateX(-100%)'
      }),
      animate('1s ease-in')
    ]),
      transition('show => hide', animate('1000ms ease-out'))
    ])
  ]
})
export class AppComponent {
  title = 'app works!'; //The time to show the next photo
    private NextPhotoInterval:number = 4000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<any> = [];

    constructor() {
            this.addNewSlide();
    }

    private addNewSlide() {
         this.slides.push(
            {image:'assets/images/products-hero/tienda.jpg',text:'Visita nuestra tienda!!',active:true,state:'show'},
            {image:'assets/images/products-hero/san-valentin.jpg',text:'Regala en San Valentín placer para los sentidos',active:false,state:'hide'},
            {image:'assets/images/products-hero/homecampaign.jpg',text:'En Febrero -20% en hidratación de cuerpo para combatir el frio',active:false,state:'hide'},
              );
    }

    private removeLastSlide() {
        this.slides.pop();
    }
}