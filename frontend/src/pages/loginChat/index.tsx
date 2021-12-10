/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { FormControl, InputLabel, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import ContextProvider from '../../data/Context';
import {useHistory} from 'react-router-dom'
import { Alert } from '@material-ui/lab';
import useStyles from './styles';


const LoginChat: React.FC = () => {

    const classes = useStyles();
    const { room, setRoom, setUseName, useName, open, setOpen, senha, setSenha } = useContext(ContextProvider)


    const handleClose = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const ChatButton = () => {
        const history = useHistory()

        const handleClick = () => {
            if (room === 'Portaria' && senha === 'prfcs2021') {
                history.push(`/Chat?name=${useName}&room=${room}`)
            } else if (room === 'Suporte' && senha === 'suporte') {
                history.push(`/Chat?name=${useName}&room=${room}`)
            } else if (room === 'Lider' && senha === '147258') {
                history.push(`/Chat?name=${useName}&room=${room}`)
            } else {
                setOpen(true)
            }
        }
        return <button onClick={handleClick} className={classes.button}>
            Entrar
        </button>
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.Paper} elevation={3}>
                <div className={classes.logo}>
                    <img src="https://minhaportaria.com/wp-content/uploads/2021/01/logo-footer-203120.png" width='110px' />
                </div>
                <TextField
                    label="Nome"
                    placeholder="Nome"
                    variant="outlined"
                    margin="dense"
                    style={{ width: '350px', marginTop: '20px' }}
                    onChange={(e) => setUseName(e.target.value)}
                />
                <FormControl variant="outlined" style={{ width: '350px', marginTop: '20px', backgroundColor: 'white' }} >
                    <InputLabel margin= 'dense'>Salas</InputLabel>
                    <Select
                        native
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        label="Salas"
                        margin='dense'
                    >
                        <option aria-label="None" value="" />
                        <option >Portaria</option>
                        <option >Lider</option>
                        <option >Suporte</option>
                    </Select>
                </FormControl>
                <TextField
                    type='password'
                    label="Senha"
                    placeholder="Senha"
                    variant="outlined"
                    margin="dense"
                    style={{ width: '350px', marginTop: '20px' }}
                    onChange={(e) => setSenha(e.target.value)}
                />

                {ChatButton()}

                <Typography variant='subtitle2' className={classes.textDev}>
                    Desenvolvido por <b>Vitor M. Coke</b>
                </Typography>
            </Paper>

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                <Alert severity="error" variant="filled">
                    Preencha todos os campos / Senha Incorreta
                </Alert>
            </Snackbar>

        </div>
    );
}

export default LoginChat