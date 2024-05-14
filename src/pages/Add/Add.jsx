import './Add.css'
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Tiffins"
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Tiffins"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className="add">
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-produc-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name}  type="text" name="name" placeholder='Type here' />

            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content here'></textarea>
            </div>
            <div className="add-category-price flex-col">

            <div className="add-category flex-col">
                <p>Procuct category</p>
                <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Tiffins">Tiffins</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Specials">Specials</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='&#8377;20' />
            </div>
            </div>
            <button className='add-btn' type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default Add