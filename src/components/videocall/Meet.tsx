import { MeetingEnded, Meetingstarted } from '@/api/meetApi';
import { RootState } from '@/app/store';
import { createMeeting, DeleteMeeting } from '@/redux/slices/Meetings';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function randomID(len: number) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function Meet() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)
    const dispatch = useDispatch()
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID

    const navigate = useNavigate()


    const handleMeetingEnd = useCallback(async (zp: any) => {
        // Dispatch action to remove meeting data from Redux state
        if (zp) {
            zp.destroy();
        }
        // const isDeleted = await MeetingEnded({ projectId: currentProjectInfo._id, MeetLink: url })
        dispatch(DeleteMeeting(url));
    }, [dispatch, roomID]);


    function GoTohomeScreen() {
        navigate(`/Meet/${currentProjectInfo._id}`)
    }

    let myMeeting = async (element: any) => {
        // generate Kit Token
        const appID = 1688337139;
        const serverSecret: string | undefined = import.meta.env.VITE_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        // await Meetingstarted({ projectId: currentProjectInfo._id, MeetLink: url })
        dispatch(createMeeting({ projectId: currentProjectInfo._id, MeetLink: url }))
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'copy link',
                    url: url,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            onLeaveRoom: () => handleMeetingEnd(zp),
            onReturnToHomeScreenClicked: GoTohomeScreen
        });


    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
}

