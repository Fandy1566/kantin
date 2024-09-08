import { FormField } from "@/types";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

interface AutoFormProps {
    formFields: FormField[];
    route: string;
    onSubmitSuccess?: () => void;
}

const AutoForm: React.FC<AutoFormProps> = ({
    formFields,
    route,
    onSubmitSuccess,
}) => {
    const initialValues: { [key: string]: string | File | null } = {};

    formFields.forEach((formField) => {
        initialValues[formField.name] =
            formField.type === "file"
                ? null
                : formField.value
                ? formField.value
                : "";
    });

    const [values, setValues] = useState({
        ...initialValues,
    });

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const key = e.target.name;
        const value =
            e.target.type === "file"
                ? (e.target as HTMLInputElement).files?.[0] || null
                : e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key] !== null) {
                formData.append(key, values[key] as string | Blob);
            }
        });
        router.post(route, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            },
        });
    };

    const renderField = (fields: FormField) => {
        switch (fields.type) {
            case "text":
                return (
                    <input
                        className=""
                        type="text"
                        id={fields.id}
                        name={fields.name}
                        value={values[fields.name] as string}
                        onChange={handleChange}
                        required={fields.required}
                    />
                );
            case "textarea":
                return (
                    <textarea
                        className="bg-white border-gray-200 text-sm text-gray-600 rounded-lg"
                        name={fields.name}
                        value={values[fields.name] as string}
                        onChange={handleChange}
                        required={fields.required}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {formFields.map((formField) => (
                <div className="flex flex-col" key={formField.name}>
                    <label>{formField.label}</label>

                    {formField.type === "textarea" ? (
                        <textarea
                            className="bg-white border-gray-200 text-sm text-gray-600 rounded-lg"
                            name={formField.name}
                            value={values[formField.name] as string}
                            onChange={handleChange}
                            required={formField.required}
                        />
                    ) : formField.type === "select" ? (
                        <select
                            className="bg-white border-gray-200 text-sm text-gray-600 rounded-lg"
                            name={formField.name}
                            value={values[formField.name] as string}
                            onChange={handleChange}
                            required={formField.required}
                        >
                            <option value="">Select an option</option>
                            {formField.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ) : formField.type === "file" ? (
                        <input
                            className="bg-white border-gray-200 text-sm text-gray-600 rounded-lg"
                            type="file"
                            name={formField.name}
                            onChange={handleChange}
                            required={formField.required}
                        />
                    ) : (
                        <input
                            className="bg-white border-gray-200 text-sm text-gray-600 rounded-lg"
                            type={formField.type}
                            name={formField.name}
                            value={values[formField.name] as string}
                            onChange={handleChange}
                            required={formField.required}
                        />
                    )}
                </div>
            ))}
            <button
                className="bg-green-500 rounded mt-4 text-white py-2"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default AutoForm;
