import "../../assets/css/category/newCategory.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";


const ModifyCategory = ({ refetchCategories }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    const [loadingData, setLoadingData] = useState(true)
    const [category, setCategory] = useState({});
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setCategory(JSON.parse(localStorage.getItem('category')))
        setLoadingData(false)
    }, [])

    const onSubmit = async (data) => {
        try {
            await axios.put(`https://inv-hub.herokuapp.com/api/categories/${category._id}/update`, data);
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`)
        };
        await refetchCategories(true)
        setSubmitted(true);
        setTimeout(() => { history.replace(`/categories/${category._id}`) }, 2000);
    }

    const form = () => (
        <form className="flex-form" onSubmit={handleSubmit(onSubmit)}>
            {submitted && <p>Success!!! Category Modified, redirecting....</p>}
            <fieldset>
                <label htmlFor="name">Name</label>
                <input {...register('name', { required: "NAME REQUIRED", minLength: 1, value: `${category.name}` })} />
                {errors.name && <p>{errors.name.message}</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <textarea {...register('description', { required: "PLEASE ADD A BRIEF DESCRIPTION", minLength: 1, value: `${category.description}` })} />
                {errors.description && <p>{errors.description.message}</p>}
            </fieldset>
            <button className="btn" type="submit">Modify</button>
        </form>
    )

    return (
        <main className="new-category">
            <div>
                <h1>Modify Category</h1><hr />
            </div>
            {loadingData ? <p>Please Wait......</p> : form()}
        </main>
    )
}

export default ModifyCategory