import "../../assets/css/NewCategory.css"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import axios from "axios";


const CreateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    let history = useHistory();

    const onSubmit = (data) => {
        axios.post('https://inv-hub.herokuapp.com/api/categories/create', data)
            .then(setTimeout(() => {
                history.push('/categories')
            }, 2000))
        setSubmitted(true)
    }

    return (
        <main className="new-category">
            <form onSubmit={handleSubmit(onSubmit)}>
                {submitted ? <p>Success! Category created</p> : null}
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input {...register('name', { required: "NAME REQUIRED", minLength: 1 })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <textarea {...register('description', { required: true, minLength: 1 })} />
                    {errors.description && <p>Please add a brief description</p>}
                </fieldset>
                <button type="submit">Create</button>
            </form>
        </main>
    )
}

export default CreateCategory