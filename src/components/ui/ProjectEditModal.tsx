import { Modal } from "flowbite-react";
import { Input } from "./input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "./button";
import { useFormik } from "formik";
import { NewProjectSchema } from "@/validations/formvalidation";
import errorHandler from "@/middlewares/errorHandler";
import { editProject } from "@/api/projectsApi";
import { useContext, useEffect } from "react";
import ProjectContext from "@/context/projectContext";

function ProjectEditModal({ openModal, setOpenModal }: any) {
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth);
    const { projects, selected, setSelected }: any = useContext(ProjectContext);

    interface FormValues {
        projectName: string;
        description: string;
    }

    const formik = useFormik<FormValues>({
        initialValues: {
            projectName: "",
            description: "",
        },
        validationSchema: NewProjectSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const projectDetails = {
                    projectName: values.projectName,
                    description: values.description,
                    projectOwner: ProjectleadInfo?.id,
                };
                const updatedProject = await editProject(selected._id, projectDetails);
                if (updatedProject) {
                    setOpenModal(false);
                }
            } catch (error) {
                errorHandler(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        formik.setValues({
            projectName: selected?.projectName,
            description: selected?.description,
        });
    }, [selected]);

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h2 className="capitalize font-bold">Edit Project</h2>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-3">
                            <span className={`${formik.errors.projectName && formik.touched.projectName ? 'text-red-500' : 'text-neutral-400'} `}>
                                Project Title
                            </span>
                            <Input
                                placeholder="Enter project title"
                                id="projectName"
                                value={formik.values.projectName}
                                type="text"
                                onChange={formik.handleChange}
                            />
                            {formik.errors.projectName && formik.touched.projectName && (
                                <p className="text-xs text-red-500">{formik.errors.projectName}</p>
                            )}
                        </div>
                        <div className="flex flex-col mt-3 gap-3">
                            <span className="text-neutral-400">Project Owner</span>
                            <Select>
                                <SelectTrigger id="ownerId" type="button" className="w-[180px]">
                                    <SelectValue placeholder={ProjectleadInfo?.name} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={ProjectleadInfo?.name || 'null'}>
                                            {ProjectleadInfo?.name}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3 mt-3">
                            <span className={`${formik.errors.description && formik.touched.description ? 'text-red-500' : 'text-neutral-400'} `}>
                                Project Description
                            </span>
                            <Textarea
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                id="description"
                                placeholder="Enter project description"
                            />
                            {formik.errors.description && formik.touched.description && (
                                <p className="text-xs text-red-500">{formik.errors.description}</p>
                            )}
                        </div>
                        <div className="mt-3">
                            <Button disabled={formik.isSubmitting} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ProjectEditModal;
