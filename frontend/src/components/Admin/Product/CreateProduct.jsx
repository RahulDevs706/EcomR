import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createNewProduct } from '../../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../../constants/productConstant';
import MetaData from '../../layout/MetaData';
import "./createProduct.css"
import Sidebar from '../Sidebar';

const CreateProduct = ({history}) => {


  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, success} = useSelector(state=>state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(success){
      alert.success("New product created successfully");
      history.push("/admin/dashboard")
      dispatch({
        type:NEW_PRODUCT_RESET
      })
    }
  }, [alert, error, success, dispatch, history]);

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


  const handleCreateSubmit = (e)=>{
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

    dispatch(createNewProduct(myForm));
  }


  const handleProductImageChange = (e)=>{
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
  
  return <Fragment>
    <MetaData title="Create Product" />
    <div className='dashboard'>
      <Sidebar />
      <div className='createProductContainer'>

        <form 
         className='createProductForm'
         encType='multipart/form-data'
         onSubmit={handleCreateSubmit}
        >

        <h1>Create Product</h1>

          <div>
            <Spellcheck />
            <input 
              type="text"
              placeholder="Product Name"
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
            <select onChange={e=>setCategory(e.target.value)}>
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
              onChange={e=>setStock(e.target.value)}
            />
          </div>

          <div id='createProductFormFile'>
            <input 
              type="file"
              name='avatar'
              accept='image/*'
              multiple
              onChange={handleProductImageChange}
            />
          </div>

          <div id='createProductFormImage'>
              {imagesPreview.map((item, idx)=>(
                <img src={item} alt={idx} key={idx} />
              ))}
          </div>

          <button
            id='createProductBtn'
            type='submit'
            disabled={loading? true:false}
          >
            Create Product
          </button>
          
        </form>
      </div>
    </div>
  </Fragment>;
};

export default CreateProduct;
