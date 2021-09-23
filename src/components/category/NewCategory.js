import "../../assets/css/category/newCategory.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";


const CreateCategory = ({ reloadCategories }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [reload, setReload] = useState(false);
    let history = useHistory();

    const onSubmit = (data) => {
        axios.post('https://inv-hub.herokuapp.com/api/categories/create', data)
            .then(setTimeout(() => {
                history.push('/categories')
            }, 2000))
            .catch((err) => {
                console.log(err.message);
                return
            })
        setSubmitted(true);
        let toggler = reload ? false : true
        setReload(toggler);
        reloadCategories(toggler)
        console.log('===toggler====>', toggler)
    }

    return (
        <main className="new-category">
            <form onSubmit={handleSubmit(onSubmit)}>
                {submitted && <p>Success!!! Category created, redirecting...</p>}
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input {...register('name', { required: "NAME REQUIRED", minLength: 1 })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <textarea {...register('description', { required: "PLEASE ADD A BRIEF DESCRIPTION", minLength: 1 })} />
                    {errors.description && <p>{errors.description.message}</p>}
                </fieldset>
                <button type="submit">Create</button>
            </form>
        </main>
    )
}

export default CreateCategory