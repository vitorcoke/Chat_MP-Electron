/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Avatar, Button, ListItem, ListItemIcon, Modal, Paper, TextField } from '@material-ui/core';
import queryString from 'query-string'
import { io, Socket } from "socket.io-client";
import ReactScroll from 'react-scrollable-feed'
import axios from 'axios';
import useStyles from './styles/index'

type history = {
    _id: any,
    user: any,
    room: string,
    text: any,
    time: any,
    data: any

}

var socket: Socket
const server = 'http://192.168.1.204:8080'

const api = axios.create({
    baseURL: "http://192.168.1.204:8080",
});

type IMessegens = { user: any, text: any, time: any }

type UserRoom = []


const Chat: React.FC = () => {
    const classes = useStyles();

    const [nameParse, setNameParse] = useState('')
    const [roomParse, setRoomParse] = useState('')
    const [messagen, setMessagen] = useState('')
    const [messagensList, setMessagensList] = useState<IMessegens[]>([])
    const [userRoom, setUserRoom] = useState<UserRoom>([])
    const [open, setOpen] = React.useState(false);
    const [openSenha, setOpenSenha] = React.useState(false);
    const [historyMessagen, setHistoryMessagen] = useState<history[]>([])
    const [senha, setSenha] = useState('')

    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSenha = () => {
        setOpenSenha(false);
    };

    useEffect(() => {
        const { room, name }: any = queryString.parse(location.search);
        setRoomParse(room)
        setNameParse(name)

        socket = io(server)

        socket.emit('join', { name, room }, () => {

        })

        socket.on('error', (error) => {
            alert(error)
        })

        socket.on('getUser', (data) => {
            const users = data.user.map((m: { name: any; }) => m.name.toUpperCase())
            setUserRoom(users)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [server, location.search])


    useEffect(() => {
        socket.on('message', data => {
            setMessagensList((list) => [...list, data])
        })

        socket.on('notificacao', data => {
            if (data.user !== nameParse && !window.onfocus) {
                notifyMe(data)
            }
        })

    }, [])

    function Time() {
        function pad(s: string | number) {
            return (s < 10) ? '0' + s : s;
        }
        var date = new Date();
        return [date.getHours(), date.getMinutes()].map(pad).join(':');
    }

    function Data() {
        const data = new Date()
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }

    const submitSenha = () => {
        const teste = () => {
            if (senha === '147258') {
                handleOpen()
                handleCloseSenha()
                api.get(`/api/Chats/${roomParse}`)
                    .then(response => setHistoryMessagen(response.data))

                setSenha('')
            } else {
                alert('Senha Incorreta')
            }
        }
        return <Button className={classes.buttonSenha} onClick={teste}>Enviar</Button>
    }

    const handleClick = () => {
        setOpenSenha(true)
    }




    function notifyMe(mensagem: any) {
        // Verifica se o browser suporta notificações
        if (!("Notification" in window)) {
            alert("Este browser não suporta notificações de Desktop");
        }
        else if (Notification.permission === "granted") {
            const messagensRecebida = new Notification('Chat Minha Portaria', {
                body: `${mensagem.user} : ${mensagem.text}`,
                icon: 'favicon.ico'
            })
            setTimeout(() => messagensRecebida.close(), 2000)
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification("Hi there!");
                }
            });
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (messagen.trim()) {
            const message = {
                user: nameParse,
                room: roomParse,
                text: messagen,
                time: Time(),
                data: Data()
            }
            socket.emit('sendMessage', message)
            setMessagen('')
        }

    }


    const body = (
        <div className={classes.papermessagen} >
            {historyMessagen.map((m) => (m.user === nameParse ? (
                <>
                    <div className={classes.Clinete}>
                        <div className={classes.childreCliente}>
                            <span>{m.text}</span>
                        </div>
                    </div>
                    <div className={classes.timeCliente}>
                        <p style={{ marginRight: '7px' }}><b>{m.data}</b></p>
                        <p>{m.time}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={classes.Server}>
                        <div className={classes.childreServer}>
                            <span>{m.text}</span>
                        </div>
                    </div>
                    <div className={classes.timeServer}>
                        <p style={{
                            fontStyle: 'oblique',
                            fontWeight: 'bold',
                            marginRight: '8px'
                        }
                        }>
                            {m.user}</p>
                        <p>{m.time}</p>
                        <p style={{ marginLeft: '7px' }}><b>{m.data}</b></p>
                    </div>
                </>
            )
            ))}
        </div>
    );

    const loginMessagen = (
        <div className={classes.paperSenha} >
            <div className={classes.logo}>
                <img src="https://minhaportaria.com/wp-content/uploads/2021/01/logo-footer-203120.png" width='110px' />
            </div>
            <TextField
                label="Senha"
                placeholder="Senha"
                variant="outlined"
                type='password'
                margin="dense"
                style={{ width: '350px', marginTop: '20px' }}
                onChange={(e) => { setSenha(e.target.value) }}
            />
            {submitSenha()}
        </div >

    )



    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#b82525' }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap>
                        Chat Minha Portaria
                    </Typography>
                    <Typography variant="body1" >
                         Conectado na Sala:  <b>{roomParse}</b>
                        <Button href='/' className={classes.buttonAppBar}> Sair</Button>
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.logo}>
                    <img src="https://minhaportaria.com/wp-content/uploads/2021/01/logo-footer-203120.png" />
                </div>
                <Divider />
                <List >
                    {userRoom.map((m, i) => (
                        <ListItem key={i} button>
                            <ListItemIcon>
                                <Avatar>{m[0]}</Avatar>
                            </ListItemIcon>
                            <Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px' }}>{m}</Typography>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <div style={{ position: 'fixed', bottom: '20px', left: '10px' }}>
                    <Button onClick={handleClick} className={classes.buttonmessegen}>Historico de Menssagem</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {body}
                    </Modal>

                </div>
                <div style={{ position: 'fixed', bottom: '20px', left: '10px' }}>
                    <Modal
                        open={openSenha}
                        onClose={handleCloseSenha}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {loginMessagen}
                    </Modal>

                </div>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Paper
                        variant='outlined'
                        style={{ height: '70vh', padding: '20px 0 20px 0px' }}
                        className={classes.scrollBar}
                    >
                        <ReactScroll
                            className={classes.scrollBar}>
                            {messagensList.map((m, i) => (m.user === nameParse ? (
                                <>
                                    <div key={i} className={classes.Clinete}>
                                        <div className={classes.childreCliente}>
                                            <span>{m.text}</span>
                                        </div>
                                    </div>
                                    <div className={classes.timeCliente}>
                                        <p>{m.time}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div key={i} className={classes.Server}>
                                        <div className={classes.childreServer}>
                                            <span>{m.text}</span>
                                        </div>
                                    </div>
                                    <div className={classes.timeServer}>
                                        <p style={{
                                            fontStyle: 'oblique',
                                            fontWeight: 'bold',
                                            marginRight: '8px'
                                        }
                                        }>
                                            {m.user}</p>
                                        <p>{m.time}</p>
                                    </div>
                                </>
                            )

                            ))}
                        </ReactScroll>

                    </Paper>

                    <TextField style={{ paddingTop: '20px' }}
                        placeholder="Mensagem"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        spellCheck={true}
                        onChange={e => setMessagen(e.target.value)}
                        value={messagen}
                    />
                </form>

            </main>
        </div>
    );
}

export default Chat