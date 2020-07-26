import {Button, Modal, Input, Checkbox, DatePicker, Radio, Row, Col, Form, Alert} from "antd";
import PhoneInput from 'react-phone-number-input';
import {format, formatDistance, formatRelative, subDays} from 'date-fns'
import {useState, useRef} from "react";


export const CustomPhoneInput = React.forwardRef((props, ref) => {
    return (
        <Input type="text"
               {...props}
               ref={ref}
        />
    );
});

const initialState = {
    phone: '',
    scheduleCall: false,
    communicationMethod: 'phone',
    leading: false,
    requestButtonDisabled: false,
    validationError: '',
    scheduleDatetime: '',
};

export const DetailModal = (props) => {
    const [state, setState] = useState(initialState);

    const config = props.serverConfig;

    const requestCall = () => {

        if (!state.phone) {
            setState({...state, validationError: 'Please enter your phone number'})
            return;
        }

        setState({...state, loading: true, validationError: ''});
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                setState({
                    ...state,
                    loading: false,
                    requestButtonDisabled: true,
                });
                resolve(true);

            }, 1000)
        });
    };

    const close = () => {
        props.close();
        setState(initialState);
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };

    return (
        <>
            <Modal centered={'true'} visible={props.show} onCancel={close} onOk={requestCall} title={config.modalTitle}
                   footer={[
                       <Button key={'close'} onClick={close}>Close</Button>,
                       <>{
                           !state.requestButtonDisabled &&
                           <Button
                               key={'submit'}
                               type={'primary'}
                               loading={state.loading}
                               onClick={requestCall}
                           >
                               {config.requestCallButtonText}
                           </Button>
                       }</>
                   ]}>
                {state.requestButtonDisabled ?
                    <Alert type={'success'} message={config.successMessage} style={{'text-align': 'center'}}/> :
                    <Row justify={'center'}>
                        <Col span={18}>
                            <Row gutter={[8, 8]} justify={'center'} align={'top'}
                                 type="flex"
                                 style={{alignItems: "center"}}
                            >
                                <Col span={24} offset={0}>
                                    <PhoneInput
                                        placeholder={config.phoneNumberInputPlaceholderText}
                                        value={state.phone}
                                        inputComponent={CustomPhoneInput}
                                        defaultCountry={config.phoneNumberInputDefaultCountry}
                                        onChange={phone => {
                                            setState({...state, phone})
                                        }}
                                        smartCaret={false}
                                    />
                                </Col>


                                <Col span={12} offset={0}></Col>
                                <Col span={24} offset={0}>
                                    Preferred communication method:
                                </Col>
                                <Col span={24} offset={0}>
                                    <Radio.Group
                                        buttonStyle={'solid'}
                                        onChange={e => {
                                            setState({...state, communicationMethod: e.target.value});
                                        }}
                                        value={state.communicationMethod}>
                                        defaultValue={'phone'}
                                        {Object.entries(config.communicationPlatforms).map(([key, value]) => (
                                            <Radio.Button value={key} key={key}>{value}</Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </Col>


                                <Col span={24} offset={0}>
                                    <Checkbox
                                        label={config.scheduleCallCheckboxText}
                                        checked={state.scheduleCall}
                                        onChange={_ => {
                                            setState({...state, scheduleCall: !state.scheduleCall});
                                        }}
                                    >{config.scheduleCallCheckboxText}</Checkbox>
                                </Col>

                                {
                                    state.scheduleCall ?
                                        <>
                                            <Col span={24} offset={0}>
                                                <DatePicker
                                                    defaultValue={state.scheduleDateTime}
                                                    placeholder={config.scheduleCallTimePlaceholerTest}
                                                    onChange={e => setState({...state, scheduleDatetime: e})}
                                                    showTime={{format: 'HH:mm'}}
                                                />
                                            </Col>

                                        </>
                                        : null
                                }


                                <Col span={24}>
                                    {state.validationError &&
                                        <Alert type={'error'} message={state.validationError}/>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }


            </Modal>
        </>
    )
};

export default DetailModal;