import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Paper: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        height: '350px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        marginTop: '20px'
    },
    textDev: {
        width: '73%',
        textAlign: 'end',
        margin: '10px 5px 0 10px'
    },
    button: {
        marginTop: '10px',
        width: '350px',
        height: '40px',
        backgroundColor: '#b82525',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }

}));

export default useStyles