import { Form, Input } from "antd";
import { useEffect } from "react";
import { updateKeyword } from "@/lib/features/searchResultSlice";
import { useAppDispatch } from "@/lib/hooks";

function SearchBar() {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm<{ keyword: string }>();
    const keyword = Form.useWatch('keyword', form);

    useEffect(() => {
        if (keyword && keyword.trim()) {
            dispatch(updateKeyword(keyword))
        } else {
            dispatch(updateKeyword(""))
        }
    }, [keyword])

    return <div>
        <h1>Search Bar</h1>
        <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item name="keyword" label="">
                <Input />
            </Form.Item>
        </Form>
    </div>
}

export default SearchBar