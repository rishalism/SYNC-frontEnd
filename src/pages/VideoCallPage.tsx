import { Button } from "@nextui-org/react"
import { GoPlus } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { Link,  } from "react-router-dom";

function VideoCallPage() {


    return (
        < div className='flex flex-row p-10 space-x-6 w-full mt-12 h-92 ' >
            <div className=" flex items-start  space-y-14 justify-center flex-col w-1/2">
                <h2 className="text-4xl font-semibold">
                    video calls and meetings
                    for everyone.
                </h2>
                <p className="text-neutral-500 ">Connect, collaborate, and celebrate anywhere with Sync.
                    Seamless video calls keep your team together, no matter the distance.</p>
                <div className="flex flex-row space-x-7">
                    <Button as={Link} to={'/Meet/true'} endContent={<GoPlus />} color="primary">New meeting</Button>
                </div>
            </div>
            <div className=" p-10 flex flex-col justify-center items-end space-y-16 w-1/2">
                <div className="w-full flex space-x-4 flex-row capitalize rounded-lg shadow-xl p-3">
                    <div className="w-[60px]">
                        <IoShieldCheckmark className="w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">your meetig is safe</h2>
                        <p className="text-sm">no one can join a meetings unless invited or admitted by the host.</p>
                    </div>
                </div>
                <div>
                    <div className="w-full flex space-x-4 flex-row capitalize rounded-lg shadow-xl p-3">
                        <div className="w-[60px]">
                            <IoShieldCheckmark className="w-full h-full" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold">your meetig is safe</h2>
                            <p className="text-sm">no one can join a meetings unless invited or admitted by the host.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VideoCallPage
