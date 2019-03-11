# comma.ai
[View results](https://david-castaneda.github.io/comma/)

I love the vision of comma.ai and wanted to get involved with the company. This is one of the coding challenges and these are my very rudimentary results.

```
Here are trips from our dash cam users in the SF Bay Area, each of which is a 
JSON file containing an array of coordinates and speed (m/s) sampled at once per second. 
Build a performant web app containing an interactive map visualizing the distribution of 
speeds among these trips. All trips should be simultaneously visible on the map.
```

## Expectations
I wanted to create a very visual representation using the data i was given. Initially i wanted to use a map of SF, however i felt just focusing on visual aspects might work better. I worked on using this data to create a visual/art in hopes to stumble upon some correlations between them.

## Challenges
Working with all the data on the web can cause for very poor performance.

Choosing a web framework that would allow for "3d" rendering of data.

Options:
- D3
- p5

## Roadblocks
Using p5 caused for a small learning curve as well as a challenge when looking up documentation. Since p5 is fairly new and is based on the processing framework, there was lots to be added to the language. I resorted to using p5 for it's simple use of WEBGL. The biggest road block was lack of support from the language which caused for a lot of guess work by my part. 

Displaying all the data simultaneously caused the rendering to be unbearable, i resorted to just displaying 1 trip at a time.

All trips trying to be displayed at once.
<img width="947" alt="Screen Shot 2019-03-11 at 12 28 57 PM" src="https://user-images.githubusercontent.com/21694364/54140868-f0a8f380-43fa-11e9-83d5-5b289f182a9c.png">


## Outcome
I wasn't able to complete all the things i wanted to do, i mainly got some visual representation of the trip speed in a very rudimentary way.

<img width="872" alt="Screen Shot 2019-03-11 at 12 34 47 PM" src="https://user-images.githubusercontent.com/21694364/54140840-e4bd3180-43fa-11e9-91ca-44df3e94fd2c.png">

## Learned
- Big data on the web is kind of a pain. I could have broken the data into chunks and rendered it that way, too late.

- p5 is still very new and needs a lot of documentation as well as developer evangelists.

- Working with "3d" space on a 2d canvas was interesting. 
