export class User {

   constructor(public user_id: number, public username: string, public likedBy: boolean = false, public profilePicture: string = "assets/img/speakers/duck.jpg",) {
   }

 }
