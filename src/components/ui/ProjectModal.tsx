import { Modal } from "flowbite-react";
import { Input } from "./input";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "./button";
import { useFormik } from "formik";
import { NewProjectSchema } from "@/validations/formvalidation";
import errorHandler from "@/middlewares/errorHandler";
import { createProject } from "@/api/projectsApi";

function ProjectModal({ setOpenModal, openModal }: any) {

    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)


    interface FormValues {
        projectName: string;
        description: string;
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<FormValues>({
        initialValues: {
            projectName: '',
            description: '',
        },
        validationSchema: NewProjectSchema,
        onSubmit: async (values) => {
            const projectdetails = {
                projectName: values.projectName,
                description: values.description,
                projectOwner: ProjectleadInfo?.id
            }
            try {
                const response = await createProject(projectdetails)
                if (response) {
                    setOpenModal(false)
                }
            } catch (error) {
                errorHandler(error)
            }
        }
    });

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <h2 className="capitalize font-bold">Create a New Project</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <span className={`${errors.projectName && touched.projectName ? 'text-red-500' : 'text-neutral-400'} `}>Project Title</span>
                                <Input placeholder="Enter Project Name" id="projectName" value={values.projectName} type="text" onChange={handleChange} onBlur={handleBlur} />
                                {errors.projectName && touched.projectName && <p className="text-xs text-red-500">{errors.projectName}</p>}
                            </div>
                            <div className="flex flex-col mt-3 gap-3">
                                <span className="text-neutral-400'">Project Owner</span>
                                <Select>
                                    <SelectTrigger id="ownerId" type="button" className="w-[180px]">
                                        <SelectValue placeholder={ProjectleadInfo?.name} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={ProjectleadInfo?.name || 'null'}>{ProjectleadInfo?.name}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3 mt-3">
                                <span className={`${errors.description && touched.description ? 'text-red-500' : 'text-neutral-400'} `}>Project Description</span>
                                <Textarea onChange={handleChange} onBlur={handleBlur} value={values.description} id="description" placeholder="Write a project description....."></Textarea>
                                {errors.description && touched.description && <p className="text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="mt-3">
                                <Button disabled={isSubmitting} type="submit">Create</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProjectModal
