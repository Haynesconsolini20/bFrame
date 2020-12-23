const express = require('express');
const Twitter = require('twit');
const app = express();


const twitClient = new Twitter({
    consumer_key: 'pXhTQRJs3r81t4Qux3ynnIDMA',
    consumer_secret: '4ebClvgRmkde9I00DW7RE9YpXN6cGfERySpmK96WuihKODqhe6',
    access_token: '2523818257-rgorVarZlD7Oswasn9HHJgoGQTqBe710cXCl5Sr',
    access_token_secret: 'xIQdxG2txNYxChtk1w2n0obj0y3ns2JRirFNc6JIWHOjL'
});

app.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };
   
    twitClient
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
         
        res.send(timeline);
        console.log('response sent to angular');
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };
   
    twitClient
      .get(`statuses/mentions_timeline`, params)
      .then(timeline => {
       
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.get('/leffen_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 200, include_rts: false, exclude_replies: true, screen_name: 'DeepLeffen'};
   
    twitClient
      .get(`statuses/user_timeline`, params)
      .then(timeline => {
       
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname))
}); 


app.listen(3000, () => console.log('Server Running'))
