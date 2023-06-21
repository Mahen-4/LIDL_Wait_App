

export const timer = (
    timerDown:number,
    finish: boolean,
    setTimerDown: React.Dispatch<React.SetStateAction<number>>,
    generateProduct: () => void
    
    ) => {
        if(!finish){
            setTimerDown(timerDown- 1)
        
            // switch (true) {
            //     case timerDown <= 20 && timerDown > 10:
                    
            //         break;
            //     case timerDown <= 10:
    
            //         break;
            //     default:
            //         break;
            // }
            if(timerDown === 0 ){
                setTimerDown(30)
                generateProduct()
                
            }
        }
        
}