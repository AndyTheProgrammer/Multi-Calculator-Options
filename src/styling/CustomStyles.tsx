import { alpha, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../common/shared";

export const labelStyle = {
  color:'#4072B5',
}

export const formCardStyle={
  height:25, width: '100%', 
  backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
  borderRadius: '0 20px 3px', 
}

export const formDisplay = {
    width: 400,
    height: '100%',
    borderRadius: '20px',
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    paddingBottom: 2,
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  // Navigation bar
  root: {
    display: "flex",
  },
  container: {
    flex: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  appBar: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    backgroundColor: COLORS.primary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  // End Navigation bar

  paper: {
    flex: 1,
    flexDirection: "column",
    display: "flex",
  },
  exchangeRates: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
  },
  currencyConverter: {
    backgroundColor: "#f5f5f5 ",
    width: "80%",
    height: "300px",
    marginLeft: "12%",
    borderRadius: "5px",
    boxShadow: "5px 3px 3px #eeeeee ",
  },
  converterContent: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
  },
  calculatorOptions: {
    flexDirection: "column",
    marginTop: 100,
    marginLeft: "12%",
  },

  paper2: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "none",
    color: theme.palette.text.secondary,
  },
  paperBackground: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "none",
    color: theme.palette.text.secondary,
    backgroundColor: COLORS.paper_background,
  },
  formControl: {
    padding: theme.spacing(2),
  },
  image: {
    height: theme.spacing(3),
  },
}));

export default useStyles;
