import "../../assets/css/product/modifyProduct.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Convert } from 'mongo-image-converter';
import axios from "axios";

const ModifyProduct = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [product, setProduct] = useState({});
    const [changeImage, setChangeImage] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')));
        setLoadingProduct(false);
    }, [])

    const onSubmit = async (data) => {
        let parsedData;
        if (changeImage) {
            const imageString = await Convert(data.img[0]);
            parsedData = { ...data, img: imageString };
        } else {
            parsedData = data
        }

        try {
            axios.put(`https://inv-hub.herokuapp.com/api/products/${product._id}/update`, parsedData);    
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`)
        }
        setSubmitted(true);
        setTimeout(() => { history.replace(`/products/${product._id}`) }, 2000);
    }

    const handleClick = () => {
        if (!changeImage) {
            setChangeImage(true);
        } else {
            setChangeImage(false);
        }
    }

    const form = () => (
        <form className="flex-form" onSubmit={handleSubmit(onSubmit)}>
            {submitted ? <p>Success!!! Product Modified, redirecting....</p> : null}
            <fieldset>
                <label htmlFor="name">Name</label>
                <input {...register('name', { required: "NAME REQUIRED", minLength: 1, value: `${product.name}` })} />
                {errors.name && <p>{errors.name.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <textarea className="txt" {...register('description', { required: true, minLength: 1, value: `${product.description}` })} />
                {errors.description && <p>Please add a brief description</p>}
            </fieldset>
            <fieldset>
                <label>Categories:</label>
                {props.categoryList.map(category =>
                    <div key={category.id}>
                        <label htmlFor={category.name}>{category.name}</label>
                        <input type='checkbox' value={category.id} {...register('categories')} defaultChecked={product.categories.map(cat => cat._id).includes(category.id)}/>
                    </div>
                )}
            </fieldset>
            <fieldset>
                <label htmlFor="price">Price</label>
                <input {...register('price', { required: "PRICE REQUIRED", minLength: 1, value: `${product.price}` })} />
                {errors.price && <p>{errors.price.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="stock">Stock </label>
                <input {...register('stock', { required: "STOCK REQUIRED", minLength: 1, value: `${product.stock}` })} />
                {errors.stock && <p>{errors.stock.message}</p>}
            </fieldset>
            <fieldset>
                <label>Change Image:</label>
                <input className="btn" type="button" value={changeImage ? 'NO' : 'YES'} onClick={handleClick} />
            </fieldset>
            {changeImage && <fieldset>
                <label htmlFor="img">Image</label>
                <input className="choose" {...register('img', { required: "PLEASE UPLOAD PRODUCT IMAGE" })} type="file" accept=".png, .jpg" />
                {errors.img && <p>{errors.img.message}</p>}
            </fieldset>}
            <button className="btn" type="submit">Modify</button>
        </form>
    )

    return (
        <main className="main">
            <div>
                <h1>Modify Product</h1>
                <hr/>
            </div>
            {loadingProduct ? <p>Loading Product......</p> : form()}
        </main>
    )
}

export default ModifyProduct