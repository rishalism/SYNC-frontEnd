import { RootState } from '@/app/store';
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
    const roomID = getUrlParams().get('roomID') || randomID(5)
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const url = `${import.meta.env.VITE_CLIENT_URL}/Meet/true?roomID=${roomID}`

    
    const navigate = useNavigate()


    const handleMeetingEnd = useCallback(async (zp: any) => {
        navigate(`/Meet/${currentProjectInfo._id}`)
        location.reload()
        // Dispatch action to remove meeting data from Redux state
        if (zp) {
            zp.destroy();
        }
    }, [dispatch, roomID]);




    let myMeeting = async (element: any) => {
        // generate Kit Token
        const appID = 1688337139;
        const serverSecret: string | undefined = import.meta.env.VITE_SERVER_SECRET;
        const userName = ProjectleadInfo?.name || TeamMemberInfo?.name
        const userId = ProjectleadInfo?.id || TeamMemberInfo?.id || randomID(5)
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userId, userName);

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            showPreJoinView: true,
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

