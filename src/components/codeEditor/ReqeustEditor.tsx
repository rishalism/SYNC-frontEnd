import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';


function ReqeustEditor({ value, setValue }: any) {
    return <CodeMirror value={value} className='text-black overflow-x-auto min-h-[150px]' extensions={[json()]} onChange={(value) => setValue(value)} />;
}

export default ReqeustEditor
