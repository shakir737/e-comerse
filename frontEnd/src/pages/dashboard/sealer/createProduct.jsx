import { useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {app}   from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { useCreateProductMutation } from '../../../state/products/productsApi';
import { useUpdateProductMutation } from '../../../state/products/productsApi';
import { useGetProductMutation } from '../../../state/products/productsApi';
import styles from './../../../styles/styles';
const CreateProduct = ({ id, setID, setOpen, setUpdated }) => {
//   const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [detail, setDetail] = useState([{color: '', quantity: 0, price: 0}]);
  const Products = useSelector((state) => state.product.products);
  const [Product, setProduct] = useState([]);
  const [createProduct,{data, isSuccess, isError}] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  
  const [formData, setFormData] = useState({
    imageUrls: Product.imageUrls || [],
    title: Product.title || '',
    description: Product.description || '',
    brand: Product.brand || '',
    category: Product.category || '',
    detail: Product.productDetail || [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ category, setCategory ] = useState([]);
  const [brand, setBrand] = useState([]);
  const brandState = [{ Brand:"Nokia"},{ Brand:"Huawei"},{ Brand:"LG"}, {Brand: "Samsung"},{Brand: "Panasonic"},{Brand: "Dell"}, {Brand: "HP"}, {Brand: "Assus"},{Brand: "Sony"},{Brand: "Oppo"}]
  const catState =  [{title:"Mobiles"},{title:"Laptops"},{title:"Desktops"},{title: "Smart Watches"},{title:"Appliances"}]
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  useEffect(() => {
    if(id){
      const filterProduct =  Products.filter(product => product._id === id);
      setFormData(filterProduct[0]);
    
      setDetail(filterProduct[0].productDetail)
    }
    if(isSuccess) {
      const message = data?.message || "Product Added Successfully";
     
      setFormData({
        imageUrls: [],
        title: '',
        description: '',
        brand: '',
        category: '',
        detail: [],
      })
    } 
    if (isError) {    
        if(isError) {
         
        }
    }
  },[isSuccess, isError])

  const storeImage = async (file) => {
    const promise =  new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          c
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
    return promise;
  };
  const handleDetailChanged = (link, value, name) => {
    const updatedDetail = [...detail];
    updatedDetail[link].color = value;
    setDetail(updatedDetail);
  }
  const handleAddDetail = () => {
     setDetail([...detail, {color: "", price: 0, quantity:0}]);
     
    //  const updatedData = [...detail];
     //setDetail(updatedData);
    //  detail.push([{ color: "", price: 0, quantity: 0 }]);
    
  }
  
  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...formData];
    updatedData[updatedData.length - 1 ].detail.splice(linkIndex)
    setFormData(updatedData);
  }
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  
  }
  const handleBrand = (e) => {
    setBrand(e.target.value);

    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  
  const handleSubmit = async (e) => {
    if(id){
      e.preventDefault();
      const data = {
        id: id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        brand: formData.brand,
        imageUrls: formData.imageUrls,
        productDetail: detail,
        slug: "",
       }
       updateProduct(data);
       const message =  "Product Updated Successfully";
      
      setUpdated(true);
      setOpen(false);
    }else{
      e.preventDefault();
      try {
      const data = {
       title: formData.title,
       description: formData.description,
       category: formData.category,
       brand: formData.brand,
       imageUrls: formData.imageUrls,
       productDetail: detail,
      }
       createProduct(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
   
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    {
      id ? (<h1 className='text-3xl font-semibold text-center my-7 text-green'>
        Update A Product
      </h1>) : (<h1 className='text-3xl font-semibold text-center my-7 text-green'>
        Create A Product
      </h1>)
    }
      
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1 '>
          <input
            type='text'
            placeholder='title'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='title'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
         <select
            name="category"
            onChange={(i) => handleCategory(i)}
            value={formData.category}
            className="form-control py-3 mb-3"
            id="category"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select Category --'}
          >
             <option value="">
                  Select a category
                </option>
             {catState.map((i, j) => {
              return (
                 <option key={j} value={i.title}>
                  {i.title}
                </option> 
              );
            })}   
          </select>

          <select
            name="brand"
            onChange={(i) => handleBrand(i)}
            id="brand"
            value={formData.brand}
            className="form-control py-3 mb-3"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select Brand --'}
          >
           <option value="">Select Brand</option>
             {brandState.map((i, j) => {
              return (
                <option key={j} value={i.Brand}>
                  {i.Brand}
                </option>
              );
            })}   
          </select>  
          {
                 detail.map((link, linkIndex) => (
                      
                      <div className='mb-3 block'>
                        <div className='w-full flex items-center justify-between'>
                                <label className="">Product Detail</label>
                                {/* <AiOutlineDelete className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-xl`}
                                  onClick={() =>  {
                                    const updatedData = [...detail];
                                    updatedData.splice(linkIndex, 1);
                                    setDetail(updatedData);
                                    }}/> */}

                              </div>
                              <spain>Color :</spain><br />
                              <input type="text" name="color" id="color" placeholder='Select Color Of  Product' className='border p-3 rounded-lg dark:bg-[#031156]  ' value={link.color}
                                onChange={(e) => {
                                 const updatedDetail = [...detail];
                                 updatedDetail[linkIndex].color = e.target.value;
                                 setDetail(updatedDetail);
                                 }} /> <br />
                                 <spain>Price :</spain><br />
                              <input type="number" placeholder='Select Price Of Product' className='border p-3 rounded-lg dark:bg-[#031156]' value={link.price}
                                onChange={(e) => {
                                  const updatedDetail = [...detail];
                                 updatedDetail[linkIndex].price = e.target.value;
                                 setDetail(updatedDetail);
                                }} /><br />
                                <spain>Enter Total Quantity :</spain><br />
                                 <input type="number" placeholder='Select Available Quantity' className='border p-3 rounded-lg dark:bg-[#031156]' value={link.quantity}
                                onChange={(e) => {
                                  const updatedDetail = [...detail];
                                 updatedDetail[linkIndex].quantity = e.target.value;
                                 setDetail(updatedDetail);
                                }} />
                                
                                <div className='mt-5 mb-4'>
                      <p className='flex items-center text-[16px] dark:text-white text-black cursor-pointer'
                      onClick={() => {
                        setDetail([...detail, {color: "", price: 0, quantity:0}]);
                    
                      }}>
                        {/* <BsLink45Deg className="mr-2" />*/}
                        Add same product with different color if available 
                      </p>
                    </div>
                      </div>
                      
              
          ))}
                    <br />
                    
          
        
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            <div className='hover:text-[#0000FF]'>
            <button
            disabled={loading || uploading}
            className={`p-3 w-full btn hover:text-[#0000FF] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ${styles.button}`}
          >
            {id ? 'Update Product' : 'Create Product'}
          </button>
            </div>
         
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
export default CreateProduct;