
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
import { GoPlus } from "react-icons/go";
import { Button } from '@nextui-org/react'
import { IoRocketOutline } from "react-icons/io5";
import EmptyApiPage from "@/components/EmptyApiPage";
import { useState } from "react";
import { useFormik } from "formik";
import { urlValidationSchema } from "@/validations/formvalidation";
import { sendTestingApi } from "@/api/apiToolApi";
import ResponseEditor from "@/components/codeEditor/ResponseEditor";
import ReqeustEditor from "@/components/codeEditor/ReqeustEditor";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa6";
import { AxiosRequestHeaders } from "axios";



function ApiTestingPage() {

    const [method, setMethod] = useState('GET')
    const [request, setRequest] = useState('{}')
    const [response, setResponse] = useState('')
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);
    const [params, setParams] = useState([{ key: '', value: '' }])



    const { handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting } = useFormik({
        initialValues: {
            url: ''
        }, validationSchema: urlValidationSchema,
        onSubmit: async (values) => {

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
            console.log(response);
            setResponse(JSON.stringify(response.data))
        }
    })

    const addHeadersRow = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const addParamsRow = () => {
        setParams([...params, { key: '', value: '' }]);
    };
    return (
        <div className='w-full mt-12 relative flex justify-center pl-28'>
            <div className="w-52 h-full border-r-2  absolute left-2">
                <div className="p-4 w-full border-b-1 ">
                    <Button className="w-full rounded-sm" size="md" endContent={<GoPlus />} > New Request</Button>
                </div>
            </div>
            <div className="min-w-[700px] max-w-[700px] flex mt-12 flex-col space-y-4  ">
                {/* <EmptyApiPage /> */}
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
                <div>
                    <Tabs defaultValue="params" className="w-full">
                        <TabsList>
                            <TabsTrigger value="params">Query Params</TabsTrigger>
                            <TabsTrigger value="Headers">Headers</TabsTrigger>
                            <TabsTrigger value="Json">Json</TabsTrigger>
                        </TabsList>
                        <TabsContent className="w-full overflow-x-auto h-[200px] border-2" value="Headers">
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
                        <TabsContent className="w-full h-[200px] border-2" value="Json">
                            <ReqeustEditor value={request} setValue={setRequest} />
                        </TabsContent>
                    </Tabs>
                </div>
                <div >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList>
                            <TabsTrigger value="response">Response</TabsTrigger>
                        </TabsList>
                        <div className="w-full overflow-x-auto">
                            <TabsContent className="w-full h-[160px] border-2" value="response"><ResponseEditor value={response} setValue={setResponse} /></TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ApiTestingPage 
