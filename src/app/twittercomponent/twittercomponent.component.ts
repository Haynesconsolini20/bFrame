import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TwitterserviceService } from '../twitterservice.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Keyboard from "simple-keyboard";


export interface DialogData {
  handle: string;
}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../../node_modules/simple-keyboard/build/css/index.css'
  ]
})
export class SettingsDialog {
  value ="";
  keyboard: Keyboard;
  constructor(

    public dialogRef: MatDialogRef<SettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    onInputFocus() {
      this.keyboard = new Keyboard({
            onChange: input => this.onChange(input),
            onKeyPress: button => this.onKeyPress(button)
          });
      }
      
        onChange = (input: string) => {
          this.value = input;
          this.data.handle = input;
          console.log('Input changed', input);
        };
      
        onKeyPress = (button: string) => {
          console.log('Button pressed', button);
      
          /**
           * If you want to handle the shift and caps lock buttons
           */
          if (button === '{shift}' || button === '{lock}') this.handleShift();
        };
      
        onInputChange = (event: any) => {
          this.keyboard.setInput(event.target.value);
        }
      
        handleShift = () => {
          let currentLayout = this.keyboard.options.layoutName;
          let shiftToggle = currentLayout === "default" ? "shift" : "default";
      
          this.keyboard.setOptions({
            layoutName: shiftToggle
          });
        };
 
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
  resetHour: any;
  resetMin: any;
  profileImg = 'https://pbs.twimg.com/profile_images/1338297924652961793/lzQgrXMA_400x400.jpg';
  constructor(private twtservice: TwitterserviceService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialog,{
      data: {handle: this.handle},
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
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
    this.tweets = this.shuffleInPlace(response.data);
    this.selectTweet(0);
  }

  getMentions(): void {
    this.twtservice.getTimeline();
  }

  getLeffs(): void {
    this.twtservice.getLeffs(this.handle);
  }
  
  checkTime(): void {
    let curr = new Date();
    let currHour = curr.getHours();
    let currMin = curr.getMinutes();
    //console.log(typeof(currHour));
    //console.log(currMin);
    console.log("Checking time")
    if (Number(currHour) == Number(5) && Number(currMin) == Number(5)) {
      this.nextTweet();
    }
    else {
      // //console.log("CurrHour is a " + typeof(currHour) + " with value " + currHour);
      // //console.log("CurrMin is a " + typeof(currMin) + " with value " + currMin);
      // console.log(Number(currHour) == Number(11));
      // console.log(Number(currHour) - Number(10));
      // console.log(Number(currHour) - Number(11));
      // console.log(Number(this.resetHour));
      // console.log(Number(this.resetHour - 2));
      // console.log(Number(currHour) - Number(this.resetHour));

    }

  }
  
  ngOnInit(): void {
    this.resetHour = 11;
    this.resetMin = 9;
    console.log("resetHour is a " + typeof(this.resetHour) + " with value " + this.resetHour);
    console.log("resetMin is a " + typeof(this.resetMin) + " with value " + this.resetMin);
    var self = this;
    let id = setInterval(function() { self.checkTime(); }, 60000);
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleInPlace<T>(array: T[]): T[] {
    // if it's 1 or 0 items, just return
    if (array.length <= 1) return array;
  
    // For each index in array
    for (let i = 0; i < array.length; i++) {
  
      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      const randomChoiceIndex = this.getRandomInt(i, array.length - 1);
  
      // place our random choice in the spot by swapping
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }
  
    return array;
  }

}
