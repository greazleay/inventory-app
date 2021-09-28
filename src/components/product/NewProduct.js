import "../../assets/css/product/modifyProduct.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Convert } from "mongo-image-converter"
import axios from "axios";


const NewProduct = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    let history = useHistory();

    const onSubmit = async (data) => {
        const imageString = await Convert(data.img[0]);
        const parsedData = { ...data, img: imageString };
        try {
            axios.post('https://inv-hub.herokuapp.com/api/products/create', parsedData)    
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`);
        }
        setSubmitted(true);
        setTimeout(() => { history.replace('/products') }, 2000);
    }

    return (
        <main className="main">
            <div>
                <h1>New Product</h1>
                <hr/>
            </div>
            <form className="flex-form flex-form-mod" onSubmit={handleSubmit(onSubmit)}>
                {submitted ? <p>Success!!! Category created, redirecting....</p> : null}
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input {...register('name', { required: "NAME REQUIRED", minLength: 1 })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <textarea className="txt" {...register('description', { required: true, minLength: 1 })} />
                    {errors.description && <p>Please add a brief description</p>}
                </fieldset>
                <fieldset>
                    {props.categories.map(category =>
                        <div key={category.id}>
                            <label htmlFor={category.name}>{category.name}</label>
                            <input type='checkbox' value={category.id} {...register('categories')} />
                        </div>
                    )}
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Price</label>
                    <input {...register('price', { required: "PRICE REQUIRED", minLength: 1 })} />
                    {errors.price && <p>{errors.price.message}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="stock">Stock</label>
                    <input {...register('stock', { required: "STOCK REQUIRED", minLength: 1 })} />
                    {errors.stock && <p>{errors.stock.message}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="img">Image</label>
                    <input className="choose" {...register('img', { required: "PLEASE UPLOAD AN IMAGE" })} type="file" accept=".png, .jpg" />
                    {errors.img && <p>{errors.img.message}</p>}
                </fieldset>
                <button className="btn" type="submit">Create</button>
            </form>
        </main>
    )
}

export default NewProduct