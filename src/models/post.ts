export class Post {

  constructor(public post_id: number, public content: string, public user_id: number, public title: string, public description = "", public topics = "", public likedBy: boolean = false, public profilePicture: string = "assets/img/basic.png",) {
  }

  htmlText() {
    return this.content.replace(/\n/g, "<br>")
  }
}
