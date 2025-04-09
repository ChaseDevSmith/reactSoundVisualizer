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
    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext("2d");
    const audioElement = audioRef.current;

    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      analyserRef.current = audioContext.createAnalyser();
      audioSourceRef.current = audioContext.createMediaElementSource(audioElement);

      audioSourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);
      analyserRef.current.fftSize = 256;
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
      analyserRef.current.fftSize = 128;

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
          context.rotate(i*bufferLength*2);
      
          const hue = 76 + i * 9;
          context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          context.beginPath();
          context.arc(0,barHeight,barHeight/10,0,Math.PI*2);
          context.fill();
      
          x += barWidth;
          context.restore();
          
      
      }
      };
      const pspMusicVisualizer = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        analyserRef.current.fftSize = 256;  
      
        const barWidth = 3;
        const barCount = bufferLength / 2; 
        const radius = 100;
        const angleStep = (Math.PI * 2) / barCount;  
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
      
        for (let i = 0; i < barCount; i++) {
          const barHeight = dataArray[i] * 1.5;
          const angle = angleStep * i;
      
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
      
          const hue = (i * 360) / barCount;
          context.fillStyle = `hsl(${hue}, 100%, 50%)`;
      
          context.save();
          context.translate(x, y);
          context.rotate(angle);
      
          context.fillRect(-barWidth / 2, -barHeight, barWidth, barHeight);
      
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
    const pianoKeyVisualizer = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      analyser.getByteFrequencyData(dataArray);
      analyserRef.current.fftSize = 256; 
  
      const keyWidth = 30;  
      const gap = 35;  
      const numKeys = Math.floor(canvas.width / (keyWidth + gap));  
  
      let centerY = canvas.height / 2;
  

      for (let i = 0; i < numKeys; i++) {
          let frequencyIndex = Math.floor(i * bufferLength / numKeys);  
          let barHeight = dataArray[frequencyIndex] * 2;  
  
  
          let keyColor = i % 2 === 0 ? "#FFFFFF" : "#000000";  
          context.fillStyle = keyColor;
  

          context.fillRect(
              i * (keyWidth + gap), 
              centerY - barHeight / 2,  
              keyWidth, 
              barHeight   
          );
      }
  
     
     
  
    
      context.save();
      context.translate(-0.5, 0);  
      context.restore();
  };
    
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
       
          break;
        case "PSP":
          colorTunnelAnimation();

          break;
        case "CLEAN":
          pianoKeyVisualizer();

          break;
          case "CIRCLES":
            circleAnimation();
            break;
        case 'RAINBOW':
          pspMusicVisualizer();
          
      
            break;
        case "LILYPAD":
          lilyAnimation();
          break;
          case "TAJIN":
            tajinAnimation();             
          break;
        default:
              basicAnimation();     
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
    
            <CanvasRecorder canvasRef={canvasRef} />
               <div>
     <canvas
  ref={canvasRef}
  id="visualizer-canvas"  
  width={window.innerWidth}
  height={window.innerHeight}
/>
     </div>
    </div>
    
  );
};

export default AudioVisualizer;
