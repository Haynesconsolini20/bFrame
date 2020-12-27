import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TwitterserviceService } from '../twitterservice.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export interface DialogData {
  handle: string;
}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html'
})
export class SettingsDialog {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    onNoClick(): void {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'app-twittercomponent',
  templateUrl: './twittercomponent.component.html',
  styleUrls: ['./twittercomponent.component.css']
})
export class TwittercomponentComponent implements OnInit {

  tweets: any;
  tweet: any;
  currentIdx: any;
  handle: string;
  profileImg = 'https://pbs.twimg.com/profile_images/1338297924652961793/lzQgrXMA_400x400.jpg';
  constructor(private twtservice: TwitterserviceService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialog,{
      data: {handle: this.handle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.handle = result;
      this.getLeffs();
    });

  }
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
    console.log("response received");
    this.tweets = response.data;
    this.selectTweet(0);
  }

  getMentions(): void {
    this.twtservice.getTimeline();
  }

  getLeffs(): void {
    this.twtservice.getLeffs(this.handle);
  }
  
  
  ngOnInit(): void {
    this.handle = "DeepLeffen";
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
