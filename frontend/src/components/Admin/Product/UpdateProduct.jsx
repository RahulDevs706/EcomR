import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearError, getProductDetails, updateProduct } from '../../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../constants/productConstant';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import Loader from '../../layout/Loader/Loader';


const UpdateProduct = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const {loading, error, success} = useSelector(state=>state.updateProduct);

    const {loading:productDetailsLoading, product , error: productError } = useSelector(state => state.productDetails);

    console.log(success);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [oldImages, setOldImages] = useState([]);    
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Mobiles, Computers",
        "TV, Appliances, Electronics",
        "Men's Fashion",
        "Women's Fashion",
        "Home, Kitchen, Pets",
        "Beauty, Health, Grocery",
        "Sports, Fitness, Bags, Luggage",
        "Toys, Baby Products, Kids' Fashion",
        "Car, Motorbike, Industrial",
        "Books & Audible",
      ]

    useEffect(() => {
        if(product && product._id !== params.id){
            dispatch(getProductDetails(params.id));
        }else{
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images); 
        }

        if(error){
            alert.error(error);
            dispatch(clearError);
        }

        if(productError){
            alert.error(productError);
            dispatch(clearError);
        }

        if(success){
            alert.success("Product updated successfully");
            dispatch({type:UPDATE_PRODUCT_RESET});
            history.push("/admin/products")
        }


    }, [error, alert, success, history, dispatch, productError, params, product ]);





    const handleUpdateSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
    
        images.forEach(image=>{
          myForm.append("images", image);
        });
    
        dispatch(updateProduct(myForm, params.id));
    }

    const handleProductUpdateImageChange = (e)=>{
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach(file=>{
          const reader = new FileReader();
    
          reader.onload = ()=>{
            if(reader.readyState===2){
              setImagesPreview(old=>[...old, reader.result]);
              setImages(old=>[...old, reader.result])
            }
          }
    
          reader.readAsDataURL(file)
        })
      }

  return (<Fragment>
    <MetaData title="Update Product --Admin Panel" />
      {productDetailsLoading?<Loader />:(
        <div className='dashboard'>
        <Sidebar />
        <div className='createProductContainer'>
            <form 
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={handleUpdateSubmit}
            >
                <h1>Update Product</h1>

            <div>
                <Spellcheck />
                <input 
                type="text"
                required
                value={name}
                onChange={e=>setName(e.target.value)}
                />
          </div>

          <div>
            <AttachMoney />
            <input 
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={e=>setPrice(e.target.value)}
            />
          </div>


          <div>
            <Description />
            <textarea 
              placeholder="Product Description"
              value={description}
              onChange={e=>setDescription(e.target.value)}
              rows={1}
              cols={30}
            />
          </div>

          <div>
            <AccountTree />
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((item, idx)=>(
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Storage />
            <input 
              type="number"
              placeholder="Stock"
              required
              value={stock}
              onChange={e=>setStock(e.target.value)}
            />
          </div>

          <div id='createProductFormFile'>
            <input 
              type="file"
              name='avatar'
              accept='image/*'
              multiple
              onChange={handleProductUpdateImageChange}
            />
          </div>

          <div id='createProductFormImage'>
              {oldImages && oldImages?.map((item, idx)=>(
                <img src={item.url} alt={idx} key={idx} />
              ))}
          </div>

          <div id='createProductFormImage'>
              {imagesPreview?.map((item, idx)=>(
                <img src={item} alt={idx} key={idx} />
              ))}
          </div>

          <button
            id='createProductBtn'
            type='submit'
            disabled={loading? true:false}
          >
            Update Product
          </button>


            </form>
        </div>

    </div>
      )}
   
  </Fragment>);
};

export default UpdateProduct;
