import {Injectable} from '@angular/core';
import {Topic} from '../../models/topic';
import {Api} from '../api/api';
import {Observable} from "rxjs";

 @Injectable()
 export class Topics {
   public topics: Topic[];

   constructor(public api: Api) {
     this.topics = [];
   }

   fetchAll() {
     return this.api.get('topics').map((res: any) => {
       return res.flatMap(function (topic) {
         return new Topic(topic.topic_id, topic.topic, topic.description)
       })
     }).map((res) => {
       this.topics = res;
       return res
     }).catch(res => Observable.throw(res));
   }

   query(params?: any) {
     if (!params) {
       return this.topics;
     }

     return this.topics.filter((topic) => {
       console.log(topic);
       for (let key in params) {
         let field = topic[key];
         if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
           return topic;
         } else if (field == params[key]) {
           return topic;
         }
       }
       return null;
     });
   }

   post(form: any) {
     console.log("Sending ", form);
     let seq = this.api.post('topics', form).share();

     seq.subscribe((res: any) => {
       if (res.success == true) {
         console.log("POST topic success: Adding ", res);
         var t = res.topic;
         this.topics.push(new Topic(t.topic_id, t.topic));
       }
     }, (err) => {
       console.error('ERROR', err);
     });

     return seq
   }

   like(topic: Topic) {
     // TODO: add POST method for Topic (increment)
     console.log("Liking ", topic)
     return this.api.post('topics', topic.topic_id)
   }

   unlike(topic: Topic) {
     // TODO: add POST method for Topic (decrement)
     console.log("UnLiking ", topic)
     return this.api.post('topics', topic.topic_id)
    }

   delete(topic: Topic) {
     this.topics.splice(this.topics.indexOf(topic), 1);
   }
 }
