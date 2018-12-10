## Implementation Decisions
The general idea I wanted to follow was something like this:
<a href="https://imgur.com/xPmd039"><img src="https://i.imgur.com/xPmd039.png" title="source: imgur.com" /></a>  
A low polygon modeling of a planet with models that are constrastingly large for the planet.  
I decided i would do something similar, and make my own models and effects for the project.
  
The first decision was how to make the planet. I found on the Three.js documentation a geometry shape named Icosahedron and noticed it looked exactly like the examples i've found online!  
<a href="https://imgur.com/yS4Zvis"><img src="https://i.imgur.com/yS4Zvis.png" title="source: imgur.com" /></a>  
-> const planetGeometry = new THREE.IcosahedronGeometry(200, 2);  
  - 200 is the radius  
  - 2 is the 'amount of faces' (doing 5 would make it look like a completely smooth sphere'  
  
Then i decided i'd create a small 'wooden house' and some trees.  
<a href="https://imgur.com/pK9vW4K"><img src="https://i.imgur.com/pK9vW4K.png" title="source: imgur.com" /></a>  
    
      
## Technical Issues Faced

1) Emitting light from sub object and making the sun appear 'lit'.  
I was able to find example code for an object emitting light on the three.js decomentation page. It was not working when i first implemented it because the light would not show at all, and noticed later that it was because a parameter in the THREE.PointLight function is what would increase the 'range' of the light.  


  
2)shadows
