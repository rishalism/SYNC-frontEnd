
import { Button } from "@nextui-org/react";
import { Modal } from "flowbite-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./input";
import { GoPlus, GoTrash } from "react-icons/go";
import { useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { NewCollectionSchema } from "@/validations/formvalidation";
import { CollectionState, NewCollectionModalProps } from "@/types/interfaces/IdbDesign";
import { Node } from "@xyflow/react";

interface Field {
    key: string;
    type: string;
}

interface FormValues {
    collectionName: string;
    fields: Field[];
}

interface FormikErrors {
    collectionName?: string;
    fields?: Array<{ key?: string; type?: string } | string>;
}

interface FormikTouched {
    collectionName?: boolean;
    fields?: Array<{ key?: boolean; type?: boolean }>;
}

function NewCollectionModal({ openModal, setOpenModal, onAddCollection }: NewCollectionModalProps) {

    // const [fields, setFields] = useState([{ key: '', type: 'STRING' }]);

    // form vaidations 
    const initialValues: FormValues = {
        collectionName: '',
        fields: [{ key: '', type: 'STRING' }]
    };

    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema: NewCollectionSchema,
        onSubmit: (values) => {
            const collectionData: CollectionState = {
                collectionName: values.collectionName,
                fields: values.fields
            };

            onAddCollection(collectionData);
            setOpenModal(false);
        },
    });


    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = formik;


    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>New Collection</Modal.Header>
                <Modal.Body>
                    <FormikProvider value={formik}>
                        <form onSubmit={handleSubmit} className="flex  flex-col ">
                            <div className="space-y-2  p-1">
                                <div className="flex flex-col gap-2">
                                    <span className="capitalize text-lg">Collection Name</span>
                                    <Input
                                        id="collectionName"
                                        name="collectionName"
                                        value={values.collectionName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter a collection name"
                                        className={
                                            touched.collectionName && errors.collectionName ? "border-red-500" : ""
                                        }
                                    />
                                    {touched.collectionName && errors.collectionName ? (
                                        <div className="text-red-500 text-sm">{errors.collectionName}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <FieldArray name="fields">
                                        {({ push, remove }) => (
                                            <>
                                                {values.fields.map((field, index) => (
                                                    <div key={index} className="w-full flex flex-row gap-2 items-center">
                                                        <Input
                                                            name={`fields[${index}].key`}
                                                            value={field.key}
                                                            onChange={(e) => setFieldValue(`fields[${index}].key`, e.target.value)}
                                                            onBlur={handleBlur}
                                                            type="text"
                                                            placeholder="Enter key"
                                                            className={
                                                                touched.fields?.[index]?.key &&
                                                                    (typeof errors.fields?.[index] === 'object' && errors.fields[index]?.key)
                                                                    ? "border-red-500"
                                                                    : ""
                                                            }
                                                        />
                                                        {touched.fields?.[index]?.key &&
                                                            (typeof errors.fields?.[index] === 'object' && errors.fields[index]?.key) ? (
                                                            <div className="text-red-500 text-sm">
                                                                {(errors.fields[index] as { key?: string })?.key}
                                                            </div>
                                                        ) : null}
                                                        <div className="w-1/3 flex-col gap-2 flex">
                                                            <Select
                                                                value={field.type}
                                                                onValueChange={(value) =>
                                                                    setFieldValue(`fields[${index}].type`, value)
                                                                }
                                                            >
                                                                <SelectTrigger className="max-w-[150px] border-2">
                                                                    <SelectValue placeholder="Types" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="STRING">String</SelectItem>
                                                                        <SelectItem value="NUMBER">Number</SelectItem>
                                                                        <SelectItem value="BOOLEAN">Boolean</SelectItem>
                                                                        <SelectItem value="ARRAY">Array</SelectItem>
                                                                        <SelectItem value="OBJECT">Object</SelectItem>
                                                                        <SelectItem value="DATE">Date</SelectItem>
                                                                        <SelectItem value="BINARY">Binary</SelectItem>
                                                                        <SelectItem value="UUID">UUID</SelectItem>
                                                                        <SelectItem value="FLOAT">Float</SelectItem>
                                                                        <SelectItem value="DOUBLE">Double</SelectItem>
                                                                        <SelectItem value="DECIMAL">Decimal</SelectItem>
                                                                        <SelectItem value="TIMESTAMP">Timestamp</SelectItem>
                                                                        <SelectItem value="JSON">JSON</SelectItem>
                                                                        <SelectItem value="ENUM">Enum</SelectItem>
                                                                        <SelectItem value="ID">ID</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <Button className="w-1/1" color="default" onClick={() => remove(index)}>
                                                            <GoTrash />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button className="w-1/4" color="secondary" onClick={() => push({ key: '', type: 'STRING' })}>
                                                    <GoPlus />
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                            <Modal.Footer className="flex w-full justify-start pl-1">
                                <Button color="primary" className="rounded-lg" onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button color="default" className="rounded-lg" type="submit">
                                    Save
                                </Button>
                            </Modal.Footer>
                        </form>
                    </FormikProvider>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewCollectionModal
