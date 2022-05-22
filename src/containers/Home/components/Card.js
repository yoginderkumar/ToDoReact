
import { AutoComplete, Card, Select } from "antd";


import {
    EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useState } from "react";

const TaskCard = ({ data, ondelHandler, onEditUser, getTaskStatus}) => {
    const { Option } = Select;
    const [disc, setDisc] = useState(false)


    return (
        <div style={{ marginTop: '10px' }}>
            <Card hoverable style={{ backgroundColor: '#74b9ff', width: '100%', height: 'auto' }}>
                <div style={{ position: 'relative', display: 'flex' }}>
                    <h2 style={{ margin: '-1% 0px 0px 0px', padding: 0, fontWeight: 'bold' }}>{data.TaskTitle}</h2>


                    <span style={{ display: 'block', margin: '10px' }} onClick={(e) => {
                        e.stopPropagation()
                        setDisc(prevState => !prevState)
                    }}>{disc ? '-Show Less' : '-Read Discreption'}</span>


                    <div style={{ width: '50%', position: 'absolute', right: 0, top: '-20%', display: 'flex', justifyContent: 'center' }}>

                        <ul style={{ margin: 0, padding: 0 }}>
                            <li style={{ marginLeft: '60px', display: 'inline-block', listStyle: 'none' }}><Select onChange={(e) => getTaskStatus(e)} defaultValue="Status" style={{ width: 120, backgroundColor: '#55efc4' }}>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="Completed">Completed</Option>
                            </Select></li>
                            <li style={{ marginLeft: '60px', display: 'inline-block', listStyle: 'none' }}>  <h2><EditOutlined onClick={() => onEditUser(data)} /></h2></li>
                            <li style={{ marginLeft: '60px', display: 'inline-block', listStyle: 'none' }}><h2><DeleteOutlined onClick={() => ondelHandler(data)} /></h2></li>
                        </ul>

                    </div>

                </div>

                {
                    disc ? <div style={{ padding: 20, margin: '0px auto 0px auto', width: '80%', fontSize: '16px' }}>
                        <p>{data.TaskDisc}</p>
                    </div> : null
                }


            </Card >
        </div>
    )
}

export default TaskCard;