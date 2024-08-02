
import { Checkbox } from "@nextui-org/react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@nextui-org/react'
import { IoRocketOutline } from "react-icons/io5";
import EmptyApiPage from "@/components/EmptyApiPage";
import { useState } from "react";
import { useFormik } from "formik";
import { urlValidationSchema } from "@/validations/formvalidation";
import { saveApi, sendTestingApi } from "@/api/apiToolApi";
import ResponseEditor from "@/components/codeEditor/ResponseEditor";
import ReqeustEditor from "@/components/codeEditor/ReqeustEditor";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa6";
import { AxiosRequestHeaders } from "axios";
import { greenStatusCodes, redStatusCodes } from "@/utils/status";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import HistoryTab from "@/components/ui/HistoryTab";



function ApiTestingPage() {

    const [method, setMethod] = useState('GET')
    const [request, setRequest] = useState('{}')
    const [response, setResponse] = useState('')
    const [status, setStatus] = useState('')
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);
    const [params, setParams] = useState([{ key: '', value: '' }])
    const [size, setSize] = useState('')
    const [time, setTime] = useState('')
    const [isloading, setisloading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const { projectId } = useParams();
    const [stateData, SaveStateData] = useState([])

    const { handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting } = useFormik({
        initialValues: {
            url: ''
        }, validationSchema: urlValidationSchema,
        onSubmit: async (values) => {
            setisloading(true)
            const headersObject: AxiosRequestHeaders = headers.reduce((acc, { key, value }) => {
                acc[key] = value;
                return acc;
            }, {} as AxiosRequestHeaders);

            const paramsObject: Record<string, string> = params.reduce((acc, { key, value }) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, string>);


            const data = {
                url: values.url,
                method: method,
                headers: headersObject,
                body: request,
                queryParams: paramsObject
            }
            const response: any = await sendTestingApi(data)
            setisloading(false)
            const responsedata = formatJSONResponse(response.data.body)
            const bytes = new Blob([JSON.stringify(responsedata)]).size;
            setTime(response.data.time)
            setStatus(response.data.status)
            setResponse(responsedata)
            setSize(String(bytes))
        }
    })



    const isRed = redStatusCodes.includes(Number(status));
    const isGreen = greenStatusCodes.includes(Number(status));


    const addHeadersRow = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const addParamsRow = () => {
        setParams([...params, { key: '', value: '' }]);
    };

    function formatJSONResponse(response: any) {
        let jsonString = JSON.stringify(response, null, 2);
        return jsonString
    }


    async function handleSave() {
        const data = {
            projectId: projectId,
            url: values.url,
            method: method,
            headers: headers,
            body: request,
            queryParams: params,
        }
        const response = await saveApi(data)
        if (response) {
            toast.success('Saved', { position: 'top-center' })
            setIsSaved(!isSaved)
        }
    }

    return (
        <div className='w-full mt-12 relative flex justify-center pl-28'>
            <HistoryTab isSaved={isSaved} stateData={stateData} SaveStateData={SaveStateData} />
            <div className="min-w-[700px] max-w-[700px] flex mt-12 flex-col space-y-4  ">
                <div>
                    <form className="flex justify-evenly space-x-3 w-full" onSubmit={handleSubmit}>
                        <Select value={method} onValueChange={(value: string) => setMethod(value)} >
                            <SelectTrigger className="max-w-[150px] border-2 ">
                                <SelectValue placeholder="GET" />
                            </SelectTrigger>
                            <SelectContent defaultValue={'GET'}>
                                <SelectGroup >
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem value="POST">POST</SelectItem>
                                    <SelectItem value="PUT">PUT</SelectItem>
                                    <SelectItem value="DELETE">DELETE</SelectItem>
                                    <SelectItem value="PATCH">PATCH</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex flex-col w-full space-y-2">
                            <Input value={values.url} id="url" name="url" onChange={handleChange} onBlur={handleBlur} className="border-2" placeholder="https://example.com" />
                            {errors.url && touched.url && <p className="text-xs text-red-500">{errors.url}</p>}
                        </div>
                        <Button type="submit" isDisabled={isSubmitting} color="primary" size="md" className="rounded-sm" endContent={<IoRocketOutline />} > Send</Button>
                    </form>
                </div>
                <div className="w-full text-wrap overflow-x-hidden whitespace-normal break-words">
                    <Tabs defaultValue="params" className="w-full">
                        <TabsList className="w-full" >
                            <div className="flex items-center justify-between w-full  " >
                                <div>
                                    <TabsTrigger value="params">Query Params</TabsTrigger>
                                    <TabsTrigger value="Headers">Headers</TabsTrigger>
                                    <TabsTrigger value="Json">Json</TabsTrigger>
                                </div>
                                <Button onClick={handleSave} variant="ghost" className="border-none rounded-md" >save</Button>
                            </div>
                        </TabsList>
                        <TabsContent className="w-full  h-[200px] border-2" value="Headers">
                            {headers.map((row, index) => (
                                <div key={index} className="flex space-x-2 flex-row items-center p-4">
                                    <Checkbox value={`KEY${index + 1}`}></Checkbox>
                                    <Input
                                        className="w-36 h-8"
                                        placeholder="KEY"
                                        value={row.key}
                                        onChange={(e) => {
                                            const newRows = [...headers];
                                            newRows[index].key = e.target.value;
                                            setHeaders(newRows);
                                        }}
                                    />
                                    <Input
                                        className="h-8"
                                        placeholder="VALUE"
                                        value={row.value}
                                        onChange={(e) => {
                                            const newRows = [...headers];
                                            newRows[index].value = e.target.value;
                                            setHeaders(newRows);
                                        }}
                                    />
                                </div>
                            ))}
                            <Button isIconOnly size="sm" className="rounded-sm ml-3 mt-1" onClick={addHeadersRow}>
                                <FaPlus />
                            </Button>
                        </TabsContent>
                        <TabsContent className="w-full h-[200px] overflow-x-auto border-2" value="params">
                            {params.map((row, index) => (
                                <div key={index} className="flex space-x-2 flex-row items-center p-4">
                                    <Checkbox value={`KEY${index + 1}`}></Checkbox>
                                    <Input
                                        className="w-36 h-8"
                                        placeholder="KEY"
                                        value={row.key}
                                        onChange={(e) => {
                                            const newRows = [...params];
                                            newRows[index].key = e.target.value;
                                            setParams(newRows);
                                        }}
                                    />
                                    <Input
                                        className="h-8"
                                        placeholder="VALUE"
                                        value={row.value}
                                        onChange={(e) => {
                                            const newRows = [...params];
                                            newRows[index].value = e.target.value;
                                            setParams(newRows);
                                        }}
                                    />
                                </div>
                            ))}
                            <Button isIconOnly size="sm" className="rounded-sm ml-3 mt-1" onClick={addParamsRow}>
                                <FaPlus />
                            </Button>
                        </TabsContent>
                        <TabsContent className="w-full h-[200px] border-2 whitespace-normal break-words text-wrap " value="Json">
                            <ReqeustEditor value={request} setValue={setRequest} />
                        </TabsContent>
                    </Tabs>
                </div>
                <div >
                    <Tabs defaultValue="response" className="w-full">
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="response">Response</TabsTrigger>
                            </TabsList>
                            <span className={`${isGreen ? 'text-green-500' : ''} ${isRed ? 'text-red-600' : ''} font-semibold text-sm flex items-center justify-between space-x-4 capitalize`}>
                                <span>status: {status}</span>
                                <span >size : {size} bytes</span>
                                <span>time : {time}ms</span>
                            </span>
                        </div>
                        <div className="w-full text-wrap overflow-x-hidden whitespace-normal break-words">
                            {isloading ? <EmptyApiPage /> : <TabsContent className="w-full h-[160px] border-2 whitespace-normal break-words text-wrap " value="response"><ResponseEditor value={response} setValue={setResponse} /></TabsContent>
                            }
                        </div>
                    </Tabs>
                </div>
            </div >
        </div >
    )
}

export default ApiTestingPage 
