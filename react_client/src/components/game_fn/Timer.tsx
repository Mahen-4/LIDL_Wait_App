

export const timer = (
    timerDown:number,
    finish: boolean,
    setTimerDown: React.Dispatch<React.SetStateAction<number>>,
    generateProduct: () => void
    
    ) => {
        document.getElementsByClassName("timer")[0].getAttribute("color")
        if(!finish){
            setTimerDown(timerDown- 1)
        
            switch (true) {
                case timerDown <= 20 && timerDown > 10:
                    document.getElementsByClassName("timer")[0].setAttribute("color", "orange")
                    break;
                case timerDown <= 10:
                    document.getElementsByClassName("timer")[0].setAttribute("color", "red")
                    break;
                default:
                    document.getElementsByClassName("timer")[0].setAttribute("color", "green")
                    break;
            }
            if(timerDown === 0 ){
                setTimerDown(30)
                generateProduct()
                
            }
        }
        
}