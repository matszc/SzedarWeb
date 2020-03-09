import React, {useEffect} from "react";
import style from "./chat.module.scss";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {HubConnectionBuilder} from "@aspnet/signalr";
import {baseUrl} from "../../config";
import PropTypes from 'prop-types';
import AppContext from "../../context/appContext";

const hubConnection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/chat`)
    .build();

const Chat = ({user, id}) => {

    const appContext = React.useContext(AppContext);

    const [open, setOpen] = React.useState(false);

    const [inputValue, setInputValue] = React.useState('');

    const [messages, addMessage] = React.useState([]);

    useEffect(() => {


        return () => {
            hubConnection.invoke('LeaveChat', id, user.login).then(() => {
                hubConnection.stop();
            })
        }
    }, []);

    useEffect(() => {
        if (chatContainer.current === null) return;

        const element = chatContainer.current;
        element.scrollTop = element.scrollHeight;
    }, [messages]);

    const chatContainer = React.createRef();


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = () => {
        if (hubConnection.state === 0) {
            appContext.snack.setSnack('error', 'chant connection failed');
            return;
        }
        hubConnection.invoke('SendMessage', {
            name: user.login,
            messageBody: inputValue,
            groupName: id,
        });

        setInputValue('');
    };

    const openChat = () => {
        setOpen(true);

        hubConnection.start()
            .then(() => {
                setUpListeners();
                JoinChat();

                console.log('Connection started');
            })
            .catch((r) => {
                setOpen(false);
                appContext.snack.setSnack('error', 'Can\' connect to the chat');
                console.error(r);
            });
    };

    const JoinChat = () => {
        if (hubConnection.state === 0) return;
        hubConnection.invoke('JoinChat', id, user.login);
    };

    const setUpListeners = () => {

        hubConnection.on('GetMessage', (res) => {
            addMessage(prevState => ([
                ...prevState, {
                    login: res.name,
                    message: res.messageBody
                }
            ]))
        });

        hubConnection.on('Join', (r) => {
            addMessage(prevState => ([
                ...prevState,
                {login: 'Server', message: `${r} Joined the chat`}
            ]))
        });

        hubConnection.on('Leave', (r) => {
            addMessage(prevState => ([
                ...prevState,
                {login: 'Server', message: `${r} Left the chat`}
            ]))
        })
    };


    return (
        <div className={style.wrapper}>
            {open ?
                <>
                    <div className={style.chatContainer} ref={chatContainer}>
                        {messages.map((i, index) => {
                            return (
                                <div key={index}>
                                    <span>{i.login}: </span>
                                    <span>{i.message}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.inputWrapper}>
                        <TextField
                            variant="outlined"
                            label={"Type a message..."}
                            value={inputValue}
                            onChange={(e) => handleInputChange(e)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <Button color={'primary'} variant={'contained'} onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </> : <Button color={'primary'} variant={'contained'} onClick={openChat}>Join Chat</Button>}
        </div>
    )
};

Chat.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string,
};


export default Chat;