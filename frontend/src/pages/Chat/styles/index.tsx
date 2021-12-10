import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height:'600px'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0.5),

    },
    form: {
        padding: '10px',
    },
    buttonAppBar: {
        marginLeft: '50px',
        backgroundColor: '#000',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#000'
        }

    },
    Clinete: {
        display: 'flex',
        justifyContent: 'flex-end'

    },
    childreCliente: {
        backgroundColor: '#b82525',
        float: 'right',
        borderRadius: '10px 0 10px 10px',
        borderTop: '10px solid #b82525',
        borderRight: '10px solid transparent',
        backgroundClip: 'padding-box',
        padding: '0 10px 10px 10px',
        color: 'white',
        fontWeight: 'lighter',
        maxWidth: '400px',
        overflowWrap: 'break-word'
    },
    Server: {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '8px'

    },
    childreServer: {
        backgroundColor: '#37e680',
        float: 'left',
        borderRadius: '0 10px 10px 10px',
        borderTop: '10px solid #37e680',
        borderLeft: '10px solid transparent',
        backgroundClip: 'padding-box',
        padding: '0 10px 10px 10px',
        maxWidth: '400px',
        overflowWrap: 'break-word'
    },
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',

        },
        height: '66vh',
        paddingRight: '20px'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        width: '200px',
        height: '60px',
        margin: '15px',
    },
    timeCliente: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '-5px',
        marginBottom: '8px',
        paddingRight: '10px'
    },
    timeServer: {
        display: 'flex',
        marginTop: '-5px',
        marginBottom: '10px',
        marginLeft: '20px'
    },
    papermessagen: {
        position: 'absolute',
        width: '80vw',
        height: '65vh',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'auto',
        borderRadius: '8px'
    },
    buttonmessegen: {
        backgroundColor: '#b82525',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#b82525'
        }
    },
    paperSenha:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 400,
        height: 250,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '8px'
    },
    buttonSenha:{
        backgroundColor:'#b82525',
        marginTop:'20px',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#b82525'
        }
    }
}));

export default useStyles