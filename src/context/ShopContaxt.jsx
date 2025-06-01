import { createContext ,useEffect,useState} from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContaxt  = createContext();


const ShopContaxtProvider = (props)=>{

    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [Search, setSearch] = useState('')
    const [ShowSearch, setShowSearch] = useState(false)
    const [CartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [Token, setToken] = useState('')
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

        if(Token){
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,Size},{headers:{Token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
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

    const updateQuantity = async(itemId,Size,quantity)=>{
        let cartData = structuredClone(CartItems);
        cartData[itemId][Size] = quantity;
        setCartItems(cartData);

        if(Token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,Size,quantity},{headers:{Token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
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

    const getProductsData = async()=>{
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async(Token)=>{
        
        try {
            
            
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{Token}})
            
            if(response.data.success){
                
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!Token && localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    },[])

    const value = {
        products,currency,delivery_fee,Search,setSearch,ShowSearch,setShowSearch,CartItems,setCartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,Token,setToken
    }

    
    return(
        <ShopContaxt.Provider value = {value}>
            {props.children}
        </ShopContaxt.Provider>
        
    )
}

export default ShopContaxtProvider;