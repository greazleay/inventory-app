import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Convert } from 'mongo-image-converter';
import axios from "axios";


const ModifyProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    const [loadingData, setLoadingData] = useState(true)
    const [product, setProduct] = useState({});
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')))
        setLoadingData(false)
    }, [])

    const onSubmit = async (data) => {
        const imageString = await Convert(data.img[0]);
        const parsedData = {...data, img: imageString};
        axios.put(`https://inv-hub.herokuapp.com/api/products/${product._id}/update`, parsedData)
            .then(setTimeout(() => { history.push(`/products/${product._id}`) }, 2000))
        setSubmitted(true)
    }

    const form = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            {submitted ? <p>Success!!! Product Modified</p> : null}
            <fieldset>
                <label htmlFor="name">Name</label>
                <input {...register('name', { required: "NAME REQUIRED", minLength: 1, value: `${product.name}` })} />
                {errors.name && <p>{errors.name.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <textarea {...register('description', { required: true, minLength: 1, value: `${product.description}` })} />
                {errors.description && <p>Please add a brief description</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="price">Price</label>
                <input {...register('price', { required: "PRICE REQUIRED", minLength: 1, value: `${product.price}` })} />
                {errors.price && <p>{errors.price.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="stock">Stock</label>
                <input {...register('stock', { required: "STOCK REQUIRED", minLength: 1, value: `${product.stock}` })} />
                {errors.stock && <p>{errors.stock.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="img">Image</label>
                <input {...register('img', { value: `${product.img}` })} type="file" />
                {errors.img && <p>{errors.img.message}</p>}
            </fieldset>
            <button type="submit">Modify</button>
        </form>
    )

    return (
        <main>
            {loadingData ? <p>Please Wait......</p> : form()}
        </main>
    )
}

export default ModifyProduct