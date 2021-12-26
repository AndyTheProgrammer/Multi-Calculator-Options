import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { COLORS } from "../common/shared";

const useStyles = makeStyles((theme: Theme) => createStyles({
  // Navigation bar
  root: {
    display: "flex",
    flexGrow: 1,
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
    color: theme.palette.text.secondary,
  },
  paperBackground: {
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
  },
  formControl: {
    padding: theme.spacing(2),
  },
  image: {
    height: theme.spacing(3),
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    wordBreak: 'break-word'
  },
  leftTabContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.palette.background.paper,
    color: COLORS.text,
    width: "100%",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightTabContainer: {
    height: 25,
    background: COLORS.gradient,
    color: COLORS.light_text_color,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sideBarPaperBackground: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  labelStyle: {
    color: '#4072B5',
  },
  formCardStyle: {
    height: 25,
    width: '100%',
    backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
    borderRadius: '0 20px 3px',
  },
  formDisplay: {
    // width: 400,
    maxWidth: 400,
    height: '100%',
    zIndex: 2,
    borderRadius: '20px !important',
    backgroundColor: theme.palette.background.paper,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    paddingBottom: 2,
    margin: theme.spacing(2),
  },
  formResult: {
    maxWidth: 400,
    //  zIndex: -1,
    height: '100%',
    borderRadius: '20px !important',
    backgroundColor: theme.palette.background.paper,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    paddingBottom: 2,
    margin: theme.spacing(2),
  },
  formDisplay2: {
    //opacity: 0.8,
    zIndex: 2,
    maxWidth: 500,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px !important',
    paddingBottom: 2,
    margin: theme.spacing(2),
  },
}));

export default useStyles;


export const labelStyle = {
  color: '#4072B5',
}

export const formCardStyle = {
  height: 25, width: '100%',
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

