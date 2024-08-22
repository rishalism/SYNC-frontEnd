import { Modal } from "flowbite-react";
import { Button } from "./button";
import { useFormik } from "formik";
import { Input } from "./input";
import { inviteMembersSchema } from "@/validations/formvalidation";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { inviteTeamMember } from "@/api/projectLeadApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

function InviteModal({ openModal, setOpenModal }: any) {

    const { projectId } = useParams()
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)
    const { errors, touched, isSubmitting, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: inviteMembersSchema,
        onSubmit: async (values) => {
            if (values) {
                if (projectId == "undefined") {
                    toast.warning('please select a project', { position: 'top-center' })
                } else {
                    const data = {
                        projectId: projectId,
                        email: values.email,
                        projectOwner: ProjectleadInfo?.name
                    }
                    const response = await inviteTeamMember(data)
                    if (response) {
                        toast.success('invitaion sented')
                        setOpenModal(false)
                    }
                }
            }
        }
    })

    return (
        <div>
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg" popup>
                <Modal.Header className='p-4'>
                    <div className='flex flex-col '>
                        <h3 className="text-xl mt-3 font-medium text-gray-900 dark:text-white capitalize">Invite team member</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='flex mt-3 flex-row gap-4 '>
                                <div className="w-[310px]">
                                    <Input placeholder="mycoolfriend@gmail.com" id="email" value={values.email} type="text" onChange={handleChange} onBlur={handleBlur} />
                                    {errors.email && touched.email && <p className="text-xs ml-2 text-red-500">{errors.email}</p>}
                                </div>
                                <Button type="submit" disabled={isSubmitting} variant={'default'}>send invite</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default InviteModal
