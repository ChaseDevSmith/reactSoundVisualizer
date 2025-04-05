import React, { useRef, useEffect } from "react";
import CanvasRecorder from "./CanvasRecorder";
import { useState } from "react";
const AudioVisualizer = ({ audioFile, station }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(new Audio());
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioSourceRef = useRef(null);
  
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  useEffect(() => {
    resizeCanvas(); 
    window.addEventListener('resize', resizeCanvas); 
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  

  const resetNodes = () => {
    console.log("Resetting...");
    window.location.reload();
  };

  useEffect(() => {
    if (!audioFile) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const audioElement = audioRef.current;

    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      analyserRef.current = audioContext.createAnalyser();
      audioSourceRef.current = audioContext.createMediaElementSource(audioElement);

      audioSourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);
      analyserRef.current.fftSize = 64;
    }

    const audioContext = audioContextRef.current;
    const analyser = analyserRef.current;
    
    if (audioElement.src !== audioFile) {
      audioElement.pause();
      audioElement.src = audioFile;
      audioElement.load();
      audioElement.play();
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const basicAnimation = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 2;
        context.fillStyle = "red"; 
        context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
      }
    };

    const  shadowAnimation = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.5;
        context.save();
        context.translate(canvas.width/2,canvas.height/2);
        context.rotate(i*70)
        const hue = i + 2 * 7
        context.strokeStyle = 'hsl(' + hue + ', 100%,'+ barHeight/3 + '50%)'
        context.beginPath();
        context.moveTo(0,0)
        context.lineTo(0,barHeight);
        context.stroke();


        // context.fillStyle = "#345097";  
        x += barWidth;
        if(i>bufferLength ^0.6){
          context.beginPath();
          context.arc(0,0,barHeight/1.5,0,Math.PI^2)
        }
        context.restore();
      }
    };
   
    
//     const pspAnimation = () => {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       analyser.getByteFrequencyData(dataArray);

//       const barWidth = canvas.width / bufferLength;
//       const x = 0;

//       for (let i = 0; i < bufferLength; i++) {
//         const barHeight = dataArray[i] * 3; 
//         context.fillStyle = "blue";  
//         context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//         x += barWidth;
//       }
//       var amplitude = 100;
// var frequency = 0.05;
// var phase = 0;

// ctx.beginPath();
// ctx.moveTo(0, canvas.height / 2);

// for(var x = 0; x < canvas.width; x++) {
//     var y = amplitude * Math.sin(frequency * x + phase);
//     ctx.lineTo(x, y + canvas.height / 2);
// }

// ctx.strokeStyle = "blue";
// ctx.stroke();

// phase += 0.05;


//     };
    const starAnimation = () => {
      context.clearRect( 0,0, canvas.width, canvas.height);
context.fillStyle = '';
analyser.getByteFrequencyData(dataArray);
// let barHeight;
let barWidth = 15;
let x = 0;
for (let i = 0; i < bufferLength; i++){
    const barHeight = dataArray[i] * 1.5;
    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(i*4);

    const hue = 120 + i * 0.3;
    context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
    const red = i * barHeight/20;
    const green = i * 4;
    const blue = barHeight/2;
    // context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
    context.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    context.restore();
    

}
    //   for (let i = 0; i < bufferLength; i++){
    //     const barHeight = dataArray[i] * 4 ;
    //     context.save();
    //     context.translate(canvas.width/4,canvas.height/4);
    //     context.rotate(i*9);
    
    //     const hue = 290 + i * 0.3;
    //     context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 9 + '%)';
    //     const red = i * barHeight/20;
    //     const green = i * 4;
    //     const blue = barHeight/2;
    //     // context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
    //     context.fillRect(0, 0, barWidth, barHeight);
    //     x += barWidth;
    //     context.restore();
        
    
    // }
    };
    const cleanAnimation = () => {
      context.clearRect( 0,0, canvas.width, canvas.height);
analyser.getByteFrequencyData(dataArray);
let barHeight;
let barWidth = 15;
let x = 0;
for (let i = 0; i < bufferLength; i++){
    barHeight = dataArray[i] * 1.5;
    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(i^2);
    const red = i * barHeight/20;
    const green = i * 4;
    const blue = barHeight/2;
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
    context.fillRect(x, 0, barWidth, barHeight);
    x += barWidth;
    context.restore();
}
    };
  
    const circleAnimation = () => {
      context.clearRect( 0,0, canvas.width, canvas.height);
      context.fillStyle = '';
      analyser.getByteFrequencyData(dataArray);
      analyserRef.current.fftSize = 64;

      // let barHeight;
      let barWidth = 15;
      let x = 0;
      for (let i = 0; i < bufferLength; i++){
          const barHeight = dataArray[i] * 1.4;
          context.save();
          context.translate(canvas.width/2,canvas.height/2);
          context.rotate(i*bufferLength*2);
      
          const hue = 76 + i * 9;
          context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          context.beginPath();
          context.arc(0,barHeight,barHeight/10,0,Math.PI*2);
          context.fill();
          // context.beginPath();
          // context.arc(0,barHeight/1.5,barHeight/20,0,Math.PI*2);
          // context.fill();
          // context.beginPath();
          // context.arc(0,barHeight*2,barHeight/30,0,Math.PI*2);
          // context.fill();
          // context.beginPath();
          // context.arc(0,barHeight*2.5,barHeight/40,0,Math.PI*2);
          // context.fill();
         
          x += barWidth;
          context.restore();
          
      
      }
      };
      const colorTunnelAnimation = () => {
        context.clearRect( 0,0, canvas.width, canvas.height);
        context.fillStyle = '';
        analyser.getByteFrequencyData(dataArray);
        // let barHeight;
        let barWidth = 15;
        let x = 0;
        for (let i = 0; i < bufferLength; i++){
            const barHeight = dataArray[i] * 1.4;
            context.save();
            context.translate(canvas.width/2,canvas.height/2);
            context.rotate(i* bufferLength ^ 4);
        
            const hue = 250 + i * 9;
            context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            context.beginPath();
            context.arc(0,barHeight,barHeight/10,0,Math.PI^2);
            context.fill();
            context.beginPath();
            context.arc(0,barHeight/1.5,barHeight/20,0,Math.PI^2);
            context.fill();
            context.beginPath();
            context.arc(0,barHeight/2,barHeight/30,0,Math.PI^2);
            context.fill();
            context.beginPath();
            context.arc(0,barHeight/3,barHeight/40,0,Math.PI^2);
            context.fill();
           
            x += barWidth;
            context.restore();
            
        
        }
        };
      const specsAnimation = () => {
        context.clearRect( 0,0, canvas.width, canvas.height);
        context.fillStyle = '';
        analyser.getByteFrequencyData(dataArray);
        // let barHeight;
        let barWidth = 15;
        let x = 0;
        for (let i = 0; i < bufferLength; i++){
            const barHeight = dataArray[i] * 1.4;
            context.save();
            context.translate(canvas.width/2,canvas.height/2);
            context.rotate(i* bufferLength ^ 4);
        
            const hue = 250 + i * 9;
            context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            context.beginPath();
            context.arc(0,barHeight,barHeight/10,0,Math.PI^2);
            context.fill();
           
            x += barWidth;
            context.restore();
            
        
        }
        };
      const yellowCAnimation = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
  
        const radius = 200;
        let angleStep = (Math.PI * 2) / bufferLength;
        let angle = 0;
  
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * .2;
          const x = canvas.width / 2 + radius * Math.cos(angle);
          const y = canvas.height / 2 + radius * Math.sin(angle);
  
          context.beginPath();
          context.arc(x, y, barHeight, 0, Math.PI * 2);
          context.fillStyle = "yellow";
          context.fill();
          angle += angleStep;
        }
      };
      const rainbowAnimation = () => {
        context.clearRect( 0,0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
       


        const barWidth = canvas.width / bufferLength ;
        let x = 0;
        for (let i = 0; i<bufferLength; i++){
            const barHeight = dataArray[i]*2;
            const red = i * barHeight/20;
            const green = i * 4;
            const blue = barHeight/2;
            context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;

        }
       
      };
    const fxAnimation = () => {
context.clearRect( 0,0, canvas.width, canvas.height);
context.fillStyle = '';
analyser.getByteFrequencyData(dataArray);
// let barHeight;
let barWidth = 15;
let x = 0;

for (let i = 0; i < bufferLength; i++){
    const barHeight = dataArray[i] ^ 1.5;
    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(i^4.184);

    const hue = 120 + i ^ -0.007;
    context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
  context.beginPath();
  context.arc(0, barHeight/2,barHeight/2,0,Math.PI/4);
  context.fill();
  context.stroke();

    x += barWidth;
    context.restore();
    

}
for (let i = 0; i < bufferLength; i++){
  const barHeight = dataArray[i] ^ 1.5;
  context.save();
  context.translate(canvas.width/4,canvas.height/4);
  context.rotate(i*4.184);

  const hue = 120 + i ^ -0.007;
  context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
context.beginPath();
context.arc(0, barHeight/3,barHeight/3,0,Math.PI/3);
context.fill();
context.stroke();

  x += barWidth;
  context.restore();
  

}
for (let i = 0; i < bufferLength; i++){
  const barHeight = dataArray[i] ^ 1.5;
  context.save();
  context.translate(canvas.width/9,canvas.height/9);
  context.rotate(i*4.184);

  const hue = 120 + i ^ -0.007;
  context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
context.beginPath();
context.arc(0, barHeight/3,barHeight/3,0,Math.PI/3);
context.fill();
context.stroke();

  x += barWidth;
  context.restore();
  

}
for (let i = 0; i < bufferLength; i++){
  const barHeight = dataArray[i] ^ 1.5;
  context.save();
  context.translate(canvas.width/2.9,canvas.height/2.9);
  context.rotate(i^89);

  const hue = 27 + i ^ -2 ;
  context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
context.beginPath();
context.arc(0, barHeight/4,barHeight/4,0,Math.PI/4);
context.fill();
context.stroke();

  x += barWidth;
  context.restore();
  

}
for (let i = 0; i < bufferLength; i++){
  const barHeight = dataArray[i] ^ 1.5;
  context.save();
  context.translate(canvas.width/-2.9,canvas.height/-2.9);
  context.rotate(i^89);

  const hue = 40 + i *2.3 ;
  context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
context.beginPath();
context.arc(0, barHeight/4,barHeight/4,0,Math.PI/4);
context.fill();
context.stroke();

  x += barWidth;
  context.restore();
  

}
}
const tajinAnimation = () => {
  context.clearRect( 0,0, canvas.width, canvas.height);
  context.fillStyle = '';
  analyser.getByteFrequencyData(dataArray);
  // let barHeight;
  let barWidth = 15;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++){
      const barHeight = dataArray[i] ^ 1.5;
      context.save();
      context.translate(canvas.width/2,canvas.height/2);
      context.rotate(i^4.181);
  
      const hue = i ^ 0.3;
      context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
      const red = i * barHeight/20;
      const green = i * 4;
      const blue = barHeight/2;
      // context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
      context.fillRect(0, 0, barWidth, barHeight);
      x += barWidth;
      context.restore();
      
  
  }
  }
const lilyAnimation = () => {
  context.clearRect( 0,0, canvas.width, canvas.height);
  context.fillStyle = '';
  analyser.getByteFrequencyData(dataArray);
  // let barHeight;
  let barWidth = 15;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++){
      const barHeight = dataArray[i] ^ 1.5;
      context.save();
      context.translate(canvas.width/2,canvas.height/2);
      context.rotate(i^4);
  
      const hue = 120 + i * 0.3;
      context.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';
      const red = i * barHeight/20;
      const green = i * 4;
      const blue = barHeight/2;
      // context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue +')';
      context.fillRect(0, 0, barWidth, barHeight);
      x += barWidth;
      context.restore();
      
  
  }
  }

    const animate = () => {
      switch (station) {
        case "STRING CHEESE":
          shadowAnimation();
        //   console.log("station1 ran!!");
          break;
        case "PSP":
          colorTunnelAnimation();
        //   console.log("station2 ran!!");
          break;
        case "CLEAN":
          cleanAnimation();
        //   console.log("station3 ran!!");
          break;
          case "CIRCLES":
            circleAnimation();
          //   console.log("station3 ran!!");
            break;
        case 'RAINBOW':
            rainbowAnimation();
            break;
        case "STAR":
          starAnimation();
          break;
          case "FX":
          fxAnimation();
          break;
        default:
          basicAnimation();
        //   console.log("basic starts");
          break;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
 
    };
  }, [audioFile, station]);
  return (
    <div>
      {/* <h2>Audio Visualizer</h2> */}
      
     
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
      {/* <button onClick={playMiddleC}> Test </button> */}
      <button onClick={resetNodes}>Reset</button>
      <canvas
  ref={canvasRef}
  id="visualizer-canvas"  
  width={window.innerWidth}
  height={window.innerHeight}
/>
            <CanvasRecorder canvasRef={canvasRef} />
    </div>
  );
};

export default AudioVisualizer;
