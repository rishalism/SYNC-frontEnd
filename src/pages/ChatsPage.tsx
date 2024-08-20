import { Avatar, AvatarGroup, Button } from "@nextui-org/react"
import { IoSendOutline } from "react-icons/io5";

function ChatsPage() {
    return (
        <div className="w-full mt-12 flex items-center p-5 rounded-xl gap-5 justify-center ">
            <div className="w-1/3  flex-col p-2 gap-3 overflow-y-auto hideScrollbar    h-full rounded-tl-xl rounded-xl shadow-sm shadow-foreground-400  flex">
                <div className="w-full shadow-content4 shadow-sm rounded-md max-h-16 space-x-3 flex p-2">
                    <Avatar />
                    <div className="flex-col flex justify-center">
                        <span className="text-medium">Username</span>
                        <span className="text-xs">role</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col relative pb-2  h-full  rounded-xl shadow-sm shadow-foreground-400 ">
                <div className="w-full p-3 items-center flex flex-row justify-between max-h-16 rounded-t-xl border-b-1 border-neutral-400">
                    <div>
                        <h1 className="text-2xl capitalize ">project title</h1>
                    </div>
                    <div>
                        <AvatarGroup max={4}>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                            <Avatar></Avatar>
                        </AvatarGroup>
                    </div>
                </div>
                <div className="w-full bg-red-200">

                </div>
                <div className="w-full flex flex-row absolute bottom-0 max-h-10 ">
                    <input className="w-full border-neutral-300 rounded-bl-lg h-10"  type="text" placeholder="start typing..." />
                    <Button  color="primary" className="rounded-none rounded-br-lg  rounded-tr-lg h-10"><IoSendOutline/></Button>
                </div>
            </div>
        </div>
    )
}

export default ChatsPage
