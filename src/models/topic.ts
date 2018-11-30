export class Topic {

  constructor(public topic_id: number, public topic: string, public description = "", public posts = "", public profilePicture: string = "assets/img/speakers/turtle.jpg",) {
  }

}
