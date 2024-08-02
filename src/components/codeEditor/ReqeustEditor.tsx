import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';


function ReqeustEditor({ value, setValue }: any) {
    return <CodeMirror value={value} className='text-black max-w-full  text-wrap  min-h-[150px]' extensions={[json()]} onChange={(value) => setValue(value)} />;
}

export default ReqeustEditor
