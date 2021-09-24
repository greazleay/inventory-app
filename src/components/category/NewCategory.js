import "../../assets/css/category/newCategory.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";


const CreateCategory = ({ reloadCategories }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    let history = useHistory();

    const onSubmit = async (data) => {
        try {
         await axios.post('https://inv-hub.herokuapp.com/api/categories/create', data);  
        } catch (err) {
            if (err) return console.log(`${err.name}: ${err.message}`);
        }
        await reloadCategories(true);
        setSubmitted(true);
        setTimeout(() => history.replace('/categories'), 2000);
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