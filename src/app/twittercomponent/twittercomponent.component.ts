import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from '../twitterservice.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-twittercomponent',
  templateUrl: './twittercomponent.component.html',
  styleUrls: ['./twittercomponent.component.css']
})
export class TwittercomponentComponent implements OnInit {

  tweets: any;
  tweet: any;
  currentIdx: any;
  profileImg = 'https://pbs.twimg.com/profile_images/1338297924652961793/lzQgrXMA_400x400.jpg';
  constructor(private twtservice: TwitterserviceService) { }

  sanitize(url) {
    return("aaa");
  }
  selectTweet(idx): void {
    var cleanTweet = this.tweets[idx];
    cleanTweet.full_text = this.cleanBody(cleanTweet.full_text);
    this.tweet = cleanTweet;
    this.currentIdx = idx;
  }

  previousTweet(): void {
    if (this.currentIdx == 0) {
      this.selectTweet(0);
    }
    else {
      this.selectTweet(this.currentIdx - 1);
    }
  }

  nextTweet(): void {
    if (this.currentIdx == (this.tweets.length - 1)) {
      this.selectTweet(this.tweets.length - 1);
    }
    else {
      this.selectTweet(this.currentIdx + 1);
    }
  }
  cleanBody(body): string {
    var splt = body.split(" ");
    var cleaned = "";
    splt.forEach(element => {
      if (!element.includes("http")) {
        cleaned += element + " ";
      }
    });
    return cleaned;
  }

  updateTweets(response): void {
    this.tweets = response.data;
    this.selectTweet(0);
  }

  getMentions(): void {
    this.twtservice.getTimeline();
  }

  getLeffs(): void {
    this.twtservice.getLeffs();
  }
  
  
  ngOnInit(): void {
    this.twtservice.subObj.subscribe(
      values => {
        console.log('subscription updated');
        if (values !== 1) {
          this.updateTweets(values);
          console.log('response sent to variable');
        }
      },
      error => {
        console.log(error.message);
      }
    );
    this.getLeffs();
  }

}
