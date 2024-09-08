import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";
import { FormField } from "@/types";
import AutoForm from "../../AutoForm";

Modal.setAppElement("body");

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    formTitle?: string;
    formFields: FormField[];
    route: string;
}

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    formTitle,
    formFields,
    route,
}) => {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={formTitle}
        >
            <h2>{formTitle}</h2>
            <AutoForm formFields={formFields} route={route} onSubmitSuccess={onClose}/>
            <button className="bg-red-500 rounded mt-4 text-white py-2 w-full" type="button" onClick={onClose}>
                Cancel
            </button>
        </Modal>
    );
};

export default ModalForm;
