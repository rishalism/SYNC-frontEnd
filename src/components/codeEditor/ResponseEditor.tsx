import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

function ResponseEditor({ value, setValue }: any) {
    return <CodeMirror value={value} className='text-black  min-h-[150px]' extensions={[json()]} onChange={(value) => setValue(value)} />;
}
export default ResponseEditor;
