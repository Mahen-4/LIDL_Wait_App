
export const handleGuessNum = (
    guessNum:number,
    currentProduct_price:number,
    points: number,
    setTimerDown: React.Dispatch<React.SetStateAction<number>>,
    setPoints: React.Dispatch<React.SetStateAction<number>>,
    setGuessNum: React.Dispatch<React.SetStateAction<number>>,
    generateProduct: () => void
) =>{
    
    document.getElementsByClassName("plus_moins")[0].classList.remove("plus")
    document.getElementsByClassName("plus_moins")[0].classList.remove("moins")

    switch (true) {

        case guessNum === currentProduct_price:
            setPoints(points+1)
            setGuessNum(0)
            generateProduct()
            setTimerDown(30)
            break;

        case guessNum > currentProduct_price:
            document.getElementsByClassName("plus_moins")[0].classList.add("moins")
            break;
        
        case guessNum < currentProduct_price:
            document.getElementsByClassName("plus_moins")[0].classList.add("plus")
            break;

        default:       
            break;
    }
}

