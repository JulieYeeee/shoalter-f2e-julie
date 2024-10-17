"use client";
import { List } from "antd";
function Recommendation() {
    return <div>
        <h1>Recommendation</h1>
        <List
            dataSource={[1, 7, 8, 2, 3,]}
            grid={{ gutter: 1, column: 4 }}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </div >
}

export default Recommendation