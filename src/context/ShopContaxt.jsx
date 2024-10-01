import { createContext ,useEffect,useState} from "react"
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContaxt  = createContext();

const ShopContaxtProvider = (props)=>{

    const currency = "₹";
    const delivery_fee = 10;
    const [Search, setSearch] = useState('')
    const [ShowSearch, setShowSearch] = useState(false)
    const [CartItems, setCartItems] = useState({})
    const navigate = useNavigate();

    const addToCart = async(itemId,Size)=>{
        if(!Size){
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(CartItems);
        if(cartData[itemId]){
            if(cartData[itemId][Size]){
                cartData[itemId][Size] += 1;
            }
            else{
                cartData[itemId][Size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][Size] = 1;
        }
        setCartItems(cartData)
    }

    const getCartCount = ()=>{
        let TotalCount = 0;
        for (const items in CartItems) {
            for(const item in CartItems[items]){
               try{
                if(CartItems[items][item]>0){
                    TotalCount +=  CartItems[items][item];
                }
               }
               catch(error){

               }
            }
        }
        return TotalCount
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(CartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in CartItems){
            let itemInfo = products.find((product)=>product._id==items);
            for(const item in CartItems[items]){
                try{
                    if(CartItems[items][item]>0){
                        totalAmount += itemInfo.price * CartItems[items][item];
                    }
                }
                catch(error){

                }
            }
        }
        return totalAmount;
    }

    const value = {
        products,currency,delivery_fee,Search,setSearch,ShowSearch,setShowSearch,CartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate
    }

    useEffect(()=>{
        // console.log(CartItems);
    },[CartItems])

    
    return(
        <ShopContaxt.Provider value = {value}>
            {props.children}
        </ShopContaxt.Provider>
        
    )
}

export default ShopContaxtProvider;