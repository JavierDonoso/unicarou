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
      state('activeX',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1) translateX(0%)',
        opacity:1
      })),
     transition('* => activeX', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('1s ease-in')
    ]),
      transition('true => false', animate('1000ms ease-out'))
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
            {image:'assets/images/products-hero/tienda.jpg',text:'Visita nuestra tienda!!'},
            {image:'assets/images/products-hero/san-valentin.jpg',text:'Regala en San Valentín placer para los sentidos'},
            {image:'assets/images/products-hero/homecampaign.jpg',text:'En Febrero -20% en hidratación de cuerpo para combatir el frio'},
              );
    }

    private removeLastSlide() {
        this.slides.pop();
    }
}