import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';



type CircProgType = {
    percentage: number;
    passed: boolean;
  }
  
 function CircularProgress({percentage, passed}: CircProgType){
    const circleRef = useRef<any>()
    const VALUES = [0,percentage]
    
    const progress = useMotionValue(VALUES[0])
    //const passedColor = passed ? '#22c55e' : '#ef4444';
    const colors = ['#ef4444', '#22c55e'];
    const colorValue = useTransform(progress, [0, 100], [colors[0], colors[1]]);


    const circleProgress = useTransform(progress, [0,100], [0,360])
    const textColor = useTransform(progress, [0, 100], [colors[0], colors[1]]);
     const bg01 = useMotionTemplate`
    conic-gradient(
      ${colorValue} ${circleProgress}deg, 
      ${colorValue} ${circleProgress}deg, 
      #2c2c2c 0deg
    )
  `
    useEffect(()=> {
        animate(progress, VALUES, {
        ease: 'easeInOut',
        duration: 3,
        })
        animate(colorValue, colors, {
            ease: 'easeInOut',
            duration: 3,
        })
    })

    return(

        <div className=" h-auto grid grid-cols-2 place-items-center">
        <motion.div className="shadow-xl relative circular-progress h-64 w-64 
        grid place-items-center rounded-full "
        ref={circleRef}
            style={{  
                backgroundImage: bg01,
                scale: 1,
            }}  
        >
            <div className="shadow-sm h-40 w-40 rounded-full bg-[rgb(237,237,237)] "/>
        </motion.div>
        <motion.div className="font-pixelFont text-[80px] font-semibold tracking-wider" 
        style={{ 
            color: textColor, 
        }}>
            {percentage}%
        </motion.div>
        </div>

    )
}


  export default CircularProgress