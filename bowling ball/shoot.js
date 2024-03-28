AFRAME.registerComponent("bowling-ball",{
    init:function(){
       this.BowlingBall()
    },
    BowlingBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var ball = document.createElement('a-entity')
             
               
                ball.setAttribute('dynamic-body',{
                    mass:0,
                    shape:'sphere'
                })
                ball.setAttribute('gltf-model',"./models/ball/ball.gltf")
                ball.setAttribute("scale",{x:5,y:5,z:5})

                
        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y-1.2,
          z: pos.z,
        });
                var camera = document.querySelector("#camera").object3D;
                 
                var position = new THREE.Vector3()
                camera.getWorldDirection(position)

                ball.setAttribute("velocity", position.multiplyScalar(-10))
                 ball.addEventListener("collide",this.removeBall)
        var scene = document.querySelector('#scene')
        scene.appendChild(ball)

            }
       
        })
        
    },
    removeBall: function (e) {
        //bullet element
        var element = e.detail.target.el;
    
        //element which is hit
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes("bowlingPin")) {
         
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(0, 1, -15);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    
          //remove event listener
          element.removeEventListener("collide", this.removeBullet);
    
          //remove the bullets from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
})