## Implementation Decisions
The general idea I wanted to follow was something like this:
<a href="https://imgur.com/xPmd039"><img src="https://i.imgur.com/xPmd039.png" title="source: imgur.com" /></a>  
A low polygon modeling of a planet with models that are constrastingly large for the planet.  
I decided i would do something similar, and make my own models and effects for the project.
  
The first decision was how to make the planet. I found on the Three.js documentation a geometry shape named Icosahedron and noticed it looked exactly like the examples i've found online!  
<a href="https://imgur.com/yS4Zvis"><img src="https://i.imgur.com/yS4Zvis.png" title="source: imgur.com" /></a>  
```javascript
const planetGeometry = new THREE.IcosahedronGeometry(200, 2);  
```
  - 200 is the radius  
  - 2 is the 'amount of faces' (doing 5 would make it look like a completely smooth sphere'  
  
Then i decided i'd create a small 'wooden house' and some trees. Here is my final product  
<a href="https://imgur.com/pK9vW4K"><img src="https://i.imgur.com/pK9vW4K.png" title="source: imgur.com" /></a>  
 
 At the end i decided to change my partcile system because i couldn't figure out how to make it look like smoke coming out of a chimney:  
 <a href="https://imgur.com/BGRDoxR"><img src="https://i.imgur.com/BGRDoxR.gif" title="source: imgur.com" /></a>  
 i edited the particle size so you could see it more in this gif.
## Technical Issues Faced

1) Emitting light from sub object and making the sun appear 'lit'.  
I was able to find example code for an object emitting light on the three.js decomentation page. It was not working when i first implemented it because the light would not show at all, and noticed later that it was because a parameter in the THREE.PointLight function is what would increase the 'range' of the light.  
```javascript 
var pointLight = new THREE.PointLight( 0xFFFFE0, intensity, 10000 );  
```  
 <a href="https://imgur.com/26JEpZQ"><img src="https://i.imgur.com/26JEpZQ.png" title="source: imgur.com" /></a>    
  - the last parameter '10000' was originally 10 in the example code...      
I later found that it's the material of the sun's mesh that would not allow it to appear like it was emitting any light as well, and so i changed it from Phong to Basic material.    
<a href="https://imgur.com/Nvpzudz"><img src="https://i.imgur.com/Nvpzudz.png" title="source: imgur.com" /></a>  
  - how it looked when it was a Phong material
  
2)shadows
Shadows were also an issue because they seemed like they just weren't appear even after writing  
```javascript
castShadow = true;
``` 
and
```javascript
receiveShadow = true;
```
for every mesh i created. I was stupid and didn't notice that my renderer didn't have this line for the longest time: 
```javascript
renderer.shadowMap.enabled = true;    
```
it was only after i watched a video online to help me figure out why i couldn't get a simple shadow to show up.    
<a href="https://imgur.com/Z5Uutkc"><img src="https://i.imgur.com/Z5Uutkc.gif" title="source: imgur.com" /></a>  
another gif to show the house's shadow at a sun's different position:  
<a href="https://imgur.com/SX0tFoR"><img src="https://i.imgur.com/SX0tFoR.gif" title="source: imgur.com" /></a>  

3)GUI with sun&moon  
This was the most frustrating issue, in the end i could'nt fix it, but basically the sun just would NOT rotated around the planet!
Whether i rotated by 'x', 'y', or 'z' it did not work. Kept rotating on it's axis. Same thing even when i added it to the planet group. It would not rotated around it. 
