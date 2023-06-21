
 // generate random product -> verif if already guessed -> if not display  product
interface Product {
    name: string;
    price: number;
    img: string;
}
export const generateProduct = (
    doneProducts: number[],
    allProduct: Product[],
    setFinish: React.Dispatch<React.SetStateAction<boolean>>,
    setDoneProducts: React.Dispatch<React.SetStateAction<number[]>>,
    setCurrentProduct_price: React.Dispatch<React.SetStateAction<number>>,
    setCurrentProduct_name: React.Dispatch<React.SetStateAction<string>>,
    setCurrentProduct_image: React.Dispatch<React.SetStateAction<string>>,

) => {
    let generate = Math.floor(Math.random() * 6);
    if(doneProducts.includes(generate)){
        if(doneProducts.length === allProduct.length){
            console.log("FINISH")
            setFinish(true)
        }
        else{
            generateProduct(doneProducts,allProduct,setFinish,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image)
        }
    }
    else{
        setDoneProducts(prev => [...prev, generate])
        setCurrentProduct_price(allProduct[generate].price)
        setCurrentProduct_name(allProduct[generate].name)
        setCurrentProduct_image(allProduct[generate].img)
    }
}


