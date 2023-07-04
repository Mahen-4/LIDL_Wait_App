import { Link, redirect } from "react-router-dom";
import Axios from 'axios'
 // generate random product -> verif if already guessed -> if not display  product
interface Product {
    name: string;
    price: number;
    img: string;
}
export const generateProduct = (
    doneProducts: number[],
    allProduct: Product[],
    points: number,
    userMail: string,
    setGameFinish: React.Dispatch<React.SetStateAction<boolean>>,
    setDoneProducts: React.Dispatch<React.SetStateAction<number[]>>,
    setCurrentProduct_price: React.Dispatch<React.SetStateAction<number>>,
    setCurrentProduct_name: React.Dispatch<React.SetStateAction<string>>,
    setCurrentProduct_image: React.Dispatch<React.SetStateAction<string>>,

) => {
    console.log(userMail)
    let generate = Math.floor(Math.random() * 6);
    if(doneProducts.includes(generate)){
        if(doneProducts.length === allProduct.length){
            if(userMail){
                Axios.post("http://127.0.0.1:5000/updatePoints", {"points": points, "mail": userMail })
                .then(response => {
                    console.log(response)
                    setGameFinish(true)
                })
            }
            else{
                setGameFinish(true)
            }             
            
        }
        else{
            generateProduct(doneProducts,allProduct,points,userMail,setGameFinish,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image)
        }
    }
    else{
        setDoneProducts(prev => [...prev, generate])
        setCurrentProduct_price(allProduct[generate].price)
        setCurrentProduct_name(allProduct[generate].name)
        setCurrentProduct_image(allProduct[generate].img)
    }
}

